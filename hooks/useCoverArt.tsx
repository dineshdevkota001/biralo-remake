import { UPLOADS } from '@constants/api'
import { COVERS } from '@constants/api/routes'
import useConfiguration from '@contexts/ConfigurationContext'
import { CoverQualityEnum, TypeEnum } from '@interfaces/mangadex'
import getRelationOfType from '@utils/getRelationshipOfType'

export default function useCoverArt(
  id: string,
  relationships: IMangaRelationships,
  quality?: CoverQualityEnum
) {
  const fileName = getRelationOfType(relationships, TypeEnum.COVER_ART)
  const { config } = useConfiguration()

  const url = `${UPLOADS}${COVERS}/${id}/${fileName}.${
    quality ?? config.coverQuality
  }.jpg`

  return { url }
}
