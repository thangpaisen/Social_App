import React,{useState, useEffect} from 'react'
import { StyleSheet, Text, View ,Image,TouchableOpacity } from 'react-native'

import firestore from "@react-native-firebase/firestore";
const ItemUserInvite = ({data}) => {
    const [user, setUser] = useState({})
    useEffect(() => {
        firestore().collection('users').doc(data).get().then(doc => {
            setUser({...doc.data(),id: doc.id})
        })
    }, [])
    return (
        <View style={styles.container}>
            <Image source={{uri: user.imageAvatar}} style={styles.avatar}/>
            <Text style={styles.name} numberOfLines={1}>{user.displayName}</Text>
            <TouchableOpacity style={styles.btnAdd}>
                <Text style={styles.textAdd}>Mời</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ItemUserInvite

const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 20,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar:{
        width: 44,
        height: 44,
        borderRadius:46,
    },
    name:{
        flex:1,
        fontSize: 18,
        paddingHorizontal: 10,
        fontWeight: 'bold',
        color: 'black',
    },
btnAdd:{
    backgroundColor: '#158dcf',
    borderRadius:10,
    padding:6,
    paddingHorizontal:12,
},
textAdd:{
    fontSize:16,
    fontWeight: 'bold',
    color: '#fff'
}
})
