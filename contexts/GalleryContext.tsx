import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState
} from 'react'

export enum RESIZE_MODE {
  FULL_HEIGHT = 'height',
  FULL_WIDTH = 'width',
  FIT_BOTH = 'contain',
  COVER = 'cover'
}

type IGalleryValues = { isHorizontal: boolean; resizeMode: RESIZE_MODE }
type IGalleryFunction = {
  setIsHorizontal: Dispatch<SetStateAction<boolean>>
  setResizeMode: Dispatch<SetStateAction<RESIZE_MODE>>
}

type IGalleryContext = [IGalleryValues, IGalleryFunction]

export const GalleryContext = createContext<IGalleryContext>([
  { isHorizontal: true, resizeMode: RESIZE_MODE.FIT_BOTH },
  {
    setIsHorizontal: () => undefined,
    setResizeMode: () => undefined
  }
])

export default function useGallery() {
  return useContext(GalleryContext)
}

export function GalleryContextProvider({ children }: IHaveChildren) {
  const [isHorizontal, setIsHorizontal] = useState(true)
  const [resizeMode, setResizeMode] = useState<RESIZE_MODE>(
    RESIZE_MODE.FIT_BOTH
  )

  return (
    <GalleryContext.Provider
      value={useMemo(
        () => [
          { isHorizontal, resizeMode },
          { setIsHorizontal, setResizeMode }
        ],
        [isHorizontal, resizeMode]
      )}
    >
      {children}
    </GalleryContext.Provider>
  )
}
