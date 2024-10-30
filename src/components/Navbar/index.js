import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'

const styles = StyleSheet.create({
    logoStyles:{
        display:"flex",
        justifyContent:'center',
        alignItems:"center",
        flexDirection:"row",
        gap:2,
    },
    navcontainer:{
        display:"flex",
        justifyContent:'space-between',
        alignItems:"center",
        flexDirection:"row",
        paddingVertical:10,
        paddingHorizontal:15
    },
    logoText:{
        fontFamily:"Raleway-Bold",
        color:"#F0F0F0",
        fontSize:27,
        color:"#14B3FF"
    },
    whiteText:{
        color:"#F0F0F0"
    },
    userButton:{
        display:'flex',
        justifyContent:'center',
        alignItems:"center",
        color:"white",
    },
    avatarLogoStyles:{
        color:"white"
    }
})

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
