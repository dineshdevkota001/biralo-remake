import { Tags } from '@components/Tag'
import { TagGroupEnum } from '@interfaces/enum'
import { Card } from 'react-native-paper'

export default function ThumbnailTags({
  attributes
}: Pick<IManga, 'attributes'>) {
  const { tags } = attributes
  return (
    <Card.Content
      style={{
        flex: 1
      }}
    >
      <Tags
        tags={tags}
        includeTags={[TagGroupEnum.THEME, TagGroupEnum.GENRE]}
      />
    </Card.Content>
  )
}
