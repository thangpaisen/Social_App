import React,{useState, useEffect} from 'react'
import { StyleSheet, Text, View,Modal,ActivityIndicator,Dimensions,Image} from 'react-native'
import Header from "./Header";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
const DetailGroup = ({route}) => {
    const {id} = route.params;
    const groupRef = firestore().collection('groups').doc(id)
    const [dataGroup, setDataGroup] = useState({})
    useEffect(() => {
        const sub = groupRef.onSnapshot((doc) => {
            setDataGroup(doc.data())
        })
        return () => {
            sub()
        }
    }, [])
    console.log('dataGroup',dataGroup)
    console.log('id',id)
    return (
        <View style={styles.container}>
            <Header data={dataGroup}/>
            <View style={styles.content}>
                <Image source={{uri:dataGroup?.imageCover || 'https://images6.alphacoders.com/740/thumb-1920-740310.jpg'}} style={styles.image}/>
            </View>
        </View>
    )
}

export default DetailGroup

const {width, height} = Dimensions.get('window'); 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content:{
        flex: 1,
        // backgroundColor: 'red',
    },
     image: {
        width: width,
        height: 200,
        resizeMode: 'cover',
    },
})
