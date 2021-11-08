import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Pressable,
  Modal,
  Alert,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {Avatar} from 'react-native-elements';
import Lightbox from 'react-native-lightbox-v2';
import VideoPlayer from 'react-native-video-controls';
import Icon from 'react-native-vector-icons/Ionicons';
import image from '../../assets/images/br.png';
import {useNavigation} from '@react-navigation/native';
import dateFormat from 'dateformat';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import * as Animatable from 'react-native-animatable';
import {useSelector} from 'react-redux';
const ItemPostGroups = ({item}) => {
  const navigation = useNavigation();
  const [userNow, setUser] = useState({});
  const [userItemPost, setUserItemPost] = useState({});
  const [totalComment, setTotalComment] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [dataGroupPost, setDataGroupPost] = useState({});
  const [dataPost, setDataPost] = useState(item);
  const ref = firestore().collection('groups').doc(item.idGroup).collection('posts').doc(item.id);
  useEffect(() => {
    const sub = firestore()
      .collection('groups')
      .doc(`${item.idGroup}`)
      .onSnapshot(doc => {
        setDataGroupPost(doc.data());
      });
    const sub2 = firestore()
      .collection('users')
      .doc(`${item.uidUser}`)
      .onSnapshot(doc => {
        setUserItemPost(doc.data());
      });
    const sub3 = firestore()
      .collection('users')
      .doc(`${auth().currentUser.uid}`)
      .onSnapshot(doc => {
        setUser(doc.data());
      });
    const sub4 = ref.onSnapshot(doc => {
        if(doc.exists){
            setDataPost(doc.data());
        ref.collection('comments')
        .onSnapshot(querySnapshot => {
            setTotalComment(querySnapshot.size);
        });
        }
        else {
            setDataPost(null);
        }
    });
    return () => {
      sub();
      sub2();
      sub3();
      sub4();
    };
  }, []);
  const handleOnLove = () => {
    const checkLove = dataPost?.love.indexOf(userNow.uid);
    if (checkLove > -1) {
      var newArr = [...dataPost.love];
      newArr.splice(checkLove, 1);
      ref
        .update({
            love: [...newArr],
          });
    } else {
      ref
        .update(
          {
            love: [userNow.uid, ...dataPost.love],
          });
    }
  };
  const handleClickButtonUpDatePost = () => {
    setModalVisible(false);
    navigation.navigate('UpDatePost', {dataPost: dataPost,ref:ref});
  };
  const handleClickButtonDeletePost = () => {
    Alert.alert('Thông báo', 'Bạn muốn xóa bài viết', [
      {
        text: 'Cancel',
        onPress: () => setModalVisible(false),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => deletePost()},
    ]);
  };
  
  const deletePost = () => {
    ref
      .delete()
      .then(() => {
        setModalVisible(false);
        Toast.show({
          text1: 'Đã xóa bài viết',
          visibilityTime: 100,
        });
      });
  };
  if(!dataPost)
    return null;
  return (
    <>
      <View style={styles.itemPost}>
        <View style={styles.headerItemPost}>
          <Avatar
            size={50}
            rounded
            source={{
              uri:
                dataGroupPost?.imageCover ||
                'https://images6.alphacoders.com/102/1029037.jpg',
            }}>
            <Avatar
              size={25}
              rounded
              containerStyle={{position: 'absolute', bottom: 0, right: -6}}
              source={{
                uri:
                  userItemPost?.imageAvatar ||
                  'https://images6.alphacoders.com/740/thumb-1920-740310.jpg',
              }}
            />
          </Avatar>
          <View style={styles.title}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('StackGroups', {
                  screen: 'DetailGroup',
                  params: {id: item.idGroup},
                });
              }}>
              <Text style={styles.name} numberOfLines={2}>
                {dataGroupPost?.name}
              </Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ProfileUser', {uidUser: dataPost?.uidUser});
                }}>
                <Text style={{marginRight: 6}}>
                  {userItemPost?.displayName}
                </Text>
              </TouchableOpacity>
              <Text style={styles.lastTime}>
                {dateFormat(item?.createdAt, 'HH:MM, mmmm dS yyyy ') ||
                  '5 phút tr'}
              </Text>
            </View>
          </View>
          {userNow.uid === item?.uidUser && (
            <Pressable
              style={styles.morePost}
              onPress={() => setModalVisible(true)}>
              <Icon name="ellipsis-horizontal" size={24} color="black" />
            </Pressable>
          )}
        </View>
        <View style={styles.content}>
          {dataPost?.message?.text.length > 0 && (
            <Text
              style={[
                styles.textContent,
                !dataPost?.message.image && {fontSize: 20},
              ]}>
              {dataPost?.message.text}
            </Text>
          )}
          {dataPost?.message?.image.length > 0 ? (
            <Lightbox
              navigator={navigation.navigator}
              activeProps={{
                style: {
                  flex: 1,
                  width: width,
                  height: height,
                  resizeMode: 'contain',
                },
              }}>
              <Image
                source={{
                  uri:
                    dataPost?.message.image ||
                    'https://cdn.presslabs.com/wp-content/uploads/2018/10/upload-error.png',
                }}
                style={styles.image}
              />
            </Lightbox>
          ) : null}
        </View>
        <View style={styles.react}>
          <TouchableOpacity
            style={[styles.feel, styles.itemIcon]}
            onPress={() => handleOnLove()}
          >
            <Icon
              name={
                dataPost?.love.indexOf(userNow.uid) > -1 ? 'heart' : 'heart-outline'
              }
              size={26}
              color={dataPost?.love.indexOf(userNow.uid) > -1 ? 'red' : 'black'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.comment, styles.itemIcon]}
            // onPress={() => handleOpenComments()}
          >
            <Icon name="chatbox-outline" size={26} color={'black'} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.share, styles.itemIcon]}>
            <Icon name="share-social-outline" size={26} color={'black'} />
          </TouchableOpacity>
        </View>
        <View style={styles.reactQuantity}>
          {dataPost?.love.length > 0 && (
            <View style={[styles.quantityLove]}>
              <Text style={styles.textQuantityLove}>
                {dataPost?.love.length} lượt thích
              </Text>
            </View>
          )}
          {totalComment > 0 && (
            <View style={styles.quantityComment}>
              <Text style={styles.textQuantityComment}>
                {totalComment} bình luận
              </Text>
            </View>
          )}
        </View>
      </View>
      <Modal
        // animationType="slide"
        transparent={true}
        visible={modalVisible}>
        <Pressable
          onPress={() => setModalVisible(false)}
          style={{flex: 1, backgroundColor: 'black', opacity: 0.2}}></Pressable>
        <View style={styles.morePostContent}>
          <TouchableOpacity
            style={styles.morePostItem}
            onPress={() => handleClickButtonUpDatePost()}
          >
            <Icon name="trash-outline" size={24} color="black" />
            <Text style={{fontSize: 16, marginLeft: 10}}>
              Chỉnh sửa bài viết
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.morePostItem}
            onPress={() => handleClickButtonDeletePost()}
          >
            <Icon name="trash-outline" size={24} color="black" />
            <Text style={{fontSize: 16, marginLeft: 10}}>Xóa</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

export default ItemPostGroups;

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  itemPost: {
    paddingTop: 10,
    backgroundColor: 'white',
  },
  headerItemPost: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    marginLeft: 10,
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    paddingRight: 10,
  },
  lastTime: {
    fontSize: 12,
  },
  morePost: {},
  morePostContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    elevation: 5,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 10,
    paddingVertical: 20,
  },
  morePostItem: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    marginVertical: 10,
  },
  textContent: {
    padding: 10,
    fontSize: 16,
  },
  image: {
    width: width,
    height: height / 2,
  },
  react: {
    paddingVertical: 5,
    flexDirection: 'row',
  },
  itemIcon: {
    marginLeft: 10,
  },
  reactQuantity: {
    marginLeft: 10,
    paddingBottom: 10,
  },
  textQuantityLove: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  textQuantityComment: {
    fontSize: 14,
    color: 'gray',
  },
});
