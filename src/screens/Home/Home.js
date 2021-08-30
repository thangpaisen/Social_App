import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView, Pressable,RefreshControl} from 'react-native';
import {Avatar} from 'react-native-elements';

import ItemPost from './ItemPost';
import image from '../../assets/images/br.png';
import luffy from '../../assets/images/luffy.jpg';
import {useNavigation} from '@react-navigation/native';
import Header from './Header';
import firestore from '@react-native-firebase/firestore';
const Home = () => {
  const navigation = useNavigation();
  const [postsUser, setPostsUser] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
  const ref =firestore().collection('postsUser').orderBy('createdAt', 'desc') ;
  useEffect(() => {
    const abc=  ref.onSnapshot(querySnapshot => {
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

  return (
    <View style={styles.container}>
      <Header />
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
                uri: 'https://i.pinimg.com/564x/e1/55/94/e15594a1ebed28e40a7836dd7927b150.jpg',
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
        {/* <ItemPost item={item}/>
        <ItemPost  item={item2}/> */}
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
