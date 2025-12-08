import {
  Dialog,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Paragraph,
} from '@siafoundation/design-system'
import { AllowlistForm } from './AllowlistForm'
import { BlocklistForm } from './BlocklistForm'

type Props = {
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
}

export function HostsAllowBlockDialog({ trigger, open, onOpenChange }: Props) {
  return (
    <Dialog
      trigger={trigger}
      title="Manage host blocklist and allowlist"
      open={open}
      onOpenChange={(open) => {
        // if (!open) {
        //   formik.resetForm()
        // }
        onOpenChange(open)
      }}
      contentVariants={{
        className: 'w-[500px]',
      }}
    >
      <div className="flex flex-col gap-4">
        <Paragraph size="12">
          The allowlist and blocklist limit the set of hosts that renterd will
          consider when forming contracts. The blocklist excludes hosts with
          matching addresses whereas the allowlist restricts consideration to
          hosts with a matching public key. Each list's filtering is enabled and
          applied when it contains more than zero entries.
        </Paragraph>
        <Tabs defaultValue="blocklist">
          <TabsList aria-label="blocklist and allowlist tabs">
            <TabsTrigger aria-label="view blocklist" value="blocklist">
              Block
            </TabsTrigger>
            <TabsTrigger aria-label="view allowlist" value="allowlist">
              Allow
            </TabsTrigger>
          </TabsList>
          <TabsContent value="blocklist">
            <BlocklistForm />
          </TabsContent>
          <TabsContent value="allowlist">
            <AllowlistForm />
          </TabsContent>
        </Tabs>
      </div>
    </Dialog>
  )
}
