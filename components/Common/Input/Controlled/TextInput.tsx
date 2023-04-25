import { capitalize } from "lodash";
import { ComponentProps } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import {
  ActivityIndicator,
  TextInput,
  TextInputProps,
} from "react-native-paper";

export default function TextInput2({
  control,
  name,
  renderProps,
  // textinput props
  label,
  right,
  error,
  disabled,
  onChangeText,
  onBlur,
  value,
  ...props
}: TextInputProps & {
  control: Control<any>;
  name: Path<any>;
  renderProps?: (
    x: Parameters<ComponentProps<typeof Controller>["render"]>[0],
  ) => TextInputProps;
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={(renderProp) => {
        const {
          field: { onChange, name, onBlur: onFieldBlur, value: fieldVlaue },
          fieldState: { error: fieldError, isTouched },
          formState: { isSubmitting, isValidating },
        } = renderProp;

        return (
          <TextInput
            {...props}
            label={label ?? capitalize(name)}
            right={isValidating ? <ActivityIndicator /> : right}
            error={error || (fieldError && isTouched)}
            disabled={disabled || isSubmitting}
            onChangeText={(e) => {
              onChange(e);
              onChangeText?.(e);
            }}
            onBlur={(e) => {
              onFieldBlur();
              onBlur?.(e);
            }}
            value={value || fieldVlaue}
            {...renderProps?.(renderProp)}
          />
        );
      }}
    />
  );
}
