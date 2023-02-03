import { TextField } from '../core/TextField'
import { ConfigurationTipText } from './ConfigurationTipText'

type Props = {
  suggestion?: string
  suggestionTip?: React.ReactNode
  value: string
  onChange: (value: string) => void
  changed?: boolean
}

export function ConfigurationText({
  suggestion,
  suggestionTip,
  value,
  onChange,
  changed,
}: Props) {
  return (
    <div className="flex flex-col gap-3 w-[220px]">
      <TextField
        value={value}
        state={changed ? 'valid' : 'default'}
        onChange={(e) => onChange(e.currentTarget.value)}
      />
      <div className="flex flex-col gap-2">
        {suggestion && suggestionTip && (
          <ConfigurationTipText
            label="Suggestion"
            tip={suggestionTip}
            value={suggestion}
            onChange={onChange}
          />
        )}
      </div>
    </div>
  )
}
