import {
  Button,
  Add16,
  Filter16,
  DropdownMenu,
  TextField,
  Text,
  ChevronRight16,
  ipRegex,
} from '@siafoundation/design-system'
import { useCallback, useMemo, useEffect, useRef, useState } from 'react'
import { HostFilter, useHosts } from '../hooks/useHosts'
import { cx } from 'class-variance-authority'

export function HostsFilterDropdownMenu() {
  const { setFilter } = useHosts()
  const [value, setValue] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)

  const inputRef = useRef<HTMLInputElement>()
  const [index, setIndex] = useState<number>(0)

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 0)
    } else {
      setValue('')
      setIndex(0)
    }
  }, [open])

  const close = useCallback(() => {
    setOpen(false)
    setValue('')
    setIndex(0)
  }, [setOpen, setValue, setIndex])

  const matchers = useMemo(() => {
    const whitelist = (value: string) =>
      'whitelist white list allowlist allow list'.includes(value)
    const blacklist = (value: string) =>
      'blacklist black list denylist deny list'.includes(value)
    const isIP = (value: string) =>
      ipRegex.v4().test(value) || ipRegex.v6().test(value)
    const publicKey = (value: string) =>
      !whitelist(value) && !blacklist(value) && !isIP(value)
    const address = (value: string) => !whitelist(value) && !blacklist(value)
    return {
      whitelist,
      blacklist,
      publicKey,
      address,
    }
  }, [])

  const options: {
    key: string
    type: HostFilter['type']
    match: (value: string) => boolean
    filter: () => void
    display: () => React.ReactNode
  }[] = useMemo(
    () => [
      {
        key: 'publicKey',
        type: 'contains',
        match: matchers.publicKey,
        display: () => (
          <div className="flex gap-1 items-center">
            <Text color="subtle" noWrap>
              Public key
            </Text>
            <Text className="flex gap-1" color="subtle">
              <ChevronRight16 />
            </Text>
            <Text ellipsis>{value}</Text>
          </div>
        ),
        filter: () =>
          setFilter({
            key: 'publicKey',
            type: 'contains',
            value,
          }),
      },
      {
        key: 'address',
        type: 'contains',
        match: matchers.address,
        display: () => (
          <div className="flex gap-1 items-center">
            <Text color="subtle">IP</Text>
            <Text className="flex gap-1" color="subtle">
              <ChevronRight16 />
            </Text>
            <Text ellipsis>{value}</Text>
          </div>
        ),
        filter: () =>
          setFilter({
            key: 'address',
            type: 'contains',
            value,
          }),
      },
      {
        key: 'whitelist',
        type: 'bool',
        match: matchers.whitelist,
        display: () => (
          <Text color="subtle">
            <Text weight="bold">on</Text> whitelist
          </Text>
        ),
        filter: () =>
          setFilter({
            key: 'whitelist',
            type: 'bool',
            value: true,
          }),
      },
      {
        key: 'notwhitelist',
        type: 'bool',
        match: matchers.whitelist,
        display: () => (
          <Text color="subtle">
            <Text weight="bold">not on</Text> whitelist
          </Text>
        ),
        filter: () =>
          setFilter({
            key: 'whitelist',
            type: 'bool',
            value: false,
          }),
      },
      {
        key: 'blacklist',
        type: 'bool',
        match: matchers.blacklist,
        display: () => (
          <Text color="subtle">
            <Text weight="bold">on</Text> blacklist
          </Text>
        ),
        filter: () =>
          setFilter({
            key: 'blacklist',
            type: 'bool',
            value: true,
          }),
      },
      {
        key: 'notblacklist',
        type: 'bool',
        match: matchers.blacklist,
        display: () => (
          <Text color="subtle">
            <Text weight="bold">not on</Text> blacklist
          </Text>
        ),
        filter: () =>
          setFilter({
            key: 'blacklist',
            type: 'bool',
            value: false,
          }),
      },
    ],
    [value, setFilter, matchers]
  )

  const filteredOptions = useMemo(
    () => options.filter(({ match }) => !value || match(value)),
    [options, value]
  )

  const indexUp = useCallback(() => {
    setIndex((i) => {
      if (i <= 0) {
        return filteredOptions.length - 1
      }
      return i - 1
    })
  }, [setIndex, filteredOptions])

  const indexDown = useCallback(() => {
    setIndex((i) => {
      if (i >= filteredOptions.length - 1) {
        return 0
      }
      return i + 1
    })
  }, [setIndex, filteredOptions])

  const select = useCallback(
    (index: number) => {
      const option = filteredOptions[index]
      if (option.type === 'bool' || value) {
        option.filter()
        close()
      }
    },
    [filteredOptions, close, value]
  )

  return (
    <DropdownMenu
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button>
          <Filter16 />
          Filter
          <Add16 />
        </Button>
      }
      contentProps={{
        align: 'start',
        onKeyDown: (e) => {
          if (e.key === 'Tab') {
            if (e.shiftKey) {
              indexUp()
            } else {
              indexDown()
            }
            return
          }
          if (e.key === 'ArrowUp') {
            indexUp()
            return
          }
          if (e.key === 'ArrowDown') {
            indexDown()
            return
          }
          if (e.key === 'Enter') {
            select(index)
            return
          }
        },
      }}
      className="w-60"
    >
      <TextField
        ref={inputRef}
        variant="ghost"
        placeholder="Filter..."
        onChange={(e) => {
          setIndex(0)
          setValue(e.target.value)
        }}
      />
      <div className="flex flex-col pb-0.5">
        {filteredOptions.map(({ key, display }, i) => (
          <div
            key={key}
            onMouseEnter={() => setIndex(i)}
            onClick={() => select(i)}
            className={cx([
              'py-1 px-2 rounded cursor-pointer overflow-hidden',
              i === index && 'bg-gray-200',
            ])}
          >
            {display()}
          </div>
        ))}
      </div>
    </DropdownMenu>
  )
}
