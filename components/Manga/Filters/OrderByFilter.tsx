import {
  Control,
  Controller,
  FieldValues,
  Path,
  useFormContext
} from 'react-hook-form'
import { View } from 'react-native'
import { RadioButton, Text } from 'react-native-paper'
import { OrderEnum } from '@interfaces/enum'

const orderProperties: Array<{
  name: keyof IMangaRequest['order']
  label: string
}> = [
  { name: 'createdAt', label: 'Creation Date' },
  { name: 'updatedAt', label: 'Creation Date' },
  { name: 'publishAt', label: 'Creation Date' },
  { name: 'readableAt', label: 'Creation Date' },
  { name: 'volume', label: 'Creation Date' },
  { name: 'chapter', label: 'Creation Date' }
]

function ControlledOrderItem({
  control,
  name,
  label
}: {
  control: Control<FieldValues>
  name: Path<FieldValues>
  label: string
}) {
  return (
    <Controller
      control={control}
      name={`order.${name}`}
      render={({ field: { value, onChange } }) => (
        <View>
          <Text>{label}</Text>
          {Object.values(OrderEnum).map((enumValue: string) => {
            return (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                <RadioButton
                  value={enumValue}
                  status={value === enumValue ? 'checked' : 'unchecked'}
                  onPress={() => onChange(value)}
                />
                <Text>{enumValue}</Text>
              </View>
            )
          })}
        </View>
      )}
    />
  )
}

export default function OrderByFilter() {
  const { control } = useFormContext()
  return (
    <>
      {orderProperties?.map(item => (
        <ControlledOrderItem {...item} control={control} />
      ))}
    </>
  )
}
