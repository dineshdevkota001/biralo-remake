type IRoute = Readonly<string>
export const PING: IRoute = '/ping'
export const MANGA: IRoute = '/manga'
export const MANGA_FEED = (id: string): IRoute => `/manga/${id}/feed`
export const MANGA_TAGS = '/manga/tag'

export const STATISTICS = '/statistics'
export const MANGA_STATISTICS = `${STATISTICS}${MANGA}`
export const MANGA_ID_STATISTICS = (id: string): IRoute =>
  `${MANGA_STATISTICS}/${id}`

export const CHAPTER = '/chapter'

export const COVER: IRoute = '/cover'
export const COVER_ART = (id: string) => `/cover/${id}` as IRoute
export const COVERS = '/covers'
