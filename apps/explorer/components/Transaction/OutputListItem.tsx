'use client'

import BigNumber from 'bignumber.js'

import {
  Link,
  Text,
  ValueCopyable,
  ValueSc,
  ValueSf,
} from '@siafoundation/design-system'

import { routes } from '../../config/routes'

import { EntityListItemLayout } from '../Entity/EntityListItemLayout'

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
  const outputHref = routes.output.view.replace(':id', outputId)
  return (
    <EntityListItemLayout label={label} href={outputHref}>
      <div className="flex flex-col items-center gap-1 w-full">
        <div className="flex gap-2 items-center w-full">
          <Link href={outputHref} weight="medium" underline="hover" ellipsis>
            {label}
          </Link>
          <div className="flex-1" />
          {sc && <ValueSc variant="value" value={sc} />}
          {sf && <ValueSf variant="value" value={sf} />}
        </div>
        <div className="flex gap-2 justify-between w-full flex-col lg:flex-row">
          <div className="flex gap-1">
            <Text>ID:</Text>
            <ValueCopyable
              value={outputId}
              type="output"
              label={label}
              color="subtle"
              href={routes.output.view.replace(':id', outputId)}
              maxLength={10}
            />
          </div>
          <div className="flex gap-1">
            <Text>Addr:</Text>
            <ValueCopyable
              value={address}
              type="address"
              color="subtle"
              href={addressHref}
              maxLength={10}
            />
          </div>
        </div>
      </div>
    </EntityListItemLayout>
  )
}
