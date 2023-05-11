import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import { useForm } from 'react-hook-form'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import defaultConfig from '@constants/static/configuration'

export const ConfigurationContext = createContext<IConfigurationContext>({
  config: defaultConfig,
  setConfig: () => undefined
})

export default function useConfiguration() {
  return useContext(ConfigurationContext)
}

const configKey = '@CONFIGURATIONS'

export function ConfigurationProvider({
  children
}: IHaveChildren & Parameters<typeof useForm>[0]) {
  const [configuration, setConfiguration] = useState<
    Partial<IConfigContext> | undefined
  >()
  const { getItem, setItem } = useAsyncStorage(configKey)

  const refreshConfig = useCallback(async () => {
    const config = await getItem()
    setConfiguration(config ? JSON.parse(config) : {})
  }, [getItem])

  useEffect(() => {
    if (!configuration) refreshConfig()
  }, [refreshConfig, configuration])

  const setConfig = useCallback(
    (change: Partial<IConfigContext>) => {
      setConfiguration(c => {
        const changedConfig = { ...(c ?? {}), ...change }
        setItem(JSON.stringify(changedConfig))
        return changedConfig
      })
    },
    [setItem]
  )

  return (
    <ConfigurationContext.Provider
      value={useMemo(
        () => ({
          config: {
            ...defaultConfig,
            ...configuration
          },
          setConfig
        }),
        [configuration, setConfig]
      )}
    >
      {children}
    </ConfigurationContext.Provider>
  )
}
