import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    feedContainer:{
        paddingHorizontal:15,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        gap:30,
        paddingTop:20,
        paddingBottom:30
    },
    feedHeaderText:{
        fontFamily:"Raleway-SemiBold",
        fontSize:35,
        marginVertical:20,
        color:"#CDCDCD"
    },
    postContainer:{
        backgroundColor:"#303234",
        width:"100%",
        borderRadius:10
    },
    postHeader:{
        padding:10,
        borderRadius:5,
        display:"flex",
        justifyContent:"flex-start",
        alignItems:"center",
        flexDirection:"row",
        gap:10
    },
    postBody:{

    },
    postFooter:{
        padding:10
    },
    authorImage:{
        height:35,
        width:35,
        borderRadius:50,
        borderColor:"#3F8BFB",
        borderWidth:1.5,
    },
    authorImageContainer:{

    },
    authorName:{
        fontFamily:"Raleway-SemiBold",
        color:"white",
        fontSize:14
    },
    authorInfo:{
        display:"flex",
        justifyContent:"center",
        alignItems:"flex-start"
    },
    locationSubText:{
        color:"#CDCDCD",
        fontSize:12
    },
    postImage:{
        width:"100%",
        height:300
    },
    footerIconsContainer:{
        display:"flex",
        justifyContent:'flex-start',
        alignItems:"center",
        flexDirection:"row",
        gap:15,
        
    },
    likeIcon:{
    },
    shareIcon:{
        color:"#F0F0F0"
    },
    likesText:{
        color:"#F0F0F0",
        paddingTop:10,
        paddingHorizontal:3,
        fontFamily:"Raleway-Regular"
    },
    likesHeaderText:{
        fontFamily:"OpenSans-Bold",
        color:"white"
    },
    descriptionHeader:{
        fontFamily:"OpenSans-SemiBold",
        color:"#DAE0E2",
        fontSize:14,
        paddingRight:10
    },
    descriptionText:{
        fontFamily:"OpenSans-light",
        color:"#7B8788",
        paddingVertical:10
    }
})