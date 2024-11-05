import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Input, Button } from '@rneui/themed'
import Snackbar from 'react-native-snackbar'
import * as Yup from 'yup'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { styles } from './styles'

const SignUp = ({ setShowLogin }) => {

  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ username, setUsername ] = useState("");
  const [ loading, setLoading ] = useState(false);
  const navigation = useNavigation();
  const defaultImgUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF0QxSZCjz-8JefhrJrJwtL5i7utqDsRhv7Q&s";

  const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    password: Yup.string()
        .min(6," Password must be atleast 6 characters")
        .required("Password is required"),
    username: Yup.string()
        .required("Username is required")
  });

  const checkValidation = async () => {
    try{
      await validationSchema.validate({ email, password, username })
      return true;
    }catch(e){
      Snackbar.show({ text:e.message, duration:Snackbar.LENGTH_SHORT })
      return false;
    }
  }

  const makeApiRequestForSignUp = async (email,username,password,imageURL)=>{
    const url="https://go-social-backend.vercel.app/users/signup"
    const response = await fetch(url, {
        method:"POST",
        headers:{
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({ username, email, password, imageURL }),
    });
    return await response.json();
}

  const handleRegisterRequest = async () => {
    setLoading(true);
    const isValid = await checkValidation();
    if( isValid ){
      try{
        const response = await makeApiRequestForSignUp( email, username, password, defaultImgUrl );
        if( response.message === 'User Already Exists ') throw new Error(response.message)
        await AsyncStorage.setItem("token",response.token);
        await AsyncStorage.setItem("id",response.userId)
        await AsyncStorage.setItem("username",response.username)
        await AsyncStorage.setItem("userImage",response.imageURL)
        navigation.replace("Home")
      }catch(e){
        console.log(e)
        Snackbar.show({ text: e.message, duration: Snackbar.LENGTH_SHORT })
      }
    }
    setLoading(false)
  }

  return (
    <View style={styles.loginContainer}>
      <View style={styles.logoStyles} >
          <Text style={[styles.logoText, styles.whiteText]}>Go</Text>
          <Text style={[styles.logoText]} >Social</Text>
      </View>
      <Text style={styles.headerText} > Sign Up </Text>
      <Text style={styles.subHeaderText} > to Continue to GoSocial </Text>
      <Input 
          style={styles.inputStyles} 
          containerStyle={styles.inputContainerStyles} 
          placeholder='Email *' 
          value={email}
          onChangeText={(value)=>setEmail(value)}    
      />
      <Input 
          style={styles.inputStyles} 
          containerStyle={styles.inputContainerStyles} 
          placeholder='Username *' 
          value={username}
          onChangeText={(value)=>setUsername(value)}    
      />
      <Input 
          style={styles.inputStyles} 
          containerStyle={styles.inputContainerStyles} 
          placeholder='Password *' 
          value={password}
          onChangeText={(value) => setPassword(value)}
          textContentType='password'  
      />
      <Button 
          title={"Sign Up"} 
          titleStyle={styles.submitButtonStyles} 
          containerStyle={{marginTop:20}}  
          onPress={handleRegisterRequest}  
          disabled={loading} 
      />
      <Text 
          style={styles.subHeaderButton} 
          onPress={()=>setShowLogin(true)} 
      >
          Already a User? Login
      </Text>
    </View>
  )
}

export default SignUp