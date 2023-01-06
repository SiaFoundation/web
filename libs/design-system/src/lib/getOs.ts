export function getOs() {
  let os = 'unknown'
  const navApp = navigator.userAgent.toLowerCase()
  switch (true) {
    case navApp.indexOf('win') !== -1:
      os = 'windows'
      break
    case navApp.indexOf('mac') !== -1:
      os = 'apple'
      break
    case navApp.indexOf('linux') !== -1:
      os = 'linux'
      break
    case navApp.indexOf('x11') !== -1:
      os = 'unix'
      break
  }
  return os
}
