import { QualityEnum } from '@interfaces/enum'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

declare global {
  type IRootStackParams = {
    'Bottom Tabs': undefined
    Gallery: { chapterId: string; quality?: QualityEnum }
    'Chapter List': {
      id: string
      manga: IManga
    }
  }
  type IRootBottomTabsParams = {
    Home: undefined
    Profile: undefined
  }
  type IRootStackScreenProps<Screen extends keyof IRootStackParams> =
    NativeStackScreenProps<IRootStackParams, Screen>
  type IRootBottomTabsScreenProps<Screen extends keyof IRootBottomTabsParams> =
    CompositeScreenProps<
      BottomTabScreenProps<IRootBottomTabsParams, Screen>,
      NativeStackScreenProps<IRootStackParams>
    >
  namespace ReactNavigation {
    interface RootParamList extends IRootStackParams {}
  }
}
