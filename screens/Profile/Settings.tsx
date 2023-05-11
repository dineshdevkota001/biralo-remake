import { ScrollView, View } from 'react-native'
import { Avatar, Text } from 'react-native-paper'
import Configuration from '@components/Configuration'
import { SafeAreaView } from 'react-native-safe-area-context'
import LoginButton from './LoginButton'

export default function Profile() {
  return (
    <SafeAreaView edges={['top']} style={{ flex: 1 }}>
      <ScrollView style={{ gap: 16 }}>
        <View
          style={{
            padding: 16,
            display: 'flex',
            flexDirection: 'row',
            gap: 16
          }}
        >
          <Avatar.Image
            source={{
              uri: 'https://picsum.photos/200'
            }}
          />
          <View
            style={{
              gap: 4
            }}
          >
            <Text variant="labelLarge">Not logged in</Text>
            <LoginButton />
          </View>
        </View>
        <Configuration />
      </ScrollView>
    </SafeAreaView>
  )
}
