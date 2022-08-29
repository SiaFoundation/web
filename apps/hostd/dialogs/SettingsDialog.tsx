import {
  Alert,
  Box,
  Information16,
  Flex,
  Heading,
  Paragraph,
  DialogContent,
  Select,
  Switch,
  Text,
} from '@siafoundation/design-system'
import { useSettings } from '@siafoundation/react-core'

export function SettingsDialog() {
  const { settings, setSettings, setCurrency, currencyOptions } = useSettings()

  return (
    <DialogContent title="Settings">
      <Box css={{ maxWidth: '400px' }}>
        <Flex direction="column" gap="3">
          <Flex direction="column" gap="2">
            <Text size="16" weight="semibold">
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
            </Flex>
          </Flex>
          <Flex direction="column" gap="1">
            <Text size="16" weight="semibold">
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
                      SiaStats
                    </Heading>
                    <Switch
                      size="2"
                      checked={settings.siaStats}
                      onCheckedChange={(val) => setSettings({ siaStats: val })}
                    />
                  </Flex>
                  <Paragraph size="14">
                    The app fetches price information and block height from the
                    SiaStats API.
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
        </Flex>
      </Box>
    </DialogContent>
  )
}
