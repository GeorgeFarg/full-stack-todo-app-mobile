import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
type header = {
    h1: string,
    h2: string
}
const Header = ({h1, h2}: header) => {
  return (
    <View style={styles.header}>
        <Image source={require("../../assets/logo.png")} style={styles.logo} />
        <Text style={styles.h1}>{h1}</Text>
        <Text style={styles.h2}>{h2}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    header: {
        flex:1,
        backgroundColor: "white",
        alignItems:"center",
        justifyContent:"flex-end",
        width: 360,
    },
    logo: {
        width:100,
        height:100
    },
    h1: {
        fontSize: 30,
        fontWeight: "300",
        color:"#595959"
    },
    h2: {
        fontSize: 16,
        fontWeight:"300",
        color:"#595959"
    },
})

export default Header