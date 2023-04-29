import { View } from 'react-native'

interface IDuplicateProps {
  Component: React.FC
  times?: number
}
export default function Duplicate({
  Component,
  times = 6,
  row
}: IDuplicateProps & { row?: boolean }) {
  return (
    <View
      style={[
        {
          display: 'flex',
          alignItems: 'stretch',
          width: '100%'
        },
        row ? { flexDirection: 'row' } : {}
      ]}
    >
      {Array.from({ length: times }).map((_, index) => (
        <Component key={`skeleton-${index.toString()}`} />
      ))}
    </View>
  )
}
