import { TypeEnum } from '@interfaces/mangadex/enum'
import { useNavigation } from '@react-navigation/native'
import getRelationOfType from '@utils/getRelationshipOfType'

export default function useChapterThumbnail({ item }: { item: IChapter }) {
  const { id, relationships, attributes } = item ?? {}

  const navigation =
    useNavigation<IRootStackScreenProps<'Chapter List'>['navigation']>()

  const { scanlation_group: scanlationGroup, user } = relationships.reduce(
    (acc, curr) => {
      if (curr.type) acc[curr.type] = curr?.attributes
      return acc
    },
    Object.create(null)
  )

  const handleGallery = () =>
    navigation.navigate('Gallery', {
      chapterId: id,
      mangaId:
        (getRelationOfType(relationships, TypeEnum.MANGA) as IManga)?.id ?? ''
    })

  return { handleGallery, scanlationGroup, user, ...attributes }
}
