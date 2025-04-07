'use client'

import {
  Link,
  ValueCopyable,
  ValueSc,
  ValueSf,
} from '@siafoundation/design-system'
import { EntityListItemLayout } from '../Entity/EntityListItemLayout'
import BigNumber from 'bignumber.js'

type Props = {
  label: string
  address: string
  addressHref: string
  outputId: string
  sc?: BigNumber
  sf?: number
}

export function OutputListItem(props: Props) {
  const { label, outputId, address, addressHref, sc, sf } = props
  return (
    <EntityListItemLayout label={label} href={addressHref}>
      <div className="flex flex-col items-center gap-1 w-full">
        <div className="flex gap-2 items-center w-full">
          <Link href={addressHref} weight="medium" underline="hover" ellipsis>
            {label}
          </Link>
          <div className="flex-1" />
          {sc && <ValueSc variant="change" value={sc} />}
          {sf && <ValueSf variant="change" value={sf} />}
        </div>
        <div className="flex gap-2 justify-between w-full @container">
          <ValueCopyable
            value={outputId}
            type="output"
            label={label}
            color="subtle"
          />
          <ValueCopyable
            value={address}
            type="address"
            color="subtle"
            href={addressHref}
            className="hidden @sm:flex"
          />
        </div>
      </div>
    </EntityListItemLayout>
  )
}
