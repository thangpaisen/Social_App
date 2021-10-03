import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import Header from './Header';
import {Avatar} from 'react-native-elements';
import ItemPost from './../Home/ItemPost';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useSelector, useDispatch} from 'react-redux';
import {getListPostUser} from './../../redux/actions/listPostUser';

const ProfileUser = ({route}) => {
  const {uidUser} = route.params;
  const navigation = useNavigation();
  const [listPostUser, setListPostUser] = useState([]);
  const [userProfile, setUserProfile] = useState({});
  const [checkUserFl, setCheckUserFl] = useState(false)
  const [me, setMe] = useState({})
  useEffect(() => {
    const sub = firestore()
      .collection('users')
      .doc(uidUser)
      .onSnapshot(doc => {
        setUserProfile({
            id: doc.id,
            ...doc.data()});
      });
    const sub2 = firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .onSnapshot(doc => {
        setMe({
            id: doc.id,
            ...doc.data()});
      });
    const sub1 = firestore()
      .collection('postsUser')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const listPostUser = [];
        querySnapshot.forEach(doc => {
          if (doc.data().uidUser === uidUser)
            listPostUser.push({
              id: doc.id,
              ...doc.data(),
            });
        });
        setListPostUser(listPostUser);
      });
    
    return () => {
      sub();
      sub1();
      sub2()
    };
  }, []);
  useEffect(() => {
      const checkFl = me?.follow?.indexOf(userProfile.uid);
      if (checkFl > -1)
        setCheckUserFl(true)
    else{
        setCheckUserFl(false)
    }
  }, [me])
  const handleOnFollow =() =>{
    const checkFollower = userProfile?.follower.indexOf(auth().currentUser.uid);
    const checkFl = me.follow.indexOf(userProfile.uid);
    if (checkFl > -1)
        {
            var newArr = [...userProfile.follower];
            var newArr2 = [...me.follow];
            newArr.splice(checkFollower, 1);
            newArr2.splice(checkFl, 1);
            firestore()
                .collection('users')
                .doc(userProfile.id)
                .update(
                {
                    follower: [...newArr],
                }
                );
            firestore()
                .collection('users')
                .doc(me.id)
                .update(
                {
                    follow: [...newArr2],
                }
                );
        }
    else{
            firestore()
                .collection('users')
                .doc(userProfile.id)
                .update(
                {
                    follower: [...userProfile.follower,auth().currentUser.uid],
                }
                );
            firestore()
                .collection('users')
                .doc(me.id)
                .update(
                {
                    follow: [...me.follow,userProfile.uid],
                }
                );
    }
  }
  return (
    <View style={styles.container}>
      <Header title={userProfile.displayName} />
      <ScrollView>
        <View style={styles.profile}>
          <Image
            source={{
              uri:
                userProfile.imageCover ||
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
                uri:
                  userProfile.imageAvatar ||
                  'https://image.flaticon.com/icons/png/512/149/149071.png',
              }}
              size={70}
              rounded
              containerStyle={{marginTop: -35}}
            />
            {auth().currentUser.uid === uidUser ? (
              <TouchableOpacity
                style={styles.editProfile}
                onPress={() => navigation.navigate('UpdateProfileUser',{user:me})}>
                <Text style={styles.textEditProfile}>Chỉnh sửa hồ sơ</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.editProfile, !checkUserFl && {backgroundColor: 'black'}]}
                onPress={() => {
                    handleOnFollow();
                }}>
                <Text
                  style={[styles.textEditProfile, !checkUserFl && {color: 'white'}]}>
                  {!checkUserFl ? 'Theo dõi' : 'Đang theo dõi'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.name}>{userProfile.displayName}</Text>
          <Text style={styles.description}>{userProfile.description}</Text>
          <View style={styles.follower}>
            <Text style={{fontSize: 14, marginRight: 10}}>
              <Text style={{fontWeight: 'bold'}}>{userProfile?.follow?.length} </Text>
              đang Follow
            </Text>
            <Text style={{fontSize: 14, marginRight: 10}}>
              <Text style={{fontWeight: 'bold'}}>{userProfile?.follower?.length} </Text>
              Follower
            </Text>
          </View>
        </View>
        {auth().currentUser.uid === uidUser && (
          <Pressable
            style={styles.upPost}
            onPress={() => navigation.navigate('UploadPost')}>
            <View style={styles.avatar}>
              <Avatar
                size={36}
                rounded
                source={{
                  uri:
                    userProfile.imageAvatar ||
                    'https://image.flaticon.com/icons/png/512/149/149071.png',
                }}
              />
            </View>
            <View style={styles.inputPost}>
              <Text style={styles.inputText}>Bạn đang nghĩ gì....</Text>
            </View>
          </Pressable>
        )}
        <View style={{marginTop: 20}}>
          <Text style={{padding: 10, fontSize: 18, fontWeight: 'bold'}}>
            Bài viết
          </Text>
          {listPostUser.map((item, index) => (
            <ItemPost item={item} key={item.id} />
          ))}
        </View>
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
    paddingVertical: 6,

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
  },
  inputText: {
    fontSize: 16,
    color: 'gray',
  },
});
