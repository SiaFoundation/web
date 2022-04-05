import Head from 'next/head'
import Script from 'next/script'
import { appName, newsFeedName } from '../config/app'
import { external, sitemap } from '../config/site'

type Props = {
  title: string
  description: string
  image: string
  path: string
}

export function PageHead({ title, description, image, path }: Props) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#1ed660" />
        <meta name="msapplication-TileColor" content="#2b5797" />
        <meta name="theme-color" content="#ffffff" />
        <noscript>
          {/* eslint-disable-next-line */}
          <img
            referrerPolicy="no-referrer-when-downgrade"
            src="https://surveillance.sia.tech/matomo.php?idsite=1&amp;rec=1"
            style={{ border: 0 }}
            alt=""
          />
        </noscript>
        <link
          rel="alternate"
          type="application/rss+xml"
          href={sitemap.newsroom.feed.rss}
          title={newsFeedName}
        />
        <link
          rel="alternate"
          type="application/atom+xml"
          href={sitemap.newsroom.feed.atom}
          title={newsFeedName}
        />
        <link
          rel="alternate"
          type="application/json"
          href={sitemap.newsroom.feed.json}
          title={newsFeedName}
        />

        <title>{title}</title>
        <meta name="description" content={description}></meta>

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content={external.twitterHandle} />

        {/* Open Graph */}
        <meta property="og:url" content={`https://sia.tech${path}`} />
        <meta property="og:image" content={image} />
        <meta property="og:site_name" content={appName} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
      <Script
        id="matomo"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
              var _paq = window._paq = window._paq || [];
              /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
              _paq.push(['trackPageView']);
              _paq.push(['enableLinkTracking']);
              (function() {
                var u="//surveillance.sia.tech/";
                _paq.push(['setTrackerUrl', u+'matomo.php']);
                _paq.push(['setSiteId', '1']);
                var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
                g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
              })();
              `,
        }}
      />
    </>
  )
}
