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
import {useNavigation} from '@react-navigation/native';
import { timeSince } from "./../../utils/fomattime";
const ItemUserFollower = ({item}) => {
  const [user, setUser] = React.useState({});
  const navigation = useNavigation();

  useEffect(() => {
    firestore()
      .collection('users')
      .doc(item?.idUserFollow)
      .get()
      .then(doc => {
        setUser(doc.data());
      });
  }, []);
  const handleOnWatch =()=>{  
      navigation.navigate('ProfileUser', {
                    uidUser: item?.idUserFollow,
                  });
    firestore().collection('users').doc(auth().currentUser.uid).collection('notifications')
        .doc(item.id).update({
            watched: true
        })
  }
  return (
    <TouchableOpacity style={[styles.itemUserFollow,!item.watched?styles.unread:null]}
        onPress={() => {
            handleOnWatch();
        }}
    >
      <View style={styles.body}>
        <View style={{alignSelf: 'flex-start'}}>
          <Image
            source={{
              uri:
                user?.imageAvatar ||
                'https://image.flaticon.com/icons/png/512/149/149071.png',
            }}
            style={styles.imageAvatar}
          />
          <View style={{position: 'absolute', bottom: 0, right: -4}}>
            <Icon2 name="user" size={24} color={'gray'} />
          </View>
        </View>
        <View style={styles.content}>
            <Text style={styles.title}>
                {user?.displayName || 'Ai đó '}
                <Text style={{fontWeight: '600', color: 'gray'}}>
                    {' '}đã theo đõi bạn{' '}
                </Text>
            </Text>
            <Text style={styles.time}>{timeSince(item?.createdAt)}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.btnChoice}
        >
        <Icon name="ellipsis-horizontal" size={24} color={'black'} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default ItemUserFollower;
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  itemUserFollow: {
    // marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  unread: {
    backgroundColor: '#e7f3ff',
  },
  imageAvatar: {
    width: 60,
    height: 60,
    borderRadius: 60,
  },
  body: {
      flex: 1,
    flexDirection: 'row',
    // alignItems: 'center',
  },
  content: {
    flex: 1,
    marginLeft:10,
    justifyContent: 'center',
    // backgroundColor: 'red'
  },
  title: {
    fontSize: 16,
    lineHeight: 20,
    paddingRight: 10,
    fontWeight: 'bold',
  },
  time:{
    color: 'gray'
  }
});
