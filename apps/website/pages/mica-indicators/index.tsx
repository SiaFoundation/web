import { Layout } from '../../components/Layout'
import { textContent } from '../../lib/utils'
import { routes } from '../../config/routes'
import { SectionTransparent } from '../../components/SectionTransparent'
import { SiteHeading } from '@siafoundation/design-system'
import { SectionGradient } from '../../components/SectionGradient'
import { backgrounds, previews } from '../../content/assets'
import { MicaComplianceTable } from '../../components/MicaComplianceTable'
import { minutesInSeconds } from '@siafoundation/units'
import { AsyncReturnType } from '../../lib/types'
import { getMicaIndicators } from '../../content/mica'

type Props = AsyncReturnType<typeof getStaticProps>['props']

export default function MicaIndicators({ micaIndicators, lastUpdated }: Props) {
  const title = 'MiCA Indicators'
  const description =
    'Mica information about this table goes here Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, ratione quaerat esse soluta veritatis error! Odit aperiam hic excepturi doloremque ea?'

  return (
    <Layout
      title={title}
      description={textContent(description)}
      path={routes['mica-indicators'].index}
      heading={
        <SectionTransparent className="pt-24 md:pt-32 pb-0">
          <SiteHeading
            size="64"
            title={title}
            description={description}
            anchorLink={false}
          />
        </SectionTransparent>
      }
      backgroundImage={backgrounds.waterfall}
      previewImage={previews.waterfall}
    >
      <SectionGradient className="pb:30 pt-8 pb-20">
        <MicaComplianceTable
          micaIndicators={micaIndicators}
          lastUpdated={lastUpdated}
        />
      </SectionGradient>
    </Layout>
  )
}

export async function getStaticProps() {
  const micaIndicators = await getMicaIndicators()
  const lastUpdated = new Date().toISOString()

  const props = {
    micaIndicators,
    lastUpdated,
  }

  return {
    props,
    revalidate: minutesInSeconds(1440),
  }
}
