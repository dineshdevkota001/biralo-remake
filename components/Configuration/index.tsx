import { View } from 'react-native'
import { Text } from 'react-native-paper'
import { useForm } from 'react-hook-form'
import useConfiguration from '@contexts/ConfigurationContext'
import { useEffect } from 'react'
import Themes from './Themes'
import ColorScheme from './ColorScheme'
import Tags from './Tags'

export default function Configuration() {
  const { config } = useConfiguration()

  const form = useForm({
    defaultValues: config
  })
  const { reset } = form

  useEffect(() => {
    reset(config)
  }, [reset, config])

  return (
    <View
      style={{
        display: 'flex',
        gap: 16,
        padding: 16
      }}
    >
      <Text variant="titleMedium">Color Mode</Text>
      <ColorScheme />
      <Text variant="titleMedium">Theme</Text>
      <Themes />
      <Text variant="titleMedium">Tags</Text>
      <Tags />
    </View>
  )
}
