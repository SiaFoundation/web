import React from 'react'
import { CSS } from '../config/theme'
import { Grid } from '../core/Grid'
import { Flex } from '../core/Flex'
import { ThemeRadio } from '../components/ThemeRadio'
import { Text } from '../core/Text'
import { SimpleLogoIcon } from '../icons/SimpleLogoIcon'
import { NextLink } from '../core/Link'
import { LinkData } from '../lib/links'
import { Heading, Paragraph } from '../core'

const radioCss: CSS = {
  [`& *, & ${Text}`]: {
    color: '$whiteA9',
  },

  [`&[data-state="checked"] *, &[data-state="checked"] ${Text}`]: {
    color: 'white',
  },
}

export type MenuSection = {
  title: string
  links: LinkData[]
}

type Props = {
  menuSections: MenuSection[]
  onClick?: () => void
  inSiteMenu?: boolean
}

export function SiteMap({ menuSections, onClick, inSiteMenu }: Props) {
  return (
    <Flex direction="column" gap="6" align="start">
      <Flex
        css={{
          color: '$hiContrast',
          '@initial': {
            py: '$1',
          },
          '@bp2': {
            py: '$3',
          },
        }}
      >
        <SimpleLogoIcon size={50} />
      </Flex>
      <Grid
        gapX="6"
        gapY="6"
        columns={{
          '@initial': '2',
          '@bp2': '4',
          '@bp3': '5',
        }}
      >
        {menuSections.map(({ title, links }) => (
          <Flex key={title}>
            <Flex direction="column" gap="4">
              <Heading font="mono">{title}</Heading>
              <Flex direction="column" gap="1">
                {links.map(({ title, link, newTab, disabled }) => (
                  <MenuLink
                    key={title + link}
                    link={link}
                    title={title}
                    newTab={newTab}
                    disabled={disabled}
                    onClick={!disabled ? onClick : undefined}
                    inSiteMenu={inSiteMenu}
                  />
                ))}
              </Flex>
            </Flex>
          </Flex>
        ))}
      </Grid>
      {inSiteMenu && (
        <Flex css={{ marginTop: '$6' }}>
          <ThemeRadio radioCss={radioCss} />
        </Flex>
      )}
    </Flex>
  )
}

type MenuLinkProps = {
  link: string
  title: React.ReactNode
  onClick?: () => void
  newTab?: boolean
  disabled?: boolean
  inSiteMenu?: boolean
}

function MenuLink({
  link,
  title,
  onClick,
  newTab,
  disabled,
  inSiteMenu,
}: MenuLinkProps) {
  return (
    <Paragraph
      size="16"
      css={
        inSiteMenu
          ? {
              color: '$whiteA11',
              '@hover': !disabled
                ? {
                    '&:hover': {
                      color: '$whiteA12',
                    },
                  }
                : {},
            }
          : {}
      }
    >
      <NextLink
        href={link}
        underline="hover"
        disabled={disabled}
        onClick={onClick}
        target={newTab ? '_blank' : undefined}
      >
        {title}
      </NextLink>
    </Paragraph>
  )
}
