import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {NavigationContainer} from '@react-navigation/native';
import Home from './src/screens/Home';
import Settings from './src/screens/Settings';
import { createStackNavigator } from '@react-navigation/stack';
import Providers from "./src/navigation";
import Toast from 'react-native-toast-message';

const Stack = createStackNavigator();
const App = () => {
  return (
      <>
    <Providers/>
    <Toast ref={ref => Toast.setRef(ref)} />
    </>
  );
};
export default App;

const styles = StyleSheet.create({});
