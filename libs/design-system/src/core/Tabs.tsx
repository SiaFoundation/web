import { styled } from '../config/theme'
import * as TabsPrimitive from '@radix-ui/react-tabs'

const StyledTabs = styled(TabsPrimitive.Root, {
  display: 'flex',
  flexDirection: 'column',
})

const StyledList = styled(TabsPrimitive.List, {
  flexShrink: 0,
  display: 'flex',
  borderBottom: `1px solid $brandGray6`,
})

const StyledTrigger = styled(TabsPrimitive.Trigger, {
  all: 'unset',
  fontFamily: '$sans',
  padding: '0 $5',
  height: '$7',
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '$16',
  fontWeight: '500',
  lineHeight: 1,
  color: '$textSubtle',
  userSelect: 'none',
  cursor: 'pointer',
  '&:first-child': { borderTopLeftRadius: 6 },
  '&:last-child': { borderTopRightRadius: 6 },
  '&:hover': { color: '$textSubtleHover' },
  '&[data-state="active"]': {
    color: '$accent10',
    boxShadow: 'inset 0 -1px 0 0 $colors$accent9, 0 1px 0 0 $colors$accent9',
  },
})

const StyledContent = styled(TabsPrimitive.Content, {
  flexGrow: 1,
  paddingTop: '$3',
  borderBottomLeftRadius: 6,
  borderBottomRightRadius: 6,
  outline: 'none',
})

export const Tabs = StyledTabs
export const TabsList = StyledList
export const TabsTrigger = StyledTrigger
export const TabsContent = StyledContent
