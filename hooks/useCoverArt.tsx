import { UPLOADS } from '@constants/api'
import { COVERS } from '@constants/api/routes'
import { useMangadexConfig } from '@contexts/ConfigurationContext'
import { CoverQualityEnum, TypeEnum } from '@interfaces/mangadex/enum'
import getRelationOfType from '@utils/getRelationshipOfType'

export default function useCoverArt(
  id: string,
  relationships: IMangaRelationships,
  quality?: CoverQualityEnum
) {
  const fileName = relationships
    ? getRelationOfType<ICoverArtRelated>(relationships, TypeEnum.COVER_ART)
        ?.attributes?.fileName
    : null

  const { coverQuality } = useMangadexConfig()

  const url = `${UPLOADS}${COVERS}/${id}/${fileName}.${
    quality ?? coverQuality
  }.jpg`

  return { url }
}
