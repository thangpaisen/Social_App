import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  Alert
} from 'react-native';
import Toast from 'react-native-toast-message';
import {Avatar} from 'react-native-elements';
import dateFormat from 'dateformat';
import Icon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
const ItemComment = ({item, idPost}) => {
  const [userNow, setUserNow] = useState({});
  const ref = firestore()
    .collection('postsUser')
    .doc(idPost)
    .collection('comments')
    .doc(item.id);
  useEffect(() => {
    const a = auth().currentUser;
    if (a) {
      setUserNow(a);
    }
  }, []);
  const handleOnLove = () => {
    const checkLove = item.love.indexOf(userNow.uid);
    if (checkLove > -1) {
      var newArr = [...item.love];
      newArr.splice(checkLove, 1);
      ref.set(
        {
          love: [...newArr],
        },
        {merge: true},
      );
    } else {
      ref.set(
        {
          love: [userNow.uid, ...item.love],
        },
        {merge: true},
      );
    }
  };
  const HandleOnLongPressTextComment=()=>{
      Alert.alert(
      "Thông báo",
      "Bạn muốn xóa bình luận",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => deletePostComment() }
      ]
    );
  }
  const deletePostComment=() => {
      ref.delete()
        .then(() => {
            Toast.show({
                text1: 'Đã xóa bình luận',
                visibilityTime: 100,
                });
        });
  }
  return (
    <View style={styles.itemCommentContainer}>
      <Avatar
        size={34}
        rounded
        source={{
          uri:
            item.userComment.uriImage ||
            'https://image.flaticon.com/icons/png/512/149/149071.png',
        }}
      />
      <View style={styles.title}>
        <Text style={styles.name}>{item?.userComment?.displayName}</Text>
        <Pressable onLongPress={()=>{
            HandleOnLongPressTextComment();
        }}>
            <Text style={styles.textContent}>{item?.textComment}</Text>
        </Pressable>
        <View style={styles.react}>
          <Text style={styles.itemReact}>
            {dateFormat(item?.createdAt, 'HH:MM, mm/dd ') || '?h'}
          </Text>
          <Pressable>
            {item.love.length > 0 && (
              <Text style={styles.itemReact}>
                {item.love.length} lượt thích
              </Text>
            )}
          </Pressable>
          <Pressable>
            <Text style={styles.itemReact}>Trả lời</Text>
          </Pressable>
        </View>
      </View>
      <TouchableOpacity style={styles.love} onPress={() => handleOnLove()}>
        <Icon
          name={item.love.indexOf(userNow.uid) > -1 ? 'heart' : 'heart-outline'}
          size={16}
          color={item.love.indexOf(userNow.uid) > -1 ? 'red' : 'black'}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ItemComment;

const styles = StyleSheet.create({
  itemCommentContainer: {
    flexDirection: 'row',
    padding: 10,
    paddingBottom: 0,
    marginLeft: 5,
  },
  title: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
  },

  textContent: {
    // marginTop: 4,
    fontSize: 16,
  },
  react: {
    paddingVertical: 4,
    flexDirection: 'row',
  },
  itemReact: {
    fontSize: 12,
    marginRight: 20,
    fontWeight: 'bold',
    color: 'gray',
  },

  love: {
    marginTop: 10,
    marginRight: 5,
  },
});
