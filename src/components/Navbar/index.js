import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'
import { styles } from './styles'

export const GoSocialLogo = () => {
    return (
        <View style={styles.logoStyles} >
            <Text style={[styles.logoText, styles.whiteText]}>Go</Text>
            <Text style={[styles.logoText]} >Social</Text>
        </View>
    )
}

export default function Navbar() {

    const navigation = useNavigation();
    
  return (
    <View style={styles.navcontainer} >
        <GoSocialLogo />
        <View style={styles.userButton}>
            <Icon name="user" size={25} style={styles.avatarLogoStyles} onPress={()=>navigation.navigate("UserProfile")} />
        </View>
    </View>
  )
}
