import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  ActivityIndicator,
  Dimensions,
  Image,
  TouchableOpacity,
  Pressable,
  ScrollView,
  ToastAndroid,Alert
} from 'react-native';
import Header from './Header';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons';
import ItemMember from './ItemMember';
import {Avatar} from 'react-native-elements';
import ItemPost from './ItemPost';
import {useNavigation} from '@react-navigation/native';
import Loading from './../../../components/Loading';
const DetailGroup = ({route}) => {
  const {id} = route.params;
  const navigation = useNavigation();
  const groupRef = firestore().collection('groups').doc(id);
  const [loading, setLoading] = useState(false);
  const [dataGroup, setDataGroup] = useState({});
  const [postsGroup, setPostsGroup] = useState([]);
  const [user, setUser] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkUserJoined, setCheckUserJoined] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    setLoading(true);
    const sub = groupRef.onSnapshot(doc => {
      setDataGroup({...doc.data(), id: doc.id});
      setCheckUserJoined(doc.data().members.includes(auth().currentUser.uid));
      setIsAdmin(doc.data().managers.includes(auth().currentUser.uid));
    });
    const sub2 = firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .onSnapshot(doc => {
        setUser(doc.data());
      });
    const sub3 = groupRef
      .collection('posts')
      .orderBy('createdAt', 'desc')
      .onSnapshot(doc => {
        setPostsGroup(
          doc.docs.map(item => {
            return {
              ...item.data(),
              id: item.id,
            };
          }),
        );
        setLoading(false);
      });
    return () => {
      sub();
      sub2();
      sub3();
    };
  }, []);
  const handleOnJoinGroup = () => {
    firestore()
      .collection('groups')
      .doc(id)
      .update({
        members: firestore.FieldValue.arrayUnion(auth().currentUser.uid),
      })
      .then(() => {
        firestore()
          .collection('groups')
          .doc(id)
          .collection('member')
          .doc(auth().currentUser.uid)
          .set({
            uid: auth().currentUser.uid,
            role: 'member',
            createdAt: new Date().getTime(),
          })
          .then(() => {
            ToastAndroid.show('Bạn đã tham gia nhóm', ToastAndroid.SHORT);
          });
      });
  };
  const handleClickButtonLeaveGroup = () => {
    Alert.alert('Thông báo', 'Bạn chắc chắn muốn rời khỏi nhóm', [
      {
        text: 'Cancel',
        onPress: () => setModalVisible(false),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => handleOnLeaveGroup()},
    ]);
  };
  const handleOnLeaveGroup = () => {
    firestore()
      .collection('groups')
      .doc(dataGroup.id)
      .update({
        members: firestore.FieldValue.arrayRemove(auth().currentUser.uid),
      })
      .then(() => {
        firestore()
          .collection('groups')
          .doc(dataGroup.id)
          .collection('member')
          .doc(auth().currentUser.uid)
          .delete()
          .then(() => {
            ToastAndroid.show('Bạn đã rời khỏi nhóm', ToastAndroid.SHORT);
            setModalVisible(false);
          });
      })
      .catch(err => {
        ToastAndroid.show('Lỗi', ToastAndroid.SHORT);
      });
  };
  const  handleClickButtonReportGroup = () => {
      Alert.alert(
            'Báo cáo nhóm',
            'Bạn có chắc chắn muốn báo cáo nhóm?',
            [
                {
                    text: 'Hủy',
                    onPress: () => {setModalVisible(false)},
                    style: 'cancel',
                },
                {text: 'OK', onPress: () => handleOnRePortGroup()},
            ],
            {cancelable: false},
        );
  }
  const handleOnRePortGroup = () => {
        firestore()
            .collection('groups')
            .doc(dataGroup.id)
            .update({
                report: firestore.FieldValue.arrayUnion(auth().currentUser.uid),
            })
            .then(() => {
                ToastAndroid.show('Bạn đã báo cáo nhóm', ToastAndroid.SHORT);
                setModalVisible(false);
            });
  }
  return (
    <>
      <View style={styles.container}>
        <Header
          data={dataGroup}
          isAdmin={isAdmin}
          setModalVisible={setModalVisible}
        />
        {!loading ? (
          <ScrollView style={styles.content}>
            <Image
              source={{
                uri: dataGroup?.imageCover,
              }}
              style={styles.image}
            />
            <TouchableOpacity
              style={styles.info}
              onPress={() =>
                navigation.navigate('DescGroup', {dataGroup: dataGroup})
              }>
              <View style={styles.nameGroup}>
                <Text style={styles.title}>{dataGroup?.name}</Text>
                <Icon
                  name="chevron-forward-outline"
                  size={20}
                  color="#000"
                  style={styles.icon}
                />
              </View>
              <Text style={styles.totalMembers}>
                {dataGroup?.members?.length} ➼ thành viên
              </Text>
            </TouchableOpacity>
            {checkUserJoined ? (
              <>
                <View style={styles.members}>
                  {dataGroup?.members?.map((item, index) => {
                    return <ItemMember key={index} data={item} index={index} />;
                  })}
                  <TouchableOpacity
                    style={styles.addMember}
                    onPress={() =>
                      navigation.navigate('InvitesFriends', {idGroup: id})
                    }>
                    <Icon name="add-outline" size={20} color="#fff" />
                    <Text style={styles.textAddMember}>Mời</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.announced}>
                  <Icon name="bookmark-outline" size={20} color="gray" />
                  <Text style={styles.titleAnnounced}>Thông báo</Text>
                </View>
                {/* bulkhead */}
                <View style={styles.bulkhead} />
                {/* upPost */}
                <Pressable
                  style={styles.upPost}
                  onPress={() =>
                    navigation.navigate('UploadPost', {
                      ref: groupRef.collection('posts'),
                    })
                  }>
                  <View style={styles.avatar}>
                    <Avatar
                      size={36}
                      rounded
                      source={{
                        uri:
                          user?.imageAvatar ||
                          'https://image.flaticon.com/icons/png/512/149/149071.png',
                      }}
                    />
                  </View>
                  <View style={styles.inputPost}>
                    <Text style={styles.inputText}>Bạn đang nghĩ gì....</Text>
                  </View>
                </Pressable>
              </>
            ) : (
              <TouchableOpacity
                style={styles.btnJoinGroup}
                onPress={() => handleOnJoinGroup()}>
                <Text style={styles.textJoinGroup}>Tham gia nhóm</Text>
              </TouchableOpacity>
            )}
            <View style={[styles.bulkhead]}>
              <Text style={{padding: 10, fontWeight: 'bold'}}>
                Bài viết gần đây
              </Text>
            </View>
            {postsGroup.map(item => (
              <ItemPost item={item} key={item.id} id={id} />
            ))}
          </ScrollView>
        ) : (
          <Loading />
        )}
      </View>
      <Modal transparent={true} visible={modalVisible}>
        <Pressable
          onPress={() => setModalVisible(false)}
          style={{flex: 1, backgroundColor: 'black', opacity: 0.2}}></Pressable>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.modalItem} onPress={() => {}}>
            <Icon name="arrow-redo-outline" size={24} color="black" />
            <Text style={{fontSize: 16, marginLeft: 10}}>Chia sẻ nhóm</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalItem} onPress={() => {
              handleClickButtonReportGroup()
          }}>
            <Icon name="information-circle-outline" size={24} color="black" />
            <Text style={{fontSize: 16, marginLeft: 10}}>Báo cáo nhóm</Text>
          </TouchableOpacity>
          {checkUserJoined && (
            <TouchableOpacity
              style={styles.modalItem}
              onPress={() => handleClickButtonLeaveGroup()}>
              <Icon name="log-out-outline" size={24} color="black" />
              <Text style={{fontSize: 16, marginLeft: 10}}>Rời khỏi nhóm</Text>
            </TouchableOpacity>
          )}
        </View>
      </Modal>
    </>
  );
};

export default DetailGroup;

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
  image: {
    width: width,
    height: 200,
    resizeMode: 'cover',
  },
  info: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  nameGroup: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  icon: {
    marginTop: 10,
  },
  totalMembers: {
    fontSize: 18,
    color: 'gray',
  },
  members: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addMember: {
    marginLeft: 4,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
    paddingHorizontal: 8,
    borderRadius: 10,
    backgroundColor: '#00a1f2',
  },
  textAddMember: {
    fontSize: 18,
    color: 'white',
  },
  btnJoinGroup: {
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#00a1f2',
    marginHorizontal: 20,
    borderRadius: 10,
  },
  textJoinGroup: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  announced: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 0.3,
    borderTopColor: '#d1d1d1',
  },
  titleAnnounced: {
    fontSize: 18,
    color: 'gray',
    marginLeft: 10,
  },
  bulkhead: {
    marginVertical: 10,
    paddingVertical: 3,
    backgroundColor: '#e3e3e3',
  },
  upPost: {
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
  modalContent: {
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
  modalItem: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
