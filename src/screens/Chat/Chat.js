import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Avatar, Badge} from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {getAuth, updatePassword} from 'firebase/auth';
import ItemRoomChat from './ItemRoomChat';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import ItemUserOnline from './ItemUserOnline';
const Chat = () => {
  const [listUsers, setListUsers] = useState([]);
  const [messagesThreads, setMessagesThreads] = useState([]);
  const me = useSelector(state => state.user.data)
  const navigation = useNavigation();
useEffect(() => {
    const sub = firestore()
      .collection('users')
      .orderBy('isOnline')
      .onSnapshot(querySnapshot => {
        var listUsers = [];
        querySnapshot.forEach(doc => {
            if(me?.follow.includes(doc.id))
          listUsers.unshift({
            id: doc.id,
            ...doc?.data(),
          });
        });
        setListUsers(listUsers);
      });
    return () => {
      sub();
    };
  }, [me]);
  useEffect(() => {
    const sub = firestore()
      .collection('users')
      .orderBy('isOnline')
      .onSnapshot(querySnapshot => {
        var listUsers = [];
        querySnapshot.forEach(doc => {
            if(me?.follow.includes(doc.id))
          listUsers.unshift({
            id: doc.id,
            ...doc?.data(),
          });
        });
        setListUsers(listUsers);
      });
    return () => {
      sub2();
    };
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textHeader}>Tin nhắn</Text>
        <TouchableOpacity>
          <Icon name="search" size={30} color={'black'} />
        </TouchableOpacity>
      </View>
      <View style={styles.listFriendOnLine}>
        <FlatList
          horizontal
          data={listUsers}
          renderItem={({item, index}) => (
            <ItemUserOnline item={item}/>
          )}
          keyExtractor={item => item.id}
        />
      </View>
      <View
        style={{
          height: 4,
          backgroundColor: '#ededed',
          marginVertical: 10,
        }}></View>
      <View style={styles.listMessage}>
        <FlatList
          data={messagesThreads}
          renderItem={({item, index}) => <ItemRoomChat item={item} />}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

export default Chat;
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.3,
    borderBottomColor: '#e3e3e3',
  },
  textHeader: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  listFriendOnLine: {
    marginTop: 10,
    flexDirection: 'row',
  },

  listMessage: {},
  itemMessage: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  nameFriendMessage: {
    fontSize: 16,
    color: '#000',
  },
  lastMessage: {
    marginTop: 4,
    color: 'gray',
  },
});
