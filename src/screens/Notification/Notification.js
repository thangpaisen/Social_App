import React,{useState, useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Header from "./Header"
import ItemYourInvites from "./ItemYourInvites";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Nodata from "./../../components/Nodata";
import ItemUserFollower from "./ItemUserFollower";
const Notification = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        const sub = firestore().collection('users').doc(auth().currentUser.uid).collection('notifications')
        .orderBy('createdAt', 'desc').onSnapshot(querySnapshot => {
            setData(querySnapshot.docs.map(doc => ({id: doc.id,...doc.data()})))
            })
        return () => {
            sub()
        }
    }, [])
    return (
        <View style={styles.container}>
            <Header/>
            {data.length > 0 ?
            <View style={styles.content}>
                {data.map(item => 
                    {
                        if(item.type === 'inviteGroup'){
                            return <ItemYourInvites key={item.id} item={item}/>
                        }
                        else if(item.type === 'Follower'){
                            return <ItemUserFollower key={item.id} item={item}/>
                        }
                    })}
            </View>
            :<Nodata title={'Không có thông báo nào'}/>}
        </View>
    )
}

export default Notification

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
    },
    content:{
        marginTop: 10,
    }
    
})
