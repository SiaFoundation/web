import { ArrowRightIcon, ClipboardIcon } from '@radix-ui/react-icons'
import {
  Box,
  Button,
  copyToClipboard,
  RLinkButton,
  TextArea,
  Tooltip,
} from '@siafoundation/design-system'
import { Fragment } from 'react'
import { Message } from '../../../components/Message'
import { routes } from '../../../routes'

type Props = {
  hash: string
}

export function Share({ hash }: Props) {
  return (
    <Fragment>
      <Message
        message={`
        To proceed, share the following hash with your counterparty for
        signing.
      `}
      />
      <Box css={{ position: 'relative', width: '100%' }}>
        <Tooltip align="end" content="Copy hash to clipboard">
          <Button
            size="2"
            css={{
              position: 'absolute',
              top: '$2',
              right: '$5',
              zIndex: 1,
            }}
            onClick={() => copyToClipboard(hash, 'swap hash')}
          >
            <ClipboardIcon />
          </Button>
        </Tooltip>
        <TextArea
          size="3"
          rows={4}
          onClick={() => copyToClipboard(hash, 'swap hash')}
          onFocus={(e) => e.target.select()}
          readOnly
          spellCheck={false}
          css={{
            width: '100%',
            userSelect: 'none',
            color: '$gray10',
          }}
          value={hash}
        />
      </Box>
      <RLinkButton
        variant="green"
        size="3"
        to={routes.input}
        css={{ width: '100%' }}
      >
        Proceed to enter hash from counterparty
        <Box as="span" css={{ pl: '$1', lh: '1' }}>
          <ArrowRightIcon />
        </Box>
      </RLinkButton>
    </Fragment>
  )
}
