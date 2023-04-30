import { QualityEnum } from '@interfaces/enum'
import { CoverQualityEnum, LocalizationLanguageEnum } from '@interfaces/enum'
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react'
import { useForm } from 'react-hook-form'

interface IConfigContext {
  quality: QualityEnum
  language: LocalizationLanguageEnum
  coverQuality: CoverQualityEnum
  pageSize: number
}

interface IConfigurationContext {
  config: IConfigContext
  setConfig: (
    key: string,
    value: number | string | boolean | Record<string, number | string | boolean>
  ) => void
}

export const ConfigurationContext = createContext<IConfigurationContext>({
  config: {
    quality: QualityEnum.DATA_SAVER,
    language: LocalizationLanguageEnum.EN,
    coverQuality: CoverQualityEnum.LOW,
    pageSize: 10
  },
  setConfig: () => undefined
})

export default function useConfiguration() {
  return useContext(ConfigurationContext)
}

export function ConfigurationProvider({
  children
}: IHaveChildren & Parameters<typeof useForm>[0]) {
  const [configuration, setConfiguration] = useState(
    JSON.stringify({
      config: QualityEnum.DATA_SAVER
    })
  )
  const setConfig = useCallback(
    (
      key: string,
      value:
        | number
        | string
        | boolean
        | Record<string, number | string | boolean>
    ) => {
      setConfiguration(config =>
        JSON.stringify({
          ...JSON.parse(config),
          key: value
        })
      )
    },
    []
  )

  const config = JSON.parse(configuration)

  return (
    <ConfigurationContext.Provider
      value={useMemo(
        () => ({
          config: {
            quality: (config?.quality as QualityEnum) ?? QualityEnum.DATA_SAVER,
            language: LocalizationLanguageEnum.EN,
            coverQuality: CoverQualityEnum.LOW,
            pageSize: 10
          },
          setConfig
        }),
        [config, setConfig]
      )}
    >
      {children}
    </ConfigurationContext.Provider>
  )
}
