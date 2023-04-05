import { COVERS, } from '@constants/api/routes'
import { IImageProps, Image } from 'native-base'
import { UPLOADS } from '@constants/api'
import { COVER_QUALITY } from '@constants/static/configuration'

interface ICoverImageProps extends IImageProps {
  id: string
  relationships: IManga['relationships'],
  quality?: 256 | 512
}

export default function CoverImage({
  id,
  relationships,
  alt = 'image',
  quality = COVER_QUALITY,
  ...props
}: ICoverImageProps) {
  const fileName = relationships.find(({ type }) => type === 'cover_art')
    .attributes.fileName
  const url = `${UPLOADS}${COVERS}/${id}/${fileName}.${quality}.jpg`

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
