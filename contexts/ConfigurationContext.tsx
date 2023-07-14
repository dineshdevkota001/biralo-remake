import { createContext, useContext, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import {
  defaultAppConfig,
  defaultMangadexConfig
} from '@constants/static/configuration'
import { useImmer } from 'use-immer'
import { Draft } from 'immer'

type IDispatch<T> = <U extends keyof Draft<T>>(
  arg0: U,
  arg1: NonNullable<Draft<T>>[U]
) => void

export const AppConfigurationValueContext =
  createContext<IAppConfig>(defaultAppConfig)
export const AppConfigurationDispatchContext = createContext<
  IDispatch<IAppConfig>
>(() => undefined)

export const MangadexConfigurationValueContext = createContext<IMangadexConfig>(
  defaultMangadexConfig
)
export const MangadexConfigurationDispatchContext = createContext<
  IDispatch<IMangadexConfig>
>(() => undefined)

export const useAppConfig = () => useContext(AppConfigurationValueContext)
export const useAppConfigDispatch = () =>
  useContext(AppConfigurationDispatchContext)
export const useMangadexConfig = () =>
  useContext(MangadexConfigurationValueContext)
export const useMangadexConfigDispatch = () =>
  useContext(MangadexConfigurationDispatchContext)

function useAsyncConfiguration<T>(key: string): [T | undefined, IDispatch<T>] {
  const [configuration, setConfiguration] = useImmer<T | undefined>(undefined)

  const { getItem, setItem } = useAsyncStorage(key)

  useEffect(() => {
    const createConfig = async () => {
      const config = await getItem()
      setConfiguration(config ? JSON.parse(config) : {})
    }
    if (!configuration) createConfig()
  }, [setConfiguration, configuration, getItem])

  useEffect(() => {
    if (configuration) setItem(JSON.stringify(configuration))
  }, [configuration, setItem])

  const setConfig: IDispatch<T> = (k, value) => {
    setConfiguration(d => {
      if (!d) return { [k]: value }
      // eslint-disable-next-line no-param-reassign
      d[k] = value
      return d
    })
  }

  return [configuration, setConfig]
}

export function AppConfigurationProvider({
  children
}: IHaveChildren & Parameters<typeof useForm>[0]) {
  const [configuration, setConfiguration] = useAsyncConfiguration<IAppConfig>(
    '@APP_CONFIGURATIONS'
  )

  return (
    <AppConfigurationDispatchContext.Provider value={setConfiguration}>
      <AppConfigurationValueContext.Provider
        value={useMemo(
          () => ({
            ...defaultAppConfig,
            ...configuration
          }),
          [configuration]
        )}
      >
        {children}
      </AppConfigurationValueContext.Provider>
    </AppConfigurationDispatchContext.Provider>
  )
}

export function MangadexConfigurationProvider({
  children
}: IHaveChildren & Parameters<typeof useForm>[0]) {
  const [configuration, setConfiguration] = useAsyncConfiguration<
    IMangadexConfig | undefined
  >('@MANGADEX_CONFIGURATIONS')

  return (
    <MangadexConfigurationDispatchContext.Provider value={setConfiguration}>
      <MangadexConfigurationValueContext.Provider
        value={useMemo(
          () => ({
            ...defaultMangadexConfig,
            ...configuration
          }),
          [configuration]
        )}
      >
        {children}
      </MangadexConfigurationValueContext.Provider>
    </MangadexConfigurationDispatchContext.Provider>
  )
}
