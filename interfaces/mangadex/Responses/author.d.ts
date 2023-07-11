interface IAuthorAttributes {
  //   display
  name?: string
  imageUrl?: string
  biography?: ILocalizedString
  //   connections
  twitter?: string | null
  pixiv?: string | null
  melonBook?: string | null
  fanBox?: string | null
  booth?: string | null
  nicoVideo?: string | null
  skeb?: string | null
  fantia?: string | null
  tumblr?: string | null
  youtube?: string | null
  weibo?: string | null
  naver?: string | null
  website?: string | null
  //   housekeeping
  version?: number
  // date
  createdAt?: string
  updatedAt?: string
}
