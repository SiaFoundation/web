import { CheckmarkOutline16, CloseOutline16 } from '../icons/carbon'
import toast, {
  DefaultToastOptions,
  Toaster as RToaster,
  ToastOptions,
} from 'react-hot-toast'
import { cx } from 'class-variance-authority'
import { panelStyles } from '../core/Panel'

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

const defaultOptions: DefaultToastOptions = {
  // position: 'bottom-right',
  position: 'top-center',
  duration: 4_000,
  className: cx(
    panelStyles(),
    'font-sans font-normal',
    'text-gray-1100 dark:text-white'
  ),
  success: {
    icon: <CheckmarkOutline16 className="w-3 text-green-600" />,
  },
  error: {
    icon: <CloseOutline16 className="w-3 text-red-600" />,
  },
}

export function Toaster() {
  return <RToaster toastOptions={defaultOptions} />
}
