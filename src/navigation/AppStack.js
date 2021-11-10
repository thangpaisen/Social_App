import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {TransitionPresets} from '@react-navigation/stack';
import Home from './../screens/Home';
import Settings from './../screens/Settings';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Comments from "./../screens/Comments";
import UpDatePost from "./../screens/UpDatePost/UpdatePost";
import UploadPost from "./../screens/UploadPost";
import ProfileUser from "./../screens/ProfileUser/ProfileUser";
import UpdateProfileUser from "./../screens/UpdateProfileUser/UpdateProfileUser";
import Search from "./../screens/Search/Search";
import Chat from "./../screens/Chat/Chat";
import Messages from "./../screens/Chat/Messages";
import Groups from "./../screens/Groups/Groups";
import CreateGroup from "./../screens/Groups/CreateGroup";
import DetailGroup from "./../screens/Groups/DetailGroup";
import MyGroups from "./../screens/Groups/MyGroups/MyGroups";
import DescGroup from "./../screens/Groups/DetailGroup/DescGroup";
const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#09bff2"
      inactiveColor="gray"
      barStyle={{backgroundColor: 'white'}}
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
        name="Groups"
        component={Groups}
        options={{
          tabBarLabel: 'Hội nhóm',
          tabBarIcon: ({color}) => (
            <Icon2 name="users" size={24} color={color} />
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
            <Icon name="settings" size={24} color={color} />
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
      <Stack.Screen
        name="Messages"
        component={Messages}
        options={{
          ...TransitionPresets.SlideFromRightIOS  ,
        }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          ...TransitionPresets.SlideFromRightIOS  ,
        }}
      />
      <Stack.Screen
        name="StackGroups"
        component={StackGroups}
        options={{
          ...TransitionPresets.SlideFromRightIOS  ,
        }}
      />
      
    </Stack.Navigator>
  );
};
export default AppStack;

const StackGroups = () => {
  return (
    <Stack.Navigator
      initialRouteName="Groups"
      screenOptions={{
        headerShown: false,
      }}>

      <Stack.Screen
        name="Groups"
        component={Groups}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="CreateGroup"
        component={CreateGroup}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="MyGroups"
        component={MyGroups}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="DetailGroup"
        component={DetailGroup}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="DescGroup"
        component={DescGroup}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
    </Stack.Navigator>
  );
};
