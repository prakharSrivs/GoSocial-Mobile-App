import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Button, Input } from '@rneui/themed'
import * as Yup from 'yup'
import Snackbar from 'react-native-snackbar';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native';



export default function Login({ setShowLogin }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [ loading, setLoading ] = useState(false);
    const navigation = useNavigation();

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        password: Yup.string()
            .required("Password is required"),
    });

    const checkValidation = async () => {
        try{
            await validationSchema.validate({ email, password });
            return true;
        }catch(e){
            Snackbar.show({ text: e.message, duration: Snackbar.LENGTH_SHORT })
            return false;
        }
    }

    const makeApiRequestForLogin =async (email,password)=>{
        const url="https://go-social-backend.vercel.app/users/login"
        const response = await axios.post(url,{ email, password })
        return response;
    }

    const handleLoginRequest = async () => {
        setLoading(true);
        const areInputsValid = await checkValidation();
        if(areInputsValid){
            try{
                const response = await makeApiRequestForLogin(email, password);
                const data = response.data;
                await AsyncStorage.setItem("token",data.token)
                await AsyncStorage.setItem("userImage",data.imageURL)
                await AsyncStorage.setItem("id",data.uid)
                await AsyncStorage.setItem("username",data.username)
                navigation.replace("Home");
            }catch(e){
                console.log(e);
                if( e.status == 500 ) Snackbar.show({ text: "Internal Server Error", duration: Snackbar.LENGTH_SHORT });
                else Snackbar.show({ text: "Invalid Credentials", duration: Snackbar.LENGTH_SHORT })
            }
        }

        setLoading(false);
    }



  return (
    <View style={styles.loginContainer}>
        <View style={styles.logoStyles} >
            <Text style={[styles.logoText, styles.whiteText]}>Go</Text>
            <Text style={[styles.logoText]} >Social</Text>
        </View>
        <Text style={styles.headerText} > Log In </Text>
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
            placeholder='Password *' 
            value={password}
            onChangeText={(value) => setPassword(value)}
            textContentType='password'  
        />
        <Button 
            title={"Log In"} 
            titleStyle={styles.submitButtonStyles} 
            containerStyle={{marginTop:20}}  
            onPress={handleLoginRequest}  
            disabled={loading} 
        />
        <Text 
            style={styles.subHeaderButton} 
            onPress={()=>setShowLogin(false)} 
        >
            Create an account
        </Text>
    </View>
  )
}

const styles = StyleSheet.create({
    logoText:{
        fontFamily:"Raleway-Bold",
        color:"#F0F0F0",
        fontSize:34,
        color:"#14B3FF"
    },
    whiteText:{
        color:"#F0F0F0"
    },
    logoStyles:{
        display:"flex",
        justifyContent:'center',
        alignItems:"center",
        flexDirection:"row",
        gap:2,
        marginTop:150
    },
    loginContainer:{
        display:"flex",
        justifyContent:"flex-start",
        alignItems:"center",
        height:"100%"
    },
    headerText:{
        fontFamily:"OpenSans-SemiBold",
        fontSize:28,
        color:"white",
        paddingTop:40,
        textAlign:"center"
    },
    subHeaderText:{
        fontFamily:"OpenSans-Light",
        fontSize:20,
        color:"#CDCDCD",
        paddingTop:20,
        textAlign:"center",
        marginBottom:50
    },
    inputStyles:{
        borderWidth:1,
        borderColor:"#99AAAB",
        borderRadius:4,
        paddingHorizontal:10,
        maxWidth:300,
        color:"white",
        height:60
    },
    inputContainerStyles:{
        maxWidth:300,
        marginTop:0,
        borderWidth:0
    },
    submitButtonStyles:{
        paddingVertical:4,
        paddingHorizontal:20,
        fontSize:18,
        fontFamily:"OpenSans-Regular"
    },
    subHeaderButton:{
        fontSize: 14,
        fontFamily:"Raleway-Bold",
        color:"white",
        marginTop:30,
        color:"#14B3FF"
    }
})