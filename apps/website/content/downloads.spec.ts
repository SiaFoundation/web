import { getTags, findUserDefaultDownload } from './downloads'

const downloadsList = [
  // desktop release naming scheme
  { name: 'walletd-arm64.dmg' },
  { name: 'walletd-x64.dmg' },
  { name: 'walletd-0.12.0.Setup.exe' },
  { name: 'walletd_0.12.0_arm64.deb' },
  { name: 'walletd_0.12.0_amd64.deb' },
  { name: 'walletd-0.12.0-1.arm64.rpm' },
  { name: 'walletd-0.12.0-1.x86_64.rpm' },
  // daemon release naming scheme
  { name: 'walletd_darwin_amd64.zip' },
  { name: 'walletd_darwin_arm64.zip' },
  { name: 'walletd_linux_amd64.zip' },
  { name: 'walletd_linux_arm64.zip' },
  { name: 'walletd_windows_amd64.zip' },
].map(({ name }) => ({ title: '', link: '', tags: getTags({ name }) }))

describe('getTags', () => {
  test('desktop releases should return the correct tags', () => {
    expect(getTags({ name: 'walletd-arm64.dmg' })).toEqual(['macos', 'arm64'])
    expect(getTags({ name: 'walletd-x64.dmg' })).toEqual(['macos', 'amd64'])
    expect(getTags({ name: 'walletd-0.12.0.Setup.exe' })).toEqual([
      'windows',
      'amd64',
    ])
    expect(getTags({ name: 'walletd_0.12.0_arm64.deb' })).toEqual([
      'linux',
      'arm64',
    ])
    expect(getTags({ name: 'walletd_0.12.0_amd64.deb' })).toEqual([
      'linux',
      'amd64',
    ])
    expect(getTags({ name: 'walletd-0.12.0-1.arm64.rpm' })).toEqual([
      'linux',
      'arm64',
    ])
    expect(getTags({ name: 'walletd-0.12.0-1.x86_64.rpm' })).toEqual([
      'linux',
      'amd64',
    ])
  })
  test('daemon releases should return the correct tags', () => {
    expect(getTags({ name: 'walletd_darwin_amd64.zip' })).toEqual([
      'macos',
      'amd64',
    ])
    expect(getTags({ name: 'walletd_darwin_arm64.zip' })).toEqual([
      'macos',
      'arm64',
    ])
    expect(getTags({ name: 'walletd_linux_amd64.zip' })).toEqual([
      'linux',
      'amd64',
    ])
    expect(getTags({ name: 'walletd_linux_arm64.zip' })).toEqual([
      'linux',
      'arm64',
    ])
    expect(getTags({ name: 'walletd_windows_amd64.zip' })).toEqual([
      'windows',
      'amd64',
    ])
  })
})

describe('findUserDefaultDownload', () => {
  test('any windows user-agent should return amd64', () => {
    const userAgent =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:131.0) Gecko/20100101 Firefox/131.0'
    jest.spyOn(navigator, 'userAgent', 'get').mockReturnValue(userAgent)
    const download = findUserDefaultDownload(downloadsList)
    expect(download).toEqual({
      title: '',
      link: '',
      tags: ['windows', 'amd64'],
    })
  })
  test('any macos user-agent should return arm64', () => {
    const userAgent =
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36'
    jest.spyOn(navigator, 'userAgent', 'get').mockReturnValue(userAgent)
    const download = findUserDefaultDownload(downloadsList)
    expect(download).toEqual({
      title: '',
      link: '',
      tags: ['macos', 'arm64'],
    })
  })
  test('linux arm user-agent should return arm64', () => {
    const userAgent =
      'Mozilla/5.0 (X11; Linux aarch64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36'
    jest.spyOn(navigator, 'userAgent', 'get').mockReturnValue(userAgent)
    const download = findUserDefaultDownload(downloadsList)
    expect(download).toEqual({
      title: '',
      link: '',
      tags: ['linux', 'arm64'],
    })
  })
  test('linux amd user-agent should return amd64', () => {
    const userAgent =
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36'
    jest.spyOn(navigator, 'userAgent', 'get').mockReturnValue(userAgent)
    const download = findUserDefaultDownload(downloadsList)
    expect(download).toEqual({
      title: '',
      link: '',
      tags: ['linux', 'amd64'],
    })
  })
})
