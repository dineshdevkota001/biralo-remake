import { enableExperimentalWebImplementation } from 'react-native-gesture-handler'
import { registerRootComponent } from 'expo'
import App from './App'

enableExperimentalWebImplementation(true)

registerRootComponent(App)
