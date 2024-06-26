import { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const button = tv({
  base: 'disabled:opacity-50 inline-flex items-center gap-1.5 text-xs font-medium',

  variants: {
    variant: {
      default:
        'py-1.5 px-2.5 rounded-md bg-indigo-500 border border-zinc-800 text-zinc-300 hover:border-zinc-700',
      primary:
        'flex items-center justify-center py-1 px-2 text-1xl w-40 rounded-full bg-indigo-500 text-white hover:bg-indigo-600',
    },
    size: {
      default: '',
      icon: 'p-1',
    },
  },

  defaultVariants: {
    variant: 'default',
  },
})

export interface ButtonProps
  extends ComponentProps<'button'>,
    VariantProps<typeof button> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button {...props} className={button({ variant, size, className })} />
}
