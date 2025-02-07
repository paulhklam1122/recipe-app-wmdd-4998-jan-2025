import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Header from './src/components/layout/Header'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { GluestackUIProvider } from '@gluestack-ui/themed'
import { config } from '@gluestack-ui/config'
import RecipesContainer from './src/components/containers/RecipesContainer'
import AppStack from './src/components/stacks/AppStack'

const App = () => {
  return (
    <SafeAreaProvider>
      <GluestackUIProvider config={config}>
          {/* <Header /> */}
          {/* <RecipesContainer /> */}
          <AppStack />
          <StatusBar style='light' />
      </GluestackUIProvider>
    </SafeAreaProvider>
  )
}

export default App
