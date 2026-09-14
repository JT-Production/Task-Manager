import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const AppSafeAreaView = ({children, style, fullTop}: {children: React.ReactNode, style?: any, fullTop?:string}) => {
  return (
    <SafeAreaView style={{flex: 1}} edges={['top']}>
      <View style={[styles.container, style]}> {children}</View>
    </SafeAreaView>
  )
}

export default AppSafeAreaView

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})