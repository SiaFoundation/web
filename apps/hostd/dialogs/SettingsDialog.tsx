import {
  Alert,
  Box,
  Information16,
  LogoDiscord16,
  Globe16,
  LogoGithub16,
  Flex,
  Heading,
  Paragraph,
  DialogContent,
  Select,
  Switch,
  Text,
  Separator,
  ThemeRadio,
  Link,
  webLinks,
} from '@siafoundation/design-system'
import { useSettings } from '@siafoundation/react-core'

export function SettingsDialog() {
  const { settings, setSettings, setCurrency, currencyOptions } = useSettings()

  return (
    <DialogContent title="Settings">
      <Box css={{ maxWidth: '500px', marginBottom: '$3' }}>
        <Flex direction="column" gap="3">
          <Flex direction="column" gap="2">
            <Text size="16" weight="bold">
              General
            </Text>
            <Flex direction="column" gap="2">
              <Alert>
                <Flex direction="column" gap="2">
                  <Flex gap="1" align="center">
                    <Box>
                      <Information16 />
                    </Box>
                    <Heading size="20" css={{ flex: 1 }}>
                      Currency
                    </Heading>
                    <Select
                      value={settings.currency.id}
                      onChange={(e) => setCurrency(e.target.value)}
                    >
                      {currencyOptions.map(({ id, label }) => (
                        <option key={id} value={id}>
                          {label}
                        </option>
                      ))}
                    </Select>
                  </Flex>
                  <Paragraph size="14">
                    Select a currency for price conversions from Siacoin.
                    Requires SiaCentral 3rd party data enabled under Privacy.
                  </Paragraph>
                </Flex>
              </Alert>
              <Alert>
                <Flex direction="column" gap="2">
                  <Flex gap="1" align="center">
                    <Box>
                      <Information16 />
                    </Box>
                    <Heading size="20" css={{ flex: 1 }}>
                      Theme
                    </Heading>
                    <ThemeRadio />
                  </Flex>
                  <Paragraph size="14">
                    {`Switch between a dark or light mode, or follow your system's settings.`}
                  </Paragraph>
                </Flex>
              </Alert>
            </Flex>
          </Flex>
          <Separator size="100" pad="0" />
          <Flex direction="column" gap="1">
            <Text size="16" weight="bold">
              Privacy
            </Text>
            <Flex direction="column" gap="2">
              <Paragraph size="14">
                This app uses the following third-party APIs, all external APIs
                are not required and can be toggled on or off.
              </Paragraph>
              <Alert>
                <Flex direction="column" gap="2">
                  <Flex gap="1" align="center">
                    <Box>
                      <Information16 />
                    </Box>
                    <Heading size="20" css={{ flex: 1 }}>
                      SiaCentral
                    </Heading>
                    <Switch
                      size="2"
                      checked={settings.siaCentral}
                      onCheckedChange={(val) =>
                        setSettings({ siaCentral: val })
                      }
                    />
                  </Flex>
                  <Paragraph size="14">
                    The app fetches Siacoin exchange rates from the SiaCentral
                    API.
                  </Paragraph>
                </Flex>
              </Alert>
            </Flex>
          </Flex>
          <Separator size="100" pad="0" />
          <Flex direction="column" gap="1">
            <Text size="16" weight="bold">
              Help
            </Text>
            <Flex direction="column" gap="2">
              <Paragraph size="14">
                Find information about the Sia software at our website,
                documentation site, and on Github. Join our active Discord
                community for discussion and help troubleshooting issues.
              </Paragraph>
              <Flex gap="2">
                <Text>
                  <Link
                    href={webLinks.website}
                    target="_blank"
                    css={{ display: 'flex', gap: '$0-5' }}
                  >
                    <Globe16 />
                    Website
                  </Link>
                </Text>
                <Text>
                  <Link
                    href={webLinks.docs.index}
                    target="_blank"
                    css={{ display: 'flex', gap: '$0-5' }}
                  >
                    <Information16 />
                    Docs
                  </Link>
                </Text>
                <Text>
                  <Link
                    href={webLinks.github}
                    target="_blank"
                    css={{ display: 'flex', gap: '$0-5' }}
                  >
                    <LogoGithub16 />
                    About
                  </Link>
                </Text>
                <Text>
                  <Link
                    href={webLinks.discord}
                    target="_blank"
                    css={{ display: 'flex', gap: '$0-5' }}
                  >
                    <LogoDiscord16 />
                    Discord
                  </Link>
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </DialogContent>
  )
}
