import React,{useState, useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AppStack from "./AppStack";
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from "./AuthStack";
import auth from '@react-native-firebase/auth';
const Routes = () => {
    const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;
    return (
    <NavigationContainer>
        {user?<AppStack/>:<AuthStack/>}
    </NavigationContainer>
    )
}

export default Routes

const styles = StyleSheet.create({})
