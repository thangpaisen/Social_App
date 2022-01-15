import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AppStack from './AppStack';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './AuthStack';
import auth from '@react-native-firebase/auth';
import {LogBox} from 'react-native';
import UserIsBlocked from './../screens/UserIsBlocked/UserIsBlocked';
import firestore from '@react-native-firebase/firestore';
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);
const Routes = () => {
    // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [isBlocked, setIsBlocked] = useState(false);
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      setUser(user);
      firestore()
          .collection('users')
          .doc(user?.uid)
          .onSnapshot(doc => {
            setIsBlocked(doc?.data()?.isBlocked);
          });
     if (initializing) setInitializing(false)
    });
    return subscriber; // unsubscribe on unmount
  }, []);
    if (initializing) {
        return null
    }
  return (
    <NavigationContainer>
      {user?(isBlocked?<UserIsBlocked />:<AppStack />):<AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;

const styles = StyleSheet.create({});
