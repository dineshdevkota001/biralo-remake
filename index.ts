import { enableExperimentalWebImplementation } from 'react-native-gesture-handler'
import { registerRootComponent } from 'expo'
import Root from './Root'

enableExperimentalWebImplementation(true)

registerRootComponent(Root)
