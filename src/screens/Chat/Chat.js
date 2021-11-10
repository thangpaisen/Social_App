import React,{useState, useEffect} from 'react';
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
import ItemRoomChat from "./ItemRoomChat";
import { useNavigation } from "@react-navigation/native";
const Chat = () => {
    const [listUsers, setListUsers] = useState([])
      const [messagesThreads, setMessagesThreads] = useState([]);
      const navigation =useNavigation()
    useEffect(() => {
        const sub = firestore()
      .collection('users')
      .where('uid', '!=', auth().currentUser.uid)
      .onSnapshot(querySnapshot => {
        var listUsers =[] ;
        querySnapshot.forEach(doc => {
         listUsers.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setListUsers(listUsers);
      });
      const sub2 = firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .collection('messages_threads')
      .orderBy('lastMessage.createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        var messagesThreads =[] ;
        querySnapshot.forEach(doc => {
         messagesThreads.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setMessagesThreads(messagesThreads);
      });
    return () =>{
        sub()
        sub2()
    };
    }, [])
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
            <TouchableOpacity style={styles.itemFriendOnLine}
                onPress={() =>
                    navigation.navigate('Messages',{uidUserReceiver:item.uid})
                }
            >
              <View>
                <Avatar
                  source={{
                    uri: item.imageAvatar||
                    'https://image.flaticon.com/icons/png/512/149/149071.png',
                  }}
                  size={50}
                  rounded
                />
                <Badge
                  status="success"
                  containerStyle={{position: 'absolute', bottom: 4, right: 4}}
                />
              </View>
              <Text style={styles.nameItemFriendOnLine} numberOfLines={2}>
                {item.displayName || 'ahihi'}
              </Text>
            </TouchableOpacity>
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
          renderItem={({item, index}) => (
            <ItemRoomChat item={item}/>
          )}
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
    borderBottomWidth:0.3,
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
  itemFriendOnLine: {
    width: width / 5,
    alignItems: 'center',
    marginLeft: 10,
  },
  nameItemFriendOnLine: {
    marginTop: 2,
    fontSize: 12,
    textAlign: 'center',
    color:'black'
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
