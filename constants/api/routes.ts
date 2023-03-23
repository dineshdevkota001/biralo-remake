type IRoute = Readonly<string>
export const PING: IRoute = '/ping'
export const MANGA: IRoute = '/manga'
export const COVER: IRoute = '/cover'
export const COVER_ART = (id: string) => `/cover/${id}` as IRoute
export const COVERS = '/covers'
