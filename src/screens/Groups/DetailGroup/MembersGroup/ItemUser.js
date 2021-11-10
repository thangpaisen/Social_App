import React,{useState, useEffect} from 'react'
import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import { useNavigation } from "@react-navigation/native";
import {Avatar} from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
const ItemUser = ({data}) => {
    const navigation = useNavigation();
    const [user,setUser] =useState('')
    
    useEffect(() => {
        const idUser =data?.id
        const sub = firestore().collection('users').doc(idUser).onSnapshot(doc=> {
            setUser({...doc.data()})
        })
        return () => sub()
    }, [])
    return (
        <TouchableOpacity
              style={styles.itemUser}
              onPress={() => {
                navigation.navigate('ProfileUser', {uidUser: user?.uid});
              }}>
              <Avatar
                source={{
                  uri:
                    user?.imageAvatar ||
                    'https://image.flaticon.com/icons/png/512/149/149071.png',
                }}
                size={45}
                rounded
                containerStyle={{}}
              />
              <View style={{marginLeft: 10}}>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                  {user?.displayName }
                </Text>
                <Text style={{fontSize: 14}}>{user?.email}</Text>
              </View>
            </TouchableOpacity>
    )
}

export default ItemUser

const styles = StyleSheet.create({
    itemUser: {
        paddingHorizontal: 20,
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },  
})
