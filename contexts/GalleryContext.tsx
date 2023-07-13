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
type IGalleryDispatch = {
  setIsHorizontal: Dispatch<SetStateAction<boolean>>
  setResizeMode: Dispatch<SetStateAction<RESIZE_MODE>>
}

export const GalleryValuesContext = createContext<IGalleryValues>({
  isHorizontal: true,
  resizeMode: RESIZE_MODE.FIT_BOTH
})

export const GalleryDispatchContext = createContext<IGalleryDispatch>({
  setIsHorizontal: () => undefined,
  setResizeMode: () => undefined
})

export default function useGallery() {
  return useContext(GalleryValuesContext)
}
export function useGalleryDispatch() {
  return useContext(GalleryDispatchContext)
}

export function GalleryContextProvider({ children }: IHaveChildren) {
  const [isHorizontal, setIsHorizontal] = useState(true)
  const [resizeMode, setResizeMode] = useState<RESIZE_MODE>(
    RESIZE_MODE.FIT_BOTH
  )

  return (
    <GalleryDispatchContext.Provider
      value={useMemo(() => ({ setIsHorizontal, setResizeMode }), [])}
    >
      <GalleryValuesContext.Provider
        value={useMemo(
          () => ({
            isHorizontal,
            resizeMode
          }),
          [isHorizontal, resizeMode]
        )}
      >
        {children}
      </GalleryValuesContext.Provider>
    </GalleryDispatchContext.Provider>
  )
}
