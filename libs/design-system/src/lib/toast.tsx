import { CheckmarkOutline16, CloseOutline16 } from '../icons/carbon'
import toast, {
  DefaultToastOptions,
  Toaster as RToaster,
  ToastOptions,
} from 'react-hot-toast'

export type { ToastOptions }

export const triggerToast = (text: string, options: ToastOptions = {}) => {
  toast(text, options)
}

export const triggerSuccessToast = (
  text: string,
  options: ToastOptions = {}
) => {
  toast.success(text, options)
}

export const triggerErrorToast = (text: string, options: ToastOptions = {}) => {
  toast.error(text, options)
}

const defaultStyles = {
  fontFamily: 'var(--fonts-sans)',
  fontWeight: 'semibold',
  backgroundColor: 'var(--colors-loContrast)',
  color: 'var(--colors-hiContrast)',
  borderRadius: 'var(--radii-2)',
  boxShadow:
    'inset 0 0 0 1px var(--colors-slate7), 0 0 0 1px var(--colors-slate7)',
}

const successStyles = {
  boxShadow:
    'inset 0 0 0 1px var(--colors-primary10), 0 0 0 1px var(--colors-primary10)',
}

const errorStyles = {
  boxShadow: 'inset 0 0 0 1px var(--colors-red8), 0 0 0 1px var(--colors-red8)',
}

const defaultOptions: DefaultToastOptions = {
  // position: 'bottom-right',
  position: 'top-center',
  duration: 4_000,
  style: defaultStyles,
  success: {
    style: successStyles,
    icon: <CheckmarkOutline16 />,
  },
  error: {
    style: errorStyles,
    icon: <CloseOutline16 />,
  },
}

export function Toaster() {
  return <RToaster toastOptions={defaultOptions} />
}
