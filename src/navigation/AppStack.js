import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {TransitionPresets} from '@react-navigation/stack';
import Home from './../screens/Home';
import Settings from './../screens/Settings';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Comments from "./../screens/Comments";
import UpDatePost from "./../screens/UpDatePost/UpdatePost";
import UploadPost from "./../screens/UploadPost";
import ProfileUser from "./../screens/ProfileUser/ProfileUser";
import UpdateProfileUser from "./../screens/UpdateProfileUser/UpdateProfileUser";
import Search from "./../screens/Search/Search";
import Chat from "./../screens/Chat/Chat";
const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Chat"
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
        name="Search"
        component={Search}
        options={{
          tabBarLabel: 'Tìm kiếm',
          tabBarIcon: ({color}) => (
            <Icon name="search" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({color}) => (
            <Icon name="chatbox" size={24} color={color} />
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
      <Stack.Screen
        name="UpDatePost"
        component={UpDatePost}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="Comments"
        component={Comments}
        options={{
          ...TransitionPresets.ModalPresentationIOS  ,
        }}
      />
      <Stack.Screen
        name="ProfileUser"
        component={ProfileUser}
        options={{
          ...TransitionPresets.SlideFromRightIOS  ,
        }}
      />
      <Stack.Screen
        name="UpdateProfileUser"
        component={UpdateProfileUser}
        options={{
          ...TransitionPresets.SlideFromRightIOS  ,
        }}
      />
      
    </Stack.Navigator>
  );
};
export default AppStack;

const styles = StyleSheet.create({});
