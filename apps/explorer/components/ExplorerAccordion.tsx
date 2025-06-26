import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Heading,
} from '@siafoundation/design-system'

type ExplorerAccordionProps = {
  title: string
  children: React.ReactNode
}

export function ExplorerAccordion({ title, children }: ExplorerAccordionProps) {
  return (
    <Accordion type="single" className="w-full">
      <AccordionItem value="steps" variant="ghost">
        <div className="transition-shadow ease-in-out duration-300 shadow-sm hover:shadow rounded border border-gray-400 dark:border-graydark-400 bg-white dark:bg-graydark-200 overflow-hidden">
          <AccordionTrigger className="flex items-center p-4 border-b border-gray-200 dark:border-graydark-300 w-full focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-graydark-400">
            <Heading size="20" font="mono" ellipsis>
              {title}
            </Heading>
          </AccordionTrigger>
          <AccordionContent>{children}</AccordionContent>
        </div>
      </AccordionItem>
    </Accordion>
  )
}
