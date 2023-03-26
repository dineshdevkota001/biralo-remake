type IRoute = Readonly<string>
export const PING: IRoute = '/ping'
export const MANGA: IRoute = '/manga'
export const MANGA_FEED = (id: string): IRoute => `/manga/${id}/feed`
export const COVER: IRoute = '/cover'
export const COVER_ART = (id: string) => `/cover/${id}` as IRoute
export const COVERS = '/covers'
