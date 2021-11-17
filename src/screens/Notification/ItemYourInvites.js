import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Pressable,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Colors from './../../assets/themes/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
const ItemYourInvites = ({item}) => {
  const [group, setGroup] = React.useState({});
  const [user, setUser] = React.useState({});
  console.log('a',item?.idUserInvite,item?.idGroup)
  useEffect(() => {
    firestore()
      .collection('users')
      .doc(item?.idUserInvite)
      .get()
      .then(doc => {
        setUser(doc.data());
      });
    firestore()
      .collection('groups')
      .doc(item?.idGroup)
      .get()
      .then(doc => {
        setGroup(doc.data());
      });
  }, []);
  console.log('item.id', item?.id,auth().currentUser.uid);
  const handleOnJoin = () => {
    console.log('join');
    if (!group.members.includes(auth().currentUser.uid)) {
      firestore()
        .collection('groups')
        .doc(item?.idGroup)
        .update({
          members: firestore.FieldValue.arrayUnion(item?.idUserInvite),
        });
      firestore()
        .collection('groups')
        .doc(item?.idGroup)
        .doc(auth().currentUser.uid)
        .set({
          uid: auth().currentUser.uid,
          role: 'member',
          createdAt: new Date().getTime(),
        });
    }
    firestore()
      .collection('groups')
      .doc(item?.idGroup)
      .update({
        members: firestore.FieldValue.arrayUnion(item?.idUserInvite),
      });
    firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .collection('inviteGroup')
      .doc(item?.id)
      .delete();
    ToastAndroid.show('Đã tham gia nhóm', ToastAndroid.SHORT);
  };
  const handleOnRemove = () => {
    firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .collection('notifications')
      .doc(item?.id)
      .delete();
    ToastAndroid.show('Đã xoá', ToastAndroid.SHORT);
  };
  return (
    <View style={[styles.itemYourInvites,styles.unread]}>
      <View style={styles.group}>
        <View style={{alignSelf: 'flex-start'}}>
          <Image
            source={{
              uri:
                user?.imageAvatar ||
                'https://images6.alphacoders.com/102/1029037.jpg',
            }}
            style={styles.imageAvatar}
          />
          <View style={{position: 'absolute', bottom: 0, right: -4}}>
            <Icon2 name="users" size={24} color={'#158dcf'} />
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 10,
            flex: 1,
          }}>
          <View style={styles.descriptionGroup}>
            <Text style={styles.nameGroup}>
              {user?.displayName || 'Ai đó '}
              <Text style={{fontWeight: '600', color: 'gray'}}>
                 {' '}đã mời bạn tham gia nhóm{' '}
              </Text>
              {group?.name || 'nào đó'}
            </Text>
          </View>
          <View style={styles.btnChoice}>
            <TouchableOpacity
              style={styles.itemBtnChoice}
              onPress={() => handleOnJoin()}>
              <Text style={styles.textBtnChoice}>Tham gia</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.itemBtnChoice, {backgroundColor: Colors.border}]}
              onPress={() => handleOnRemove()}>
              <Text style={[styles.textBtnChoice, {color: 'black'}]}>Xoá</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ItemYourInvites;
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  itemYourInvites: {
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  unread: {
    backgroundColor: '#e7f3ff',
  },
  imageAvatar: {
    width: 60,
    height: 60,
    borderRadius: 60,
  },
  group: {
    flexDirection: 'row',
  },
  descriptionGroup: {},
  nameGroup: {
    fontSize: 16,
    lineHeight: 20,
    paddingRight: 10,
    fontWeight: 'bold',
  },
  nameUserInvite: {
    color: 'gray',
    marginTop: 4,
  },
  btnChoice: {
    marginTop: 10,
    flexDirection: 'row',
  },
  itemBtnChoice: {
    marginRight: 10,
    paddingHorizontal: 30,
    paddingVertical: 6,
    backgroundColor: '#158dcf',
    borderRadius: 10,
  },
  textBtnChoice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});
