import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  RefreshControl,
} from 'react-native';
import {Avatar} from 'react-native-elements';

import ItemPost from './ItemPost';
import image from '../../assets/images/br.png';
import {useNavigation} from '@react-navigation/native';
import Header from './Header';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Loading from './../../components/Loading';
import {useDispatch, useSelector} from 'react-redux';
import {getUser} from './../../redux/actions/user';

const Home = () => {
  const navigation = useNavigation();
  const [postsUser, setPostsUser] = useState([]);
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    const sub = firestore()
      .collection('postsUser')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const listPostUser = [];
        querySnapshot.forEach(doc => {
          if (
            doc.data().uidUser === user.uid ||
            user?.follow?.indexOf(doc.data().uidUser) >= 0
          )
            listPostUser.push({
              id: doc.id,
              ...doc.data(),
            });
        });
        setPostsUser(listPostUser);
        setRefreshing(false);
      });
    return () => {
      sub();
    };
  }, [refreshing,user]);
  useEffect(() => {
    const sub2 = firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .onSnapshot(doc => {
        setUser({
            id:doc.id,
            ...doc.data()
            });
      });
    return () => {
      sub2();
    };
  }, []);
  return (
    <View style={styles.container}>
      <Header user={user} />
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => setRefreshing(true)}
          />
        }>
        <Pressable
          style={styles.upPost}
          onPress={() => navigation.navigate('UploadPost')}>
          <View style={styles.avatar}>
            <Avatar
              size={36}
              rounded
              source={{
                uri:
                  user.imageAvatar ||
                  'https://image.flaticon.com/icons/png/512/149/149071.png',
              }}
            />
          </View>
          <View style={styles.inputPost}>
            <Text style={styles.inputText}>Bạn đang nghĩ gì....</Text>
          </View>
        </Pressable>
        {!refreshing ? (
          <>
            {postsUser.map(item => (
              <ItemPost item={item} key={item.id} />
            ))}
          </>
        ) : (
          <Loading />
        )}
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
