interface ICoverAttributes {
  volume?: string
  fileName?: string
  description?: string
  locale?: string
  version?: number
  createdAt?: string
  updatedAt?: string
}

interface ICover {
  id: string
  type: 'cover_art'
  attributes: ICoverAttributes
}
