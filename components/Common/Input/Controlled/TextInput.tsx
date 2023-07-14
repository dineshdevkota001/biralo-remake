import { capitalize } from 'lodash'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import {
  ActivityIndicator,
  TextInput,
  TextInputProps
} from 'react-native-paper'

export default function ControlledInput<T extends FieldValues>({
  control,
  name,
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
  control: Control<T>
  name: Path<T>
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={renderProp => {
        const {
          field: { onChange, onBlur: onFieldBlur, value: fieldVlaue },
          fieldState: { error: fieldError, isTouched },
          formState: { isSubmitting, isValidating }
        } = renderProp

        return (
          <TextInput
            {...props}
            label={label ?? capitalize(name)}
            right={isValidating ? <ActivityIndicator /> : right}
            error={error || (fieldError && isTouched)}
            disabled={disabled || isSubmitting}
            onChangeText={e => {
              onChange(e)
              onChangeText?.(e)
            }}
            onBlur={e => {
              onFieldBlur()
              onBlur?.(e)
            }}
            value={value || fieldVlaue}
          />
        )
      }}
    />
  )
}
