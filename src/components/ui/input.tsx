import { ComponentProps, createContext, ReactNode, useContext } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const input = tv({
  slots: {
    root: 'border border-zinc-900 bg-zinc-white',
    control: 'placeholder-white text-zinc-800 text-xs',
  },

  variants: {
    variant: {
      default: {},
      filter: {
        root: 'rounded-full py-1.5 px-3 w-40 flex items-center gap-1.5 text-1xl text-zinc-500 leading-tight focus-within:border-zinc-600',
        control: 'bg-transparent flex-1 outline-none',
      },
      theme: {
        root: 'rounded-full py-1.5 px-3 flex items-center gap-1.5 text-1xl text-black leading-tight  focus-within:border-zinc-200',
        control: 'bg-transparent flex-1 outline-none',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

const inputContext = createContext({} as VariantProps<typeof input>)

export function Input({
  children,
  variant,
}: { children: ReactNode } & VariantProps<typeof input>) {
  const { root } = input({ variant })

  return (
    <inputContext.Provider value={{ variant }}>
      <div className={root()}>{children}</div>
    </inputContext.Provider>
  )
}

export interface ControlProps extends ComponentProps<'input'> {}

export function Control({ className, ...props }: ControlProps) {
  const { variant } = useContext(inputContext)
  const { control } = input({ variant })

  return <input className={control({ className })} {...props} />
}
