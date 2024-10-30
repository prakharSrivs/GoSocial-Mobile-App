import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Login from '../components/Login';
import SignUp from '../components/SignUp';



export default function Profile() {

    const [ showLogin, setShowLogin ] = useState(true);

  return (
    <SafeAreaView style={styles.container} >
    { showLogin ? <Login setShowLogin={setShowLogin} /> : <SignUp setShowLogin={setShowLogin} /> }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#1B1A1D",
        width:"100%",
        height:"100%"
    }
})