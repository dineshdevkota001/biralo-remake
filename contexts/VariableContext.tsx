import {
  FC,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { FieldValues, UseFormReturn, useForm } from "react-hook-form";

type IVariableContext = UseFormReturn<FieldValues> & {
  search: string;
  setSearch: (x: string) => void;
};

export const VariableContext = createContext<IVariableContext>({
  search: "",
  setSearch: () => undefined,
} as unknown as IVariableContext);

export default function useVariables() {
  return useContext(VariableContext);
}

export function VariableProvider({
  children,
  ...useFormParams
}: IHaveChildren & Parameters<typeof useForm>[0]) {
  const [search, setSearch] = useState("");

  const form = useForm(useFormParams);

  return (
    <VariableContext.Provider
      value={useMemo(() => ({ search, setSearch, ...form }), [search, form])}
      children={children}
    />
  );
}

// This is not working
export function WithVariables<N extends JSX.IntrinsicAttributes>(
  Component: FC<N>,
): FC<N> {
  return (props) => (
    <VariableProvider>
      <Component {...props} />
    </VariableProvider>
  );
}
