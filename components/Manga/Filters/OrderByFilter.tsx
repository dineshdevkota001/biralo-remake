import {
  Control,
  Controller,
  FieldValues,
  Path,
  useFormContext
} from 'react-hook-form'
import { Chip, ChipProps } from 'react-native-paper'
import { OrderEnum } from '@interfaces/enum'

const orderProperties = [
  { name: 'createdAt', label: 'Creation Date' },
  { name: 'updatedAt', label: 'Updated Date' },
  { name: 'title', label: 'Alphabetical' },
  { name: 'year', label: 'Publication Year' },
  { name: 'latestUploadedChapter', label: 'Latest' },
  { name: 'followedCount', label: 'Follows' },
  { name: 'relevance', label: 'Relevance' },
  { name: 'rating', label: 'Rating' }
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
      name="order"
      render={({ field: { value: orderValue, onChange } }) => {
        const getProps = (): Omit<ChipProps, 'children'> => {
          const value = orderValue?.[name]

          const handleChange = (v?: OrderEnum) => () => {
            onChange({
              [name]: v
            })
          }
          if (!value)
            return {
              mode: 'outlined',
              onPress: handleChange(OrderEnum.DESC)
            }
          if (value === OrderEnum.DESC)
            return {
              icon: 'arrow-down',
              onPress: handleChange(OrderEnum.ASC)
            }
          if (value === OrderEnum.ASC)
            return {
              icon: 'arrow-up',
              onPress: handleChange(undefined)
            }
          return {}
        }
        return <Chip {...getProps()}>{label}</Chip>
      }}
    />
  )
}

export default function OrderByFilter() {
  const { control } = useFormContext()
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {orderProperties?.map(item => (
        <ControlledOrderItem {...item} control={control} key={item?.name} />
      ))}
    </>
  )
}
