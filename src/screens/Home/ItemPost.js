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
  Alert
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
import { useSelector } from "react-redux";
const ItemPost = ({item}) => {
  const navigation = useNavigation();
  const [userNow, setUser] = useState({})
  const [userItemPost, setUserItemPost] = useState({});
  const [totalComment, setTotalComment] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

useEffect(() => {
     const sub=firestore().collection('postsUser').doc(item.id).collection('comments')
      .onSnapshot(querySnapshot => {
         setTotalComment(querySnapshot.size)
        });
    const sub2 = firestore()
      .collection('users')
      .where('uid', '==', auth().currentUser.uid)
      .onSnapshot(querySnapshot => {
        var me = {};
        querySnapshot.forEach(doc => {
          me = {
            id: doc.id,
            ...doc.data(),
          };
        });
        setUser(me);
      });
        return () =>{
            sub();
            sub2()
        }
  }, []);
  useEffect(() => {
     const sub=firestore().collection('users').where('uid', '==', item.uidUser)
      .onSnapshot(querySnapshot => {
      var userPost = {};
      querySnapshot.forEach(doc => {
                userPost = {...doc.data()}
      });
      setUserItemPost(userPost);
    },);
    return () =>sub()
  }, []);
  const handleOnLove = () => {
    const checkLove = item.love.indexOf(userNow.uid);
    if (checkLove > -1) {
      var newArr = [...item.love];
      newArr.splice(checkLove, 1);
      firestore()
        .collection('postsUser')
        .doc(item.id)
        .set(
          {
            love: [...newArr],
          },
          {merge: true},
        );
    } else {
      firestore()
        .collection('postsUser')
        .doc(item.id)
        .set(
          {
            love: [userNow.uid, ...item.love],
          },
          {merge: true},
        );
    }
  };
  const handleOpenComments =()=>{
      navigation.navigate('Comments',{dataPost:item})
  }
  const handleClickButtonDeletePost =()=>{
      Alert.alert(
      "Thông báo",
      "Bạn muốn xóa bài viết",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => deletePost() }
      ]
    );
  }
  const handleClickButtonUpDatePost=()=> {
      setModalVisible(false)
      navigation.navigate('UpDatePost',{dataPost:item})
  }
  const deletePost=()=>{
      firestore()
        .collection('postsUser')
        .doc(item.id)
        .delete()
        .then(() => {
            setModalVisible(false)
            Toast.show({
                text1: 'Đã xóa bài viết',
                visibilityTime: 100,
                });
        });
  }
  return (
      <>
    <View style={styles.itemPost}>
      <View style={styles.headerItemPost}>
        <Avatar
          size={34}
          rounded
          source={{
            uri:
              userItemPost.imageAvatar ||
              'https://image.flaticon.com/icons/png/512/149/149071.png',
          }}
        />
        <View style={styles.title}>
          <TouchableOpacity onPress={() =>{
              navigation.navigate('ProfileUser',{uidUser:item.uidUser})
          }}>
            <Text style={styles.name}>{userItemPost.displayName}</Text>
          </TouchableOpacity>
          <Text style={styles.lastTime}>
            {dateFormat(item.createdAt, 'HH:MM, mmmm dS yyyy ') || '5 phút tr'}
          </Text>
        </View>
        {userNow.uid===item.uidUser&&<Pressable style={styles.morePost} onPress={()=>setModalVisible(true)}>
            <Icon name="ellipsis-horizontal" size={24} color="black" />
        </Pressable>}
      </View>
      <View style={styles.content}>
        {item.message.text.length>0&&<Text
          style={[styles.textContent, !item.message.image && {fontSize: 20}]}>
          {item.message.text}
        </Text>}
        {item.message.image ? (
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
            <Image source={{uri: item.message.image}} style={styles.image} />
          </Lightbox>
        ) : null}
      </View>
      <View style={styles.react}>
        <TouchableOpacity
          style={[styles.feel, styles.itemIcon]}
          onPress={() => handleOnLove()}>
            <Icon
              name={
                item.love.indexOf(userNow.uid) > -1 ? 'heart' : 'heart-outline'
              }
              size={26}
              color={item.love.indexOf(userNow.uid) > -1 ? 'red' : 'black'}
            />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.comment, styles.itemIcon]} onPress={() => handleOpenComments()}>
          <Icon name="chatbox-outline" size={26} color={'black'} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.share, styles.itemIcon]}>
          <Icon name="share-social-outline" size={26} color={'black'} />
        </TouchableOpacity>
      </View>
      <View style={styles.reactQuantity}>
        {item.love.length > 0 && (
          <View style={[styles.quantityLove]}>
            <Text style={styles.textQuantityLove}>
              {item.love.length} lượt thích
            </Text>
          </View>
        )}
        {totalComment > 0 && (
          <View style={styles.quantityComment}>
            <Text style={styles.textQuantityComment}>{totalComment} bình luận</Text>
          </View>
        )}
      </View>
    </View>
    <Modal
        // animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <Pressable 
            onPress={() =>setModalVisible(false)}
            style={{flex: 1,backgroundColor:'black',opacity:0.2}}>
        </Pressable>
        <View style={styles.morePostContent}>
                <TouchableOpacity style={styles.morePostItem} onPress={() =>handleClickButtonUpDatePost()}>
                    <Icon name="trash-outline" size={24} color="black" />
                    <Text style={{fontSize: 16,marginLeft:10}}>Chỉnh sửa bài viết</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.morePostItem} onPress={() =>handleClickButtonDeletePost()}> 
                    <Icon name="trash-outline" size={24} color="black" />
                    <Text style={{fontSize: 16,marginLeft:10}}>Xóa</Text>
                </TouchableOpacity>
            </View>
      </Modal>
    </>
  );
};

export default ItemPost;

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  itemPost: {
    // marginTop: 10,
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
    flex:1,
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
  },
  lastTime: {
    fontSize: 12,
  },
  morePost:{

  },
  morePostContent:{
      position: 'absolute',
      bottom:0,
      left:0,
      right:0,
      backgroundColor: 'white',
      elevation:5,
      borderTopRightRadius:20,
      borderTopLeftRadius:20,
      padding:10,
      paddingVertical:20,
  },
  morePostItem:{
      padding:10,
      flexDirection: 'row',
      alignItems: 'center',

  },
  content:{
      marginVertical:10,
  },
  textContent: {
    padding: 10,
    fontSize: 16,
  },
  image: {
    width: width,
    height: height / 2,
    //   resizeMode: 'contain'
  },
  react: {
    paddingVertical: 5,
    flexDirection: 'row',
    // justifyContent: 'space-around',
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
