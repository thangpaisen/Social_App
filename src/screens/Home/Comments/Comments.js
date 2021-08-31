import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {Avatar} from 'react-native-elements';
import dateFormat from 'dateformat';
import ItemComment from './ItemComment';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Comments = ({route}) => {
  const {dataPost} = route.params;
  const navigation = useNavigation();
  const [userNow, setUserNow] = useState({});
  const [textComment, setTextComment] = useState('');
  const [listComments, setListComments] = useState([]);
  const ref = firestore()
    .collection('postsUser')
    .doc(dataPost.id)
    .collection('comments');

  useEffect(() => {
    const a = auth().currentUser;
    if (a) {
      setUserNow(a);
    }
  }, []);
  useEffect(() => {
    const abc = ref.orderBy('createdAt', 'desc').onSnapshot(querySnapshot => {
      const listComments = querySnapshot.docs.map(doc => {
        const data = {
          id: doc.id,
          ...doc.data(),
        };
        return data;
      });
      setListComments(listComments);
    });
    return () => {
      abc();
    };
  }, []);
  const handleSendComment = () => {
    if (textComment.trim().length > 0) {
      ref.add({
        love: [],
        textComment,
        userComment: {
          uid: userNow.uid,
          displayName: userNow.displayName,
          uriImage: userNow.uriImage||'',
        },
        createdAt: new Date().getTime(),
      });
      console.log(textComment);
    }
  };
  return (
    <View style={styles.commentsContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back-outline" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Comments</Text>
      </View>
      {dataPost?.message.text.length > 0 && (
        <View style={styles.textPostUser}>
          <Avatar
            size={34}
            rounded
            source={{
              uri:
                // item.user.uriImage ||
                'https://image.flaticon.com/icons/png/512/149/149071.png',
            }}
          />
          <View style={styles.title}>
            <Text style={styles.name}>{dataPost?.user.displayName}</Text>
            <Text style={styles.lastTime}>
              {dateFormat(dataPost?.createdAt, 'HH:MM, mmmm dS yyyy ') ||
                '5 phút tr'}
            </Text>
            <Text style={styles.textContent}>{dataPost?.message.text}</Text>
          </View>
        </View>
      )}
      {listComments.map((item, index) => (
        <ItemComment item={item} idPost={dataPost.id} key={index} />
      ))}
      <View style={styles.inputTextComment}>
        <TextInput
          style={styles.inputText}
          value={textComment}
          onChangeText={setTextComment}
          placeholder={'Thêm bình luận'}
        />
        <TouchableOpacity
          onPress={() => handleSendComment()}
          style={styles.send}
          disabled={textComment.trim()>0?false:true}>
          <Text style={[styles.textSend,textComment.trim()==0&&{opacity:0.5}]}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Comments;

const styles = StyleSheet.create({
  commentsContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.3,
    borderBottomColor: '#d1d1d1',
    backgroundColor: 'white',
  },
  headerTitle: {
    marginLeft: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  textPostUser: {
    flexDirection: 'row',
    padding: 10,
    marginLeft: 5,
    marginBottom: 10,
    borderBottomWidth: 0.3,
    borderBottomColor: '#d1d1d1',
    backgroundColor: 'white',
  },
  title: {
    paddingHorizontal: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
  },
  lastTime: {
    fontSize: 12,
  },
  textContent: {
    marginVertical: 10,
    fontSize: 16,
  },
  inputTextComment: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingLeft: 10,
    borderTopWidth: 0.3,
    borderTopColor: '#d1d1d1',
    backgroundColor: 'white',
  },
  inputText: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 16,
    // backgroundColor: 'red'
  },
  send: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  textSend: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#00a6ff',
  },
});
