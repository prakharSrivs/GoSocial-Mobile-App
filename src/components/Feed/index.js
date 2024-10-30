import { ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from './styles'
import { Post } from './Post';

const Feed = ({ navigation }) => {

    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]); 

    const fetchPosts = async () => {
        const data = await fetch("https://go-social-backend.vercel.app/posts/")
        const jsonData = await data.json();
        setPosts(jsonData.posts)
    } 

    const handlePostClick = (postId, authorImgUri, authorName, location, postImageUri, likesCount, description ) => {
        navigation.navigate("Detail",{ postId, authorImgUri, authorName, location, postImageUri, likesCount, description })
    }

    useEffect(()=>{
        fetchPosts()
    },[])

  return (
    <ScrollView contentContainerStyle={styles.feedContainer}> 
        {
            posts.map((post) => (
                <Post  
                    key={post.id}  
                    postId={post.id}
                    authorImgUri={post.authorImageURL}
                    authorName={post.authorName}
                    location={post.location}
                    postImageUri={post.imageURL}
                    likesCount={post.likes.length || 0}
                    description={post.description}
                    handlePostClick={handlePostClick}
                    inDetailedView={false}
                />
            ))
        }   
    </ScrollView>
  )
}

export default Feed
