import { CheckmarkOutline16, CloseOutline16 } from '../icons/carbon'
import toast, {
  DefaultToastOptions,
  Toaster as RToaster,
  ToastOptions,
} from 'react-hot-toast'
import { cx } from 'class-variance-authority'
import { panelStyles } from '../core/Panel'
import { rootClasses } from '../config/css'

export type { ToastOptions }

export const triggerToast = (text: string, options: ToastOptions = {}) => {
  toast(text.length > 50 ? `${text.slice(0, 50)}` : text, options)
}

export const triggerSuccessToast = (
  text: string,
  options: ToastOptions = {}
) => {
  toast.success(text.length > 200 ? `${text.slice(0, 200)}...` : text, options)
}

export const triggerErrorToast = (text: string, options: ToastOptions = {}) => {
  toast.error(text.length > 200 ? `${text.slice(0, 200)}...` : text, options)
}

const defaultOptions: DefaultToastOptions = {
  // position: 'bottom-right',
  position: 'top-center',
  duration: 4_000,
  className: cx(
    rootClasses,
    panelStyles(),
    'font-sans font-normal',
    'text-gray-1100 dark:text-white'
  ),
  success: {
    icon: (
      <div>
        <CheckmarkOutline16 className="w-5 text-green-600" />
      </div>
    ),
  },
  error: {
    icon: (
      <div>
        <CloseOutline16 className="w-5 text-red-600" />
      </div>
    ),
  },
}

export function Toaster() {
  return <RToaster toastOptions={defaultOptions} />
}
