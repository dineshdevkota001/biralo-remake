import {
  Control,
  Controller,
  FieldValues,
  Path,
  useFormContext
} from 'react-hook-form'
import { OrderEnum } from '@interfaces/enum'
import ThreewaySwitch from '@components/Common/Input/Controlled/ThreewaySwitch'

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
        let value
        if (orderValue?.[name] === OrderEnum.DESC) value = false
        if (orderValue?.[name] === OrderEnum.ASC) value = true

        return (
          <ThreewaySwitch
            value={value}
            label={label}
            leftIconProps={{
              name: 'arrow-down'
            }}
            rightIconProps={{
              name: 'arrow-up'
            }}
            onChange={v => {
              if (v === false)
                onChange({
                  [name]: OrderEnum.DESC
                })
              else if (v === true)
                onChange({
                  [name]: OrderEnum.ASC
                })
              else
                onChange({
                  [name]: undefined
                })
            }}
          />
        )
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
