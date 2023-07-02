import {
  BOTTOM_TABS,
  CHAPTERS,
  FEED,
  GALLERY,
  LATEST,
  PROFILE,
  SEARCH
} from '@constants/static/screens'
import { QualityEnum } from '@interfaces/enum'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

declare global {
  type IRootStackParams = {
    [BOTTOM_TABS]: undefined
    [GALLERY]: { chapterId: string; quality?: QualityEnum; mangaId: string }
    [CHAPTERS]: {
      id: string
      manga: IManga
    }
    [PROFILE]: undefined
  }
  type IRootBottomTabsParams = {
    [SEARCH]: undefined
    [LATEST]: undefined
    [FEED]: undefined
  }
  type IRootStackScreenProps<Screen extends keyof IRootStackParams> =
    NativeStackScreenProps<IRootStackParams, Screen>

  type IRootBottomTabsScreenProps<Screen extends keyof IRootBottomTabsParams> =
    CompositeScreenProps<
      BottomTabScreenProps<IRootBottomTabsParams, Screen>,
      NativeStackScreenProps<IRootStackParams>
    >
  namespace ReactNavigation {
    type RootParamList = IRootStackParams
  }
}
