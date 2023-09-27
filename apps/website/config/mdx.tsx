import {
  Checkbox,
  Code,
  Codeblock,
  Li,
  Link,
  Ol,
  panelStyles,
  Paragraph,
  SectionHeading,
  Text,
  Ul,
} from '@siafoundation/design-system'
import { cx } from 'class-variance-authority'

// Components used in mardown rendering
export const components = {
  h1: ({ children }) => (
    <SectionHeading size="40" className="pb-6 pt-20">
      {children}
    </SectionHeading>
  ),
  h2: ({ children }) => (
    <SectionHeading size="24" className="pb-4 pt-6">
      {children}
    </SectionHeading>
  ),
  h3: ({ children }) => (
    <SectionHeading size="20" className="pb-2 pt-4">
      {children}
    </SectionHeading>
  ),
  p: ({ children }) => (
    <Paragraph size="16" className="!block pt-3">
      {children}
    </Paragraph>
  ),
  a: (props) => <Link {...props} target="_blank" />,
  code: (props) => {
    if (props.className) {
      return <Codeblock {...props} />
    }
    return <Code {...props} />
  },
  ol: Ol,
  ul: Ul,
  li: (props) => <Li scaleSize="16" {...props} />,
  table: ({ children }) => (
    <table className={cx('table-auto border-collapse my-4', panelStyles())}>
      {children}
    </table>
  ),
  thead: ({ children }) => <thead className="">{children}</thead>,
  tr: ({ children }) => (
    <tr className="border border-gray-400 dark:border-graydark-400">
      {children}
    </tr>
  ),
  th: ({ children }) => (
    <th className="px-4 py-2 border border-gray-400 dark:border-graydark-400">
      <Text noWrap>{children}</Text>
    </th>
  ),
  tbody: ({ children }) => <tbody>{children}</tbody>,
  td: ({ children }) => (
    <td className="px-4 py-2 border border-gray-400 dark:border-graydark-400">
      <Text color="subtle">{children}</Text>
    </td>
  ),
  input: (props) => {
    if (props.type === 'checkbox') {
      return (
        <div className="inline-block relative top-[3px]">
          <Checkbox {...props} />
        </div>
      )
    }
    return <input {...props} />
  },
}
