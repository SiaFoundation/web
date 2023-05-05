import { Alert } from '../core/Alert'
import { Heading } from '../core/Heading'
import { Paragraph } from '../core/Paragraph'
import { Option, Select } from '../core/Select'
import { Switch } from '../core/Switch'
import { Text } from '../core/Text'
import { Separator } from '../core/Separator'
import { Link } from '../core/Link'
import {
  Information16,
  LogoDiscord16,
  Globe16,
  LogoGithub16,
} from '../icons/carbon'
import { ThemeRadio } from '../components/ThemeRadio'
import { webLinks } from '../data/webLinks'
import { CurrencyId, useAppSettings } from '@siafoundation/react-core'
import { Dialog } from '../core/Dialog'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  showSiaStats?: boolean
}

export function SettingsDialog({
  open,
  onOpenChange,
  showSiaStats = true,
}: Props) {
  const { settings, setSettings, setCurrency, currencyOptions } =
    useAppSettings()

  return (
    <Dialog
      open={open}
      title="General"
      onOpenChange={onOpenChange}
      contentVariants={{ className: 'w-[450px]' }}
    >
      <div className="flex flex-col gap-6 mb-2">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <Alert>
              <div className="flex flex-col gap-4">
                <div className="flex gap-2 items-center">
                  <Text>
                    <Information16 />
                  </Text>
                  <Heading size="20" className="flex-1">
                    Currency
                  </Heading>
                  <Select
                    value={settings.currency.id}
                    onChange={(e) =>
                      setCurrency(e.currentTarget.value as CurrencyId)
                    }
                  >
                    {currencyOptions.map(({ id, label }) => (
                      <Option key={id} value={id}>
                        {label}
                      </Option>
                    ))}
                  </Select>
                </div>
                <Paragraph size="14">
                  Select a currency for price conversions from Siacoin. Requires
                  Sia Central 3rd party data enabled under Privacy.
                </Paragraph>
              </div>
            </Alert>
            <Alert>
              <div className="flex flex-col gap-4">
                <div className="flex gap-2 items-center">
                  <Text>
                    <Information16 />
                  </Text>
                  <Heading size="20" className="flex-1">
                    Theme
                  </Heading>
                  <ThemeRadio />
                </div>
                <Paragraph size="14">
                  {`Switch between a dark or light mode, or follow your system's settings.`}
                </Paragraph>
              </div>
            </Alert>
          </div>
        </div>
        <Separator className="w-full" />
        <div className="flex flex-col gap-2">
          <Text size="16" weight="bold">
            Privacy
          </Text>
          <div className="flex flex-col gap-4">
            <Paragraph size="14">
              This app uses the following third-party APIs, all external APIs
              are not required and can be toggled on or off.
            </Paragraph>
            <Alert>
              <div className="flex flex-col gap-4">
                <div className="flex gap-2 items-center">
                  <Text>
                    <Information16 />
                  </Text>
                  <Heading size="20" className="flex-1">
                    Sia Central
                  </Heading>
                  <Switch
                    size="medium"
                    checked={settings.siaCentral}
                    onCheckedChange={(val) => setSettings({ siaCentral: val })}
                  />
                </div>
                <Paragraph size="14">
                  The app fetches Siacoin exchange rates from the Sia Central
                  API.
                </Paragraph>
              </div>
            </Alert>
            {showSiaStats ? (
              <Alert>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-2 items-center">
                    <Text>
                      <Information16 />
                    </Text>
                    <Heading size="20" className="flex-1">
                      SiaStats
                    </Heading>
                    <Switch
                      size="medium"
                      checked={settings.siaStats}
                      onCheckedChange={(val) => setSettings({ siaStats: val })}
                    />
                  </div>
                  <Paragraph size="14">
                    The app fetches the network block height from the SiaStats
                    API. This data is used to calculate sync progress.
                  </Paragraph>
                </div>
              </Alert>
            ) : null}
          </div>
        </div>
        <Separator className="w-full" />
        <div className="flex flex-col gap-2">
          <Text size="16" weight="bold">
            Help
          </Text>
          <div className="flex flex-col gap-4">
            <Paragraph size="14">
              Find information about the Sia software at our website,
              documentation site, and on Github. Join our active Discord
              community for discussion and help troubleshooting issues.
            </Paragraph>
            <div className="flex gap-4">
              <Link
                href={webLinks.website}
                target="_blank"
                className="flex items-center gap-1"
              >
                <Globe16 />
                Website
              </Link>
              <Link
                href={webLinks.docs.index}
                target="_blank"
                className="flex items-center gap-1"
              >
                <Information16 />
                Docs
              </Link>
              <Link
                href={webLinks.github.index}
                target="_blank"
                className="flex items-center gap-1"
              >
                <LogoGithub16 />
                About
              </Link>
              <Link
                href={webLinks.discord}
                target="_blank"
                className="flex items-center gap-1"
              >
                <LogoDiscord16 />
                Discord
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  )
}
