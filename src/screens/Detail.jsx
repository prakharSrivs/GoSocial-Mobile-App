import { SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import Navbar from '../components/Navbar'
import { Post } from '../components/Feed/Post'

const Detail = ({ route }) => {

    const params = route.params;

  return (
    <SafeAreaView style={styles.container} >
        <Navbar />
        <Post 
            authorImgUri={params.authorImgUri}
            postImageUri={params.postImageUri}
            authorName={params.authorName}
            location={params.location}
            likesCount={params.likesCount}
            description={params.description}  
            liked={params.liked}
            handleLikeClick={params.handleLikeClick}
            postObj={params.postObj}
            inDetailedView={true}          
        />
    </SafeAreaView>
  )
}

export default Detail


const styles = StyleSheet.create({
  container:{
    backgroundColor:"#1B1A1D",
    width:"100%",
    height:"100%",
    gap:20
  }
})