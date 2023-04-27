import React from 'react'
import { View, Text } from 'react-native'

const EmptyList = () => {
  return (
    <View style={{flex: 1, justifyContent:"center", alignItems:"center"}}>
        <Text>You don't have a task yet.</Text>
        <Text>You can add one by clicking the "+" button</Text>
    </View>
  )
}

export default EmptyList