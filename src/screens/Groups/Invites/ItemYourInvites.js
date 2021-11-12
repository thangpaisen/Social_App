import React,{useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Pressable,
} from 'react-native';
import Colors from "./../../../assets/themes/Colors";
const ItemYourInvites = ({item}) => {
    const [group, setGroup] = useState({});

  return (
    <View style={styles.itemYourInvites}>
      <View style={styles.group}>
        <Image
          source={{
            uri:
              item?.imageCover ||
              'https://images6.alphacoders.com/102/1029037.jpg',
          }}
          style={styles.imageCover}
        />
        <View style={{
            paddingHorizontal: 10,
            flex: 1,
        }}>
        <View style={styles.descriptionGroup}>
          <Text style={styles.nameGroup}>{group?.name || 'Nhóm nào đó'}</Text>
          <Text style={styles.nameUserInvite}>{item?.UserInvite?.name || 'Ai đó'} đã mời bạn tham gia</Text>
        </View>
        <View style={styles.btnChoice}>
          <Pressable style={styles.itemBtnChoice}>
            <Text style={styles.textBtnChoice}>Tham gia nhóm</Text>
          </Pressable>
          <Pressable style={[styles.itemBtnChoice,{backgroundColor:Colors.border}]}>
            <Text style={[styles.textBtnChoice,{color:'black'},]}>Xoá lời mời</Text>
          </Pressable>
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
    marginTop: 20,
  },
  imageCover: {
    width: 45,
    height: 45,
    borderRadius: 10,
  },
  group:{
      flexDirection: 'row',
  },
  descriptionGroup:{

  },
  nameGroup:{
      fontSize:16,
      fontWeight: 'bold',
  },
  nameUserInvite:{
      color:'gray',
      marginTop:4
  },
  btnChoice:{
      marginTop:10,
      flexDirection: 'row',
  },
  itemBtnChoice:{
      marginRight:10,
      paddingHorizontal:20,
      paddingVertical:6,
      backgroundColor:'#158dcf',
      borderRadius:10,
  },
  textBtnChoice:{
      fontSize:14,
      fontWeight: 'bold',
      color: 'white'
  }
});
