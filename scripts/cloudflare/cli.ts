/**
 * Builds, previews and deploys the Cloudflare Workers listed in deployments.ts. CI runs
 * it, and it works the same from a laptop logged in with `wrangler login`.
 *
 *   bun cf affected <base> <head>     Workers changed between two commits, on one line
 *   bun cf build <worker...>          Build what each Worker serves
 *   bun cf dev <worker>               Build, then serve it locally with wrangler dev
 *   bun cf preview <branch> <worker...>
 *                                     Build, then upload each Worker as a version under
 *                                     the branch's preview alias, without deploying it.
 *                                     Prints a Markdown table of URLs.
 *   bun cf deploy <worker...>         Build, then deploy each Worker to production
 *
 * `all` in place of the Worker names means every Worker.
 *
 * preview and deploy need CLOUDFLARE_ACCOUNT_ID set to the Sia Foundation account's ID,
 * which is a repository secret rather than a field in each wrangler.jsonc because this
 * repository is public. They refuse to run without it, since wrangler would otherwise
 * pick an account itself, and a login with access to several could land in the wrong
 * one.
 */
import { spawnSync } from 'node:child_process'
import { mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import {
  type Deployment,
  changesDeployTooling,
  deployments,
  deploymentsFor,
  previewAlias,
  previewUrl,
  productionUrl,
} from './deployments'
import { prepareStaticSite } from './static-site'

const root = resolve(import.meta.dir, '../..')

function run(
  command: string[],
  options: { cwd?: string; env?: Record<string, string> } = {},
) {
  console.error(`$ ${command.join(' ')}`)
  const result = spawnSync(command[0], command.slice(1), {
    cwd: options.cwd ?? root,
    env: { ...process.env, ...options.env },
    // Their output goes to stderr, because preview prints the table of URLs that the
    // workflow posts on the pull request to stdout.
    stdio: ['inherit', 2, 2],
  })
  if (result.status !== 0) {
    throw new Error(`${command.join(' ')} exited with ${result.status}`)
  }
}

function output(command: string[]): string {
  const result = spawnSync(command[0], command.slice(1), {
    cwd: root,
    encoding: 'utf8',
    stdio: ['inherit', 'pipe', 'inherit'],
  })
  if (result.status !== 0) {
    throw new Error(`${command.join(' ')} exited with ${result.status}`)
  }
  return result.stdout
}

function configPath(d: Deployment) {
  return join(root, 'apps', d.project, 'wrangler.jsonc')
}

function wranglerArgs(d: Deployment) {
  return ['--config', configPath(d), ...(d.env ? ['--env', d.env] : [])]
}

async function siteDirectory(d: Deployment): Promise<string> {
  const config = (await import(configPath(d))).default
  return resolve(join(root, 'apps', d.project), config.assets.directory)
}

async function build(d: Deployment) {
  if (d.kind === 'static') {
    run(['bunx', 'nx', 'run', `${d.project}:build:${d.configuration}`])
    prepareStaticSite(await siteDirectory(d))
    return
  }
  // The adapter runs `next build` in the app's folder, and next.config.js picks the
  // network from the Nx configuration name, as it does under Nx.
  run(['bunx', 'opennextjs-cloudflare', 'build', ...wranglerArgs(d)], {
    cwd: join(root, 'apps', d.project),
    env: { NX_TASK_TARGET_CONFIGURATION: d.configuration },
  })
}

/** Runs wrangler and returns the entries it writes to its output file. */
function wrangler(args: string[]): Record<string, unknown>[] {
  const dir = mkdtempSync(join(tmpdir(), 'wrangler-output-'))
  const file = join(dir, 'output.ndjson')
  try {
    run(['bunx', 'wrangler', ...args], {
      env: { WRANGLER_OUTPUT_FILE_PATH: file },
    })
    return readFileSync(file, 'utf8')
      .split('\n')
      .filter(Boolean)
      .map((line) => JSON.parse(line))
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}

function requireAccount() {
  if (!process.env.CLOUDFLARE_ACCOUNT_ID) {
    throw new Error(
      'Set CLOUDFLARE_ACCOUNT_ID to the Sia Foundation Cloudflare account ID.',
    )
  }
}

// Each argument may hold several names separated by spaces, as a workflow passes them.
function selectWorkers(args: string[]): Deployment[] {
  const names = args.flatMap((arg) => arg.split(/\s+/)).filter(Boolean)
  if (names.length === 1 && names[0] === 'all') return deployments
  return names.map((name) => {
    const d = deployments.find((d) => d.worker === name)
    if (!d) {
      throw new Error(
        `No Worker named ${name}. Choose from ${deployments.map((d) => d.worker).join(', ')}, or all.`,
      )
    }
    return d
  })
}

const [command, ...args] = process.argv.slice(2)

switch (command) {
  case 'affected': {
    const [base, head] = args
    const projects: string[] = JSON.parse(
      output([
        'bunx',
        'nx',
        'show',
        'projects',
        '--affected',
        `--base=${base}`,
        `--head=${head}`,
        '--json',
      ]),
    )
    const changed = output(['git', 'diff', '--name-only', `${base}...${head}`])
      .split('\n')
      .filter(Boolean)
    const workers = changesDeployTooling(changed)
      ? deployments
      : deploymentsFor(projects)
    // One line, so a workflow can read it straight into a variable. Piping it through
    // anything would hide this command failing, and an empty list from a failed run
    // would skip the deploy and still count as a success.
    console.log(workers.map((d) => d.worker).join(' '))
    break
  }

  case 'build': {
    for (const d of selectWorkers(args)) await build(d)
    break
  }

  case 'dev': {
    const [d] = selectWorkers(args)
    await build(d)
    run(['bunx', 'wrangler', 'dev', ...wranglerArgs(d)])
    break
  }

  case 'preview': {
    requireAccount()
    const [branch, ...names] = args
    const alias = previewAlias(branch)
    const rows: string[] = []
    for (const d of selectWorkers(names)) {
      await build(d)
      const entries = wrangler([
        'versions',
        'upload',
        ...wranglerArgs(d),
        '--preview-alias',
        alias,
        '--message',
        output(['git', 'rev-parse', '--short', 'HEAD']).trim(),
      ])
      const upload = entries.find((e) => e.type === 'version-upload') as
        { preview_alias_url?: string } | undefined
      const url = previewUrl(alias, d.worker)
      if (upload?.preview_alias_url !== url) {
        throw new Error(
          `${d.worker} was uploaded, but wrangler reported its preview at ${upload?.preview_alias_url} rather than ${url}`,
        )
      }
      rows.push(`| ${d.worker} | ${url} |`)
    }
    console.log(['| Worker | Preview |', '| --- | --- |', ...rows].join('\n'))
    break
  }

  case 'deploy': {
    requireAccount()
    for (const d of selectWorkers(args)) {
      await build(d)
      wrangler(['deploy', ...wranglerArgs(d)])
      console.error(`Deployed ${d.worker} to ${productionUrl(d.worker)}`)
    }
    break
  }

  default:
    console.error(
      'Commands are listed at the top of scripts/cloudflare/cli.ts.',
    )
    process.exit(1)
}
