import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import Header from './Header';
import {Avatar} from 'react-native-elements';
import ItemPost from './../Home/ItemPost';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const ProfileUser = () => {
  const navigation = useNavigation();
  const [postsUser, setPostsUser] = useState([]);
//   const [refreshing, setRefreshing] = useState(false);
  const ref = firestore().collection('postsUser').orderBy('createdAt', 'desc');
  const [user, setUser] = useState({})
  useEffect(() => {
        const uidUserNow =auth().currentUser.uid
      const unsubscribe = firestore().collection('users')
      .onSnapshot(querySnapshot => {
      var user = {};
      querySnapshot.forEach(doc => {
          if(doc.data().uid === uidUserNow)
                user= {...doc.data()}
      });
      setUser(user);
    });
    return () => unsubscribe();
  }, []);
  useEffect(() => {
      const unsubscribe = ref.onSnapshot(querySnapshot => {
      const listPostsUser = [];
      querySnapshot.forEach(doc => {
          if(doc.data().uidUser === auth().currentUser.uid)
            listPostsUser.push({
            id: doc.id,
            ...doc.data(),
            });
      });
      setPostsUser(listPostsUser);
    });
    return () => unsubscribe();
  }, []);
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView>
      <View style={styles.profile}>
        <Image
          source={{
            uri: user.imageCover ||
            'https://image.flaticon.com/icons/png/512/149/149071.png',
          }}
          style={styles.imageCover}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 20,
          }}>
          <Avatar
            source={{
              uri: user.imageAvatar ||
              'https://image.flaticon.com/icons/png/512/149/149071.png',
            }}
            size={70}
            rounded
            containerStyle={{marginTop: -35}}
          />
          <TouchableOpacity style={styles.editProfile} onPress={() => navigation.navigate('UpdateProfileUser')}>
            <Text style={styles.textEditProfile}>Chỉnh sửa hồ sơ</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>{user.displayName}</Text>
        <Text style={styles.description}>{user.description}</Text>
        <View style={styles.follower}>
          <Text style={{fontSize: 14, marginRight: 10}}>
            <Text style={{fontWeight: 'bold'}}>31 </Text>
            đang Follow
          </Text>
          <Text style={{fontSize: 14, marginRight: 10}}>
            <Text style={{fontWeight: 'bold'}}>2 </Text>
            Follower
          </Text>
        </View>
      </View>
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
          <ItemPost item={item} key={item.id} />
        ))}
        </ScrollView>
    </View>
  );
};

export default ProfileUser;
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  profile: {},
  imageCover: {
    width: width,
    height: height / 5,
  },
  editProfile: {
    marginTop: 10,
    paddingHorizontal: 10,
    padding: 0,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d1d1d1',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textEditProfile: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  follower: {
    marginTop: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  upPost: {
    marginTop: 20,
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
    // backgroundColor: '#ebebeb',
  },
  inputText: {
    // paddingLeft: 10,
    fontSize: 16,
    color: 'gray',
  },
});
