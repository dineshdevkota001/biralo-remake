import ControlledOrderItem from '@components/Common/Input/Controlled/OrderItem'
import { useFormContext } from 'react-hook-form'

const orderProperties = [
  { name: 'createdAt', label: 'Creation Date' },
  { name: 'updatedAt', label: 'Updated Date' },
  { name: 'publishAt', label: 'Publication Year' },
  { name: 'readableAt', label: 'Readable Date' }
]

export default function ChapterOrderByFilter() {
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
