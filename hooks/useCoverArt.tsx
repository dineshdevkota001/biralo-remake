import { UPLOADS } from "@constants/api";
import { COVERS } from "@constants/api/routes";
import { COVER_QUALITY } from "@constants/static/configuration";

export default function useCoverArt(
  id: string,
  relationships: Array<any>,
  quality = COVER_QUALITY,
) {
  const fileName = relationships.find(({ type }) => type === "cover_art")
    .attributes.fileName;

  const url = `${UPLOADS}${COVERS}/${id}/${fileName}.${quality}.jpg`;

  return { url };
}
