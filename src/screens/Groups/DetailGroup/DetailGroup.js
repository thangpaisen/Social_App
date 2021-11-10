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
  ScrollView
} from 'react-native';
import Header from './Header';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons';
import ItemMember from "./ItemMember";
import { Avatar } from "react-native-elements";
import ItemPost from "./ItemPost";
import { useNavigation } from "@react-navigation/native";
const DetailGroup = ({route}) => {
  const {id} = route.params;
  const navigation = useNavigation();useNavigation
  const groupRef = firestore().collection('groups').doc(id);
  const [dataGroup, setDataGroup] = useState({});
  const [postsGroup, setPostsGroup] = useState([]);
  const [user, setUser] = useState({});
  useEffect(() => {
    const sub = groupRef.onSnapshot(doc => {
      setDataGroup({...doc.data(),id: doc.id});
    });
    const sub2 = firestore().collection('users').doc(auth().currentUser.uid).onSnapshot(doc => {
        setUser(doc.data());
    });
    const sub3 = groupRef.collection('posts').orderBy('createdAt', 'desc').onSnapshot(doc => {
        setPostsGroup(doc.docs.map(item => {
            return {
                ...item.data(),
                id: item.id
            }
        }));
    });
    return () => {
      sub();
      sub2();
      sub3();
    };
  }, []);
  return (
    <View style={styles.container}>
      <Header data={dataGroup} />
      <ScrollView style={styles.content}>
        <Image
          source={{
            uri:
              dataGroup?.imageCover ||
              'https://images6.alphacoders.com/740/thumb-1920-740310.jpg',
          }}
          style={styles.image}
        />
        <TouchableOpacity style={styles.info}
            onPress={() => navigation.navigate('DescGroup', {dataGroup:dataGroup})}
        >
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
        <View style={styles.members}>
            {dataGroup?.members?.map((item, index) => {
                return (
                    <ItemMember key={index} data={item} index={index} />
                )
            })}
            <TouchableOpacity style={styles.addMember}>
                <Icon name="add-outline" size={20} color="#fff" />
                <Text style={styles.textAddMember}>Mời</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.announced}>
            <Icon name="bookmark-outline" size={20} color="gray" />
            <Text style={styles.titleAnnounced}>Thông báo</Text>
        </View>
        {/* bulkhead */}
        <View style={styles.bulkhead}>
        </View>
         {/* upPost */}
        <Pressable
          style={styles.upPost}
          onPress={() => navigation.navigate('UploadPost',{ref:groupRef.collection('posts')})}>
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
        {postsGroup.map(item => (
              <ItemPost item={item} key={item.id} id={id}/>
            ))}
      </ScrollView>
    </View>
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
    members:{
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addMember:{
        marginLeft: 4,
        flexDirection: 'row',
        alignItems: 'center',
        padding:4,
        paddingHorizontal:8,
        borderRadius:10,
        backgroundColor: '#00a1f2'
    },
    textAddMember:{
        fontSize: 18,
        color: 'white',
    },
announced:{
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding:10,
    borderTopWidth: 0.3,
    borderTopColor: '#d1d1d1',
},
titleAnnounced: {
    fontSize: 18,
    color: 'gray',
    marginLeft: 10,
},
bulkhead:{
    marginVertical:10,
    paddingVertical:3,
    backgroundColor: '#e3e3e3'
},
upPost: {
    // marginTop: 10,
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
});
