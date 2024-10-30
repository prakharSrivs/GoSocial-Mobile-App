import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Navbar from '../components/Navbar'
import Feed from '../components/Feed'

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Navbar />
      <Feed navigation={navigation} />
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
    container:{
      backgroundColor:"#1B1A1D",
      width:"100%",
      height:"100%"
    }
})