import { COVERS, COVER_ART } from '@constants/api/routes'
import { IImageProps, Image } from 'native-base'
import { UPLOADS } from '@constants/api'
import { COVER_QUALITY } from '@constants/static/configuration'

interface ICoverImageProps extends IImageProps {
  id: string
  relationships: IManga['relationships']
}

export default function CoverImage({
  id,
  relationships,
  alt = 'image',
  ...props
}: ICoverImageProps) {
  const fileName = relationships.find(({ type }) => type === 'cover_art')
    .attributes.fileName
  const url = `${UPLOADS}${COVERS}/${id}/${fileName}.${COVER_QUALITY}.jpg`

  return (
    <Image
      source={{
        uri: url
      }}
      alt={alt}
      {...props}
    />
  )
}
