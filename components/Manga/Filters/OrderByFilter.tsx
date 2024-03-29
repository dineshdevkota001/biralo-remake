import ControlledOrderItem from '@components/Common/Input/Controlled/OrderItem'
import { useFormContext } from 'react-hook-form'

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

export default function MangaOrderByFilter() {
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
