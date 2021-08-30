import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {TransitionPresets} from '@react-navigation/stack';
import Home from './../screens/Home';
import Settings from './../screens/Settings';
import UploadPost from "./../screens/Home/UploadPost/UploadPost";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#09bff2"
      inactiveColor="gray"
      barStyle={{backgroundColor: 'white'}}
      // labeled={false}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Trang Chủ',
          tabBarIcon: ({color}) => (
            <Icon name="planet" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: 'Cá nhân',
          tabBarIcon: ({color}) => (
            <Icon name="person" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
const Stack = createStackNavigator();
const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="MyTabs"
      screenOptions={{
        headerShown: false,
      }}>
      
      <Stack.Screen
        name="MyTabs"
        component={MyTabs}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      
      <Stack.Screen
        name="UploadPost"
        component={UploadPost}
        // options={{
        //   ...TransitionPresets.SlideFromRightIOS,
        // }}
      />
      
    </Stack.Navigator>
  );
};
export default AppStack;

const styles = StyleSheet.create({});
