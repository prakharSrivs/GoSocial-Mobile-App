import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack' 
import Home from './screens/Home';
import Detail from './screens/Detail';
import Profile from './screens/Profile';
import UserProfile from './screens/UserProfile';

export type RootStackParamList = {
  Home: undefined,
  Detail:{
    postId: string,
    authorImgUri: string, 
    authorName: string, 
    location: string, 
    postImageUri: string, 
    likesCount: number, 
    description: string
  },
  Profile: undefined,
  UserProfile: undefined
} 

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown:false }} initialRouteName='Profile' >
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Detail' component={Detail} />
        <Stack.Screen name='Profile' component={Profile} />
        <Stack.Screen name='UserProfile' component={UserProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App