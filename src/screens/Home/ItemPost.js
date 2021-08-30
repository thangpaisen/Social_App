import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import Lightbox from 'react-native-lightbox-v2';
import VideoPlayer from 'react-native-video-controls';
import Icon from 'react-native-vector-icons/Ionicons';
import image from '../../assets/images/br.png';
import luffy from '../../assets/images/luffy.jpg';
import {useNavigation} from '@react-navigation/native';
import dateFormat from 'dateformat';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const ItemPost = ({item}) => {
  const navigation = useNavigation();
  const [user, setUser] = useState({});
  useEffect(() => {
    const a = auth().currentUser;
    if (a) {
      setUser(a);
    }
  }, []);
  const handleOnLove = () => {
    //   console.log('love')
    const checkLove = item.love.indexOf(user.uid);
    if (checkLove > -1) {
      console.log('-love')
        var newArr = [...item.love]
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
      console.log('+love')

      firestore()
        .collection('postsUser')
        .doc(item.id)
        .set(
          {
            love: [user.uid, ...item.love],
          },
          {merge: true},
        );
    }
  };
  return (
    <View style={styles.itemPost}>
      <View style={styles.headerItemPost}>
        <Avatar
          size={34}
          rounded
          source={{
            uri:
              item.user.uriImage ||
              'https://image.flaticon.com/icons/png/512/149/149071.png',
          }}
        />
        <View style={styles.title}>
          <Text style={styles.name}>{item.user.displayName}</Text>
          <Text style={styles.lastTime}>
            {dateFormat(item.createdAt, 'HH:MM, mmmm dS yyyy ') || '5 phút tr'}
          </Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text
          style={[styles.textContent, !item.message.image && {fontSize: 20}]}>
          {item.message.text}
        </Text>
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
            name={item.love.indexOf(user.uid) > -1 ? 'heart' : 'heart-outline'}
            size={26}
            color={item.love.indexOf(user.uid) > -1 ? 'red' : 'black'}
          />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.comment, styles.itemIcon]}>
          <Icon name="chatbox-outline" size={26} color={'black'} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.share, styles.itemIcon]}>
          <Icon name="share-social-outline" size={26} color={'black'} />
        </TouchableOpacity>
      </View>
      <View style={styles.reactQuantity}>
       { item.love.length>0&&<View style={[styles.quantityLove]}>
          <Text style={styles.textQuantityLove}>
            {item.love.length} lượt thích
          </Text>
        </View>}
        {item.comment.length>0&&<View style={styles.quantityComment}>
          <Text style={styles.textQuantityComment}>6 bình luận</Text>
        </View>}
      </View>
    </View>
  );
};

export default ItemPost;

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  itemPost: {
    marginTop: 10,
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
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
  },
  lastTime: {
    fontSize: 12,
  },
  textContent: {
    padding: 10,
    marginTop: 10,
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
