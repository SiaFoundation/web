import { useMemo } from 'react'
import {
  components,
  GroupBase,
  SelectComponentsConfig,
  SingleValue,
} from 'react-select'
import Select from 'react-select/async'
import { Box } from '../core/Box'
import { CSS, globalCss } from '../config/theme'

type Option = {
  value: string
  label: string
}

type Props = {
  value?: Option
  onChange?: (option: SingleValue<Option>) => void
  disabled?: boolean
  size?: '1' | '2' | '3'
  prefix?: React.ReactNode
  indicators?: boolean
  state?: 'valid' | 'invalid'
  options: Option[]
  css?: CSS
}

export function ComboBox({
  value,
  onChange,
  options,
  disabled,
  size = '2',
  prefix,
  indicators = true,
  state,
  css,
}: Props) {
  const filter = useMemo(
    () => (inputValue: string) => {
      return options
        .filter((i) =>
          i.label.toLowerCase().startsWith(inputValue.toLowerCase())
        )
        .slice(0, 10)
    },
    [options]
  )

  const loadOptions = useMemo(
    () => (inputValue: string, callback: (options: Option[]) => void) => {
      callback(filter(inputValue))
    },
    [filter]
  )

  const customComponents = useMemo(() => {
    const comps: Partial<
      SelectComponentsConfig<Option, false, GroupBase<Option>>
    > = {
      Control: ({ children, ...props }) => {
        return (
          <components.Control {...props}>
            {prefix && <Box>{prefix}</Box>}
            {children}
          </components.Control>
        )
      },
    }

    if (!indicators) {
      comps.IndicatorsContainer = () => {
        return null
      }
    }
    return comps
  }, [prefix, indicators])

  return (
    <Box css={{ width: '100%', ...css }}>
      <Select
        options={options}
        cacheOptions
        loadOptions={loadOptions}
        isDisabled={disabled}
        onChange={onChange}
        menuPlacement="auto"
        defaultOptions={options.slice(0, 10)}
        value={value}
        classNamePrefix="react-select"
        className={
          `react-select-size-${size}` +
          (state ? ` react-select-state-${state}` : '')
        }
        components={customComponents}
      />
    </Box>
  )
}

export const comboBoxGlobalCss = globalCss({
  '.react-select__control': {
    width: '100% !important',
    backgroundColor: '$panel !important',
    fontFamily: '$sans !important',
    color: '$hiContrast !important',
    border: 'none !important',

    '@hover': {
      '&:hover': {
        boxShadow: '$colors$borderInputHover, $colors$shadow',
      },
    },

    boxShadow: '$colors$border, $colors$shadow',
    '&:focus': {
      boxShadow:
        '$colors$borderFocus, $colors$borderInputActive, $colors$shadowActive',
      '&:-webkit-autofill': {
        boxShadow:
          '$colors$borderFocus, $colors$borderInputActive, $colors$shadowActive, inset 0 0 0 100px $colors$accent4',
      },
    },
  },
  '.react-select__single-value': {
    color: '$hiContrast !important',
  },
  '.react-select__input': {
    color: '$hiContrast !important',
  },
  '.react-select__placeholder': {
    color: '$gray9',
  },
  '.react-select__menu': {
    backgroundColor: '$panel !important',
    borderRadius: '$2',
    color: '$hiContrast !important',
    fontFamily: '$sans !important',
  },
  '.react-select__option--is-focused': {
    backgroundColor: '$blue9 !important',
    color: '$loContrast !important',
  },

  // variant size
  '.react-select-size-1': {
    '.react-select__control': {
      borderRadius: '$1',
      height: '$3-5',
      minHeight: '$3-5',
      fontSize: '$12',
      padding: '0 $1',
    },
    '.react-select__indicators': {
      height: '$3-5',
    },
  },
  '.react-select-size-2': {
    '.react-select__control': {
      borderRadius: '$1',
      height: '$5',
      minHeight: '$5',
      fontSize: '$16',
      padding: '0 $1-5',
    },
    '.react-select__indicators': {
      height: '$5',
    },
  },
  '.react-select-size-3': {
    '.react-select__control': {
      borderRadius: '$1',
      height: '$6',
      minHeight: '$6',
      fontSize: '$24',
      padding: '0 $1-5',
    },
    '.react-select__indicators': {
      height: '$6',
    },
  },

  // variant state
  '.react-select-state-invalid': {
    '.react-select__control': {
      boxShadow: '$colors$borderRed, $colors$shadow',
      '@hover': {
        '&:hover': {
          boxShadow: '$colors$borderRedHover, $colors$shadow',
        },
      },
      '&:focus': {
        boxShadow:
          '$colors$borderFocus, $colors$borderRedActive, $colors$shadowActive',
      },
    },
  },
  '.react-select-state-valid': {
    '.react-select__control': {
      boxShadow: '$colors$borderGreen, $colors$shadow',
      '@hover': {
        '&:hover': {
          boxShadow: '$colors$borderGreenHover, $colors$shadow',
        },
      },
      '&:focus': {
        boxShadow:
          '$colors$borderFocus, $colors$borderGreenActive, $colors$shadowActive',
      },
    },
  },
})
