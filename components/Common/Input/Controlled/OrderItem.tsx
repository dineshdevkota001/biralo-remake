import ThreewaySwitch from '@components/Common/Input/Controlled/ThreewaySwitch'
import { OrderEnum } from '@interfaces/mangadex/enum'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'

export default function ControlledOrderItem({
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
