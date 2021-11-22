import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import {Avatar} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
const ItemDataMember = ({data}) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
              style={styles.itemUser}
              onPress={() => {
                navigation.navigate('ProfileUser', {uidUser: data.uid});
              }}>
              <Avatar
                source={{
                  uri:
                    data.imageAvatar||
                    'https://image.flaticon.com/icons/png/512/149/149071.png',
                }}
                size={45}
                rounded
                containerStyle={{}}
              />
              <View style={{marginLeft: 10}} >
                <Text style={{fontSize: 16, fontWeight: 'bold'}} numberOfLines={1}>
                  {data.displayName || 'Người dùng ... '}
                </Text>
                <Text style={{fontSize: 14}} numberOfLines={1}>{data.email}</Text>
              </View>
            </TouchableOpacity>
    )
}

export default ItemDataMember

const styles = StyleSheet.create({
    itemUser: {
    paddingHorizontal: 20,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  }, 
})
