import { Image, Share, Text, TouchableOpacity, View } from "react-native"
import { styles } from "./styles"
import { Description } from "./Description"
import Icon from 'react-native-vector-icons/Feather'
import Snackbar from 'react-native-snackbar'
import { useEffect, useState } from "react"

export const Post = ({ 
    postObj,
    index,
    postId,
    authorImgUri, 
    authorName, 
    description, 
    liked,
    location, 
    postImageUri, 
    likesCount,
    handlePostClick = ()=>{},
    handleLikeClick = ()=>{},
    inDetailedView
}) => {

    const [ isLiked, setIsLiked ] = useState(liked);

    const handleClick = () => {
        if( inDetailedView ) return;
        return;
        handlePostClick(index, postObj, postId, authorImgUri, authorName, location, postImageUri, likesCount, description)
    }

    const handleSharePress = async () => {
        try{
            await Share.share({ message: "Will be perform Linking later on" });
        }catch(e){
            Snackbar.show({
                text:e.message,
                duration: Snackbar.LENGTH_SHORT
            })
        }
    }

    const handleLikeIconClick = ()=>{
        setIsLiked(!liked)
        handleLikeClick(postObj, index)
    }

    useEffect(()=>{
        setIsLiked(liked)
    },[liked])

    return (
    <TouchableOpacity style={styles.postContainer} onPress={handleClick}>
        <View style={styles.postHeader}>
            <View style={styles.authorImageContainer} > 
                <Image style={styles.authorImage} source={{ uri: authorImgUri }} />
            </View>
            <View style={styles.authorInfo} >
                <Text style={styles.authorName} >{ authorName }</Text>
                <Text style={styles.locationSubText} >{ location }</Text>
            </View>
        </View>
        <View style={styles.postBody}>
            <Image style={styles.postImage} source={{ uri: postImageUri }} />
        </View>
        <View style={styles.postFooter}>
            <View style={styles.footerIconsContainer}>
                <Icon 
                    name="thumbs-up" 
                    color={ isLiked ? "#FF3E4D" : "#F0F0F0" } 
                    style={styles.likeIcon} 
                    size={25} 
                    onPress={handleLikeIconClick}
                />
                <Icon 
                    name="share-2" 
                    onPress={handleSharePress} 
                    style={styles.shareIcon} 
                    size={25} 
                />
            </View>
            {
                likesCount>1 &&
                <Text style={styles.likesText} >
                    <Text style={styles.likesHeaderText} >{likesCount}</Text> Likes
                </Text>
            }
            <Description authorName={authorName} description={description} inDetailedView={inDetailedView} />
        </View>
    </TouchableOpacity> 
    )
}