import { createContext, useContext, useState } from 'react'
import {
  FieldValues,
  FormProvider,
  UseFormReturn,
  useForm,
  useFormContext,
  useWatch
} from 'react-hook-form'

type IVariableContext = UseFormReturn<FieldValues> & {
  search: string
  setSearch: (x: string) => void
}

export const VariableContext = createContext<IVariableContext>({
  search: '',
  setSearch: () => undefined
} as unknown as IVariableContext)

export default function useVariables() {
  const context = useContext(VariableContext)
  const variables = useWatch({ control: context.control })
  return { ...context, variables }
}

export function useVariable() {
  const context = useFormContext()
  const variables = useWatch({ control: context.control })
  return { ...context, variables }
}

export function VariableProvider({
  children,
  ...useFormParams
}: IHaveChildren & Parameters<typeof useForm>[0]) {
  const [search, setSearch] = useState('')

  const form = useForm(useFormParams)
  useForm

  return <FormProvider {...form}>{children}</FormProvider>
}
