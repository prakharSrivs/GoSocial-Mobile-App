import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
