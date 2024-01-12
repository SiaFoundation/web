// Simpler combined regex https://regex101.com/r/0WMysi/2
export const hostnameOrIpRegex = () =>
  new RegExp(
    '^(((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]).){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))|((([a-zA-Z]|[a-zA-Z][a-zA-Z0-9-]*[a-zA-Z0-9]).)+([A-Za-z|[A-Za-z][A-Za-z0-9‌​-]*[A-Za-z0-9])))$',
    // '^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]).)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9])$',
    'g'
  )
