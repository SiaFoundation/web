import { Layout } from '../../components/Layout'
import { textContent } from '../../lib/utils'
import { routes } from '../../config/routes'
import { SectionTransparent } from '../../components/SectionTransparent'
import { Link, SiteHeading } from '@siafoundation/design-system'
import { SectionGradient } from '../../components/SectionGradient'
import { backgrounds, previews } from '../../content/assets'
import { MicaComplianceTable } from '../../components/MicaComplianceTable'
import { hoursInSeconds } from '@siafoundation/units'
import { AsyncReturnType } from '../../lib/types'
import { getMicaIndicators } from '../../content/mica'

type Props = AsyncReturnType<typeof getStaticProps>['props']

export default function MicaIndicators({ micaIndicators, lastUpdated }: Props) {
  const title = 'MiCA Indicators'
  const description = (
    <>
      The EU Markets in Crypto-Assets (
      <Link href="https://www.esma.europa.eu/esmas-activities/digital-finance-and-innovation/markets-crypto-assets-regulation-mica">
        MiCA)
      </Link>{' '}
      regulation requires token issuers and crypto-asset service providers
      (CASPs) to disclose sustainability data. This following data is maintained
      in partnership with the Crypto Carbon Ratings Institute (
      <Link href="https://carbon-ratings.com/">CCRI</Link>). You can find their
      methodology <Link href="/mica-indicators/methodology">here</Link>.
    </>
  )

  return (
    <Layout
      title={title}
      description={textContent(description)}
      path={routes.micaIndicators.index}
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
    revalidate: hoursInSeconds(24),
  }
}
