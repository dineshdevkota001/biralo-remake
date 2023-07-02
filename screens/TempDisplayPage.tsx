import useTheme from '@styles/appStyle'
import { capitalize } from 'lodash'
import { ScrollView, StyleSheet } from 'react-native'
import { Button, Card, Surface, Text, Chip } from 'react-native-paper'

const styles = StyleSheet.create({
  container: {
    gap: 8,
    display: 'flex',
    paddingBottom: 8
  },
  surface: {
    height: 100
  },
  fab: {
    position: 'absolute',
    bottom: 0
  }
})

const textStyles = ['display', 'headline', 'title', 'body', 'label']
const sizes = ['large', 'medium', 'small']

export default function TempDisplay() {
  const { colors } = useTheme()

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        {
          backgroundColor: colors.success
        }
      ]}
    >
      <Card>
        <Card.Cover
          source={{
            uri: 'https://picsum.photos/200'
          }}
        />
        <Card.Title title="Card Title" subtitle="Subtitle? no style applied " />
        <Card.Content>
          <Text>It works in content</Text>
        </Card.Content>
        <Card.Actions>
          <Button>Yay</Button>
        </Card.Actions>
      </Card>
      <Surface style={styles.surface}>{}</Surface>
      {/* <FAB label="Hello" icon="plus" style={styles.fab} /> */}
      {textStyles.map(position => (
        <Surface mode="flat" key={position}>
          {sizes.map(size => (
            <Text variant={`${position}${capitalize(size)}`} key={`${size}`}>
              {position}
              {size}
            </Text>
          ))}
        </Surface>
      ))}
      <Text
        style={{
          marginBottom: 12,
          color: colors.onSuccessContainer
        }}
      >
        Label:
      </Text>
      <Chip mode="outlined">Well</Chip>
    </ScrollView>
  )
}
