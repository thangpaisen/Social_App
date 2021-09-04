import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Pressable,
  TextInput,
} from 'react-native';
import Header from './Header';
import {Avatar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import {Input} from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
const UpdateProfileUser = () => {
  const [text, setTextName] = useState('');
  const [profileUser, setProfileUser] = useState({
      displayName:'',
      description:'',
      imageAvatar: '',
      imageCover:'',
  });
  const [user, setUser] = useState({})
  console.log('user',user)
  console.log('profileUser' ,profileUser)
  useEffect(() => {
        const uidUserNow =auth().currentUser.uid
      firestore().collection('users').get()
      .then(querySnapshot => {
      var user = {};
      querySnapshot.forEach(doc => {
          if(doc.data().uid === uidUserNow)
                user= {...doc.data()}
      });
      setUser(user);
      setProfileUser({
          displayName:user.displayName,
      description:user.description,
      imageAvatar: user.imageAvatar,
      imageCover:user.imageCover,
      })
    });
  }, []);
  const handleOnSave=()=>{
      console.log('aa',profileUser)
  }
  const [description, setTextDes] = useState('');
  return (
    <View style={styles.container}>
      <Header handleOnSave={handleOnSave}/>
      <Pressable>
        <ImageBackground
          source={{
            uri: profileUser.imageCover ||
            'https://image.flaticon.com/icons/png/512/149/149071.png',
          }}
          style={styles.imageCover}>
          <Icon name="camera-outline" size={30} color={'#fff'} />
        </ImageBackground>
      </Pressable>
      <Pressable>
        <ImageBackground
          style={styles.editAvatar}
          imageStyle={{borderRadius: 35}}
          source={{
            uri: profileUser.imageAvatar ||
            'https://image.flaticon.com/icons/png/512/149/149071.png',
          }}
          >
          <Icon name="camera-outline" size={30} color={'#fff'} />
        </ImageBackground>
      </Pressable>
      <View style={{marginHorizontal: 20, marginTop: 20}}>
        <Text style={{fontSize: 18}}>Tên</Text>
        <TextInput
          style={styles.input}
          onChangeText={text =>setProfileUser({
              ...profileUser,
              displayName:text,
          })}
          value={profileUser.displayName}
          placeholder="Tên không được để trống"
          maxLength={50}
        />
      </View>
      <View style={{marginHorizontal: 20}}>
        <Text style={{fontSize: 18, marginTop: 20}}>Mô tả</Text>
        <TextInput
          style={styles.input}
          onChangeText={text =>setProfileUser({
              ...profileUser,
              description:text
          })}
          value={profileUser.description}
          placeholder="Mô tả"
          multiline
          maxLength={255}
        />
      </View>
    </View>
  );
};

export default UpdateProfileUser;
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageCover: {
    width: width,
    height: height / 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  //   onImageButton: {
  //     position: 'absolute',
  //   },
  editAvatar: {
    marginTop: -35,
    marginLeft: 20,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageAvatar: {
    width: 70,
    borderRadius: 70,
    height: 70,
  },
  input: {
    fontSize: 16,
    borderBottomWidth: 0.4,
    borderBottomColor: '#333',
  },
});
