import { ScrollView, View } from 'react-native'
import { Avatar, Text } from 'react-native-paper'
import LoginButton from './LoginButton'

export default function Profile() {
  return (
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
        <View>
          <Text>Not logged in</Text>
          <LoginButton />
        </View>
      </View>
    </ScrollView>
  )
}
