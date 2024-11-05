import { ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from './styles'
import { Post } from './Post';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbar from 'react-native-snackbar';
import { useNavigation } from '@react-navigation/native';

const Feed = () => {

    const [loading, setLoading] = useState(false);
    const [currUserId, setCurrUserId ] = useState(null);
    const [posts, setPosts] = useState([]); 
    const navigation = useNavigation();

    const fetchPosts = async () => {
        const data = await fetch("https://go-social-backend.vercel.app/posts/")
        const jsonData = await data.json();
        setPosts(jsonData.posts)
    } 

    const handleLikeClick = async (post, index) => {
        const authToken = await AsyncStorage.getItem("token")
        const fetchReqBody = {
            method: "POST",
            headers:{
                'authorization':authToken,
                'Content-Type':"application/json",
                'postid':posts[index].id
            },
            body:JSON.stringify({ postId:posts[index].id })  
        }
        try{
            const res = await fetch("https://go-social-backend.vercel.app/post/like",fetchReqBody)
            if ( res.ok ){
                if( post.likes.filter( like => like.userId == currUserId ).length==0 ) post.likes.push({ userId: currUserId })
                else post.likes = post.likes.filter( like => like.userId != currUserId )
                const newPosts = [...posts.slice(0,index), post, ...posts.slice(index+1)];
                setPosts(newPosts);
            } else if ( res.status == 403 ){
                Snackbar.show({ text:"Authorization Failed, Please Login Again", duration:Snackbar.LENGTH_SHORT });
                await AsyncStorage.clear()
                handleLogout()
            } else {
                Snackbar.show({ text:"Error while liking the post", length:Snackbar.LENGTH_SHORT })
            }         
        }catch(e){
            console.log(e);
        }
    }

    const handlePostClick = (index, postObj, postId, authorImgUri, authorName, location, postImageUri, likesCount, description ) => {
        navigation.navigate("Detail",
            { 
                postId, 
                authorImgUri, 
                authorName, 
                location, 
                postImageUri, 
                likesCount, 
                description, 
                liked: postObj.likes.filter( like => like.userId == currUserId ).length ? true : false,
                handleLikeClick,
                index
            }
        )
    }

    const initializeCurrUserId = async () => {
        const id = await AsyncStorage.getItem("id")
        if( id == undefined ) handleLogout()
        setCurrUserId(id);
    }

    const handleLogout = ()=>{
        navigation.reset({ index:0, routes:[{ name: 'Profile' }] })
    }

    useEffect(()=>{
        fetchPosts()
        initializeCurrUserId()
    },[])

  return (
    <ScrollView contentContainerStyle={styles.feedContainer}> 
        {
            posts.map((post, index) => (
                <Post  
                    postObj={post}
                    index={index}
                    key={post.id}   
                    postId={post.id}
                    authorImgUri={post.authorImageURL}
                    authorName={post.authorName}
                    location={post.location}
                    postImageUri={post.imageURL}
                    likesCount={post.likes.length || 0}
                    description={post.description}
                    handlePostClick={handlePostClick}
                    handleLikeClick={handleLikeClick}
                    inDetailedView={false}
                    liked={ post.likes.filter( like => like.userId == currUserId ).length ? true : false }
                />
            ))
        }   
    </ScrollView>
  )
}

export default Feed
