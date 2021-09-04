import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView, Pressable,RefreshControl} from 'react-native';
import {Avatar} from 'react-native-elements';

import ItemPost from './ItemPost';
import image from '../../assets/images/br.png';
import {useNavigation} from '@react-navigation/native';
import Header from './Header';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
const Home = () => {
  const navigation = useNavigation();
  const [postsUser, setPostsUser] = useState([]);
  const [user, setUser] = useState({});
// console.log('user ', user)
    const [refreshing, setRefreshing] = useState(false);
  const ref =firestore().collection('postsUser').orderBy('createdAt', 'desc') ;
  useEffect(() => {
        const abc=  ref.onSnapshot(querySnapshot => {
            //  console.log('Total listPostsUser: ', querySnapshot.size);
        const listPostsUser = querySnapshot.docs.map(doc => {
          const data = {
              id:doc.id,
            ...doc.data(),
          };
          return data;
        });
        setPostsUser(listPostsUser);
        setRefreshing(false)
      });
      return () => {
        abc();
    };
  }, [refreshing]);
  useEffect(() => {
        const uidUserNow =auth().currentUser.uid
      firestore().collection('users').get()
      .then(querySnapshot => {
        // console.log('Total users: ', querySnapshot.size);
      var user = {};
      querySnapshot.forEach(doc => {
          if(doc.data().uid === uidUserNow)
                user= {...doc.data()}
      });
      setUser(user);
    });
  }, []);
  return (
    <View style={styles.container}>
      <Header imageAvatar={user.imageAvatar}/>
      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={()=>setRefreshing(true)}
          />
        }
        >
        <Pressable
          style={styles.upPost}
          onPress={() => navigation.navigate('UploadPost')}>
          <View style={styles.avatar}>
            <Avatar
              size={36}
              rounded
              source={{
                uri: user.imageAvatar ||
                'https://image.flaticon.com/icons/png/512/149/149071.png',
              }}
            />
          </View>
          <View style={styles.inputPost}>
            <Text style={styles.inputText}>Bạn đang nghĩ gì....</Text>
          </View>
        </Pressable>
        {postsUser.map((item, index) => (
          <ItemPost item={item} key={index} />
        ))}
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  content: {},
  upPost: {
    marginTop: 10,
    marginLeft: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputPost: {
    flex: 1,
    marginHorizontal: 10,
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#ebebeb',
  },
  inputText: {
    paddingLeft: 10,
    fontSize: 16,
    color: 'gray',
  },
});
