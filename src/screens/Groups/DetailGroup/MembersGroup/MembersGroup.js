import React,{useState, useEffect} from 'react'
import { StyleSheet, Text, View,TouchableOpacity} from 'react-native'
import Colors from "./../../../../assets/themes/Colors";
import Header from "./Header";
import Search from "./Search";
import firestore from '@react-native-firebase/firestore';
import Loading from "./../../../../components/Loading";
import {useNavigation} from '@react-navigation/native';
import {Avatar} from 'react-native-elements';
import Nodata from "./../../../../components/Nodata";
import ItemUser from "./ItemUser";
import Body from "./Body";
const MembersGroup = ({route}) => {
    const {dataGroup} = route.params;
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false)
    const [showData, setShowData] = useState(false);
    const [listDataSearch, setListDataSearch] = useState([]); 
  const handleOnSearch = value => {
    setShowData(true);
    setLoading(true);
    firestore()
      .collection('users').get()
      .then(querySnapshot => {
        var listUser = [];
        querySnapshot.forEach(doc => {
          if (value.toUpperCase() === doc.data().email.toUpperCase())
            listUser.unshift({...doc.data(),id:doc.id});
          else if (
            doc.data().displayName.toUpperCase().includes(value.toUpperCase())
          )
            listUser.push({...doc.data(),id:doc.id});
        });
        setListDataSearch(listUser);
        setLoading(false);
      });
  };
  const handleOnHideData = value => {
    setShowData(false);
  };
    return (
        <View style={styles.container}>
            <Header/>
            <Search
                handleOnSearch={handleOnSearch}
                handleOnHideData={handleOnHideData}
            />
            <View style={styles.content}>
            {showData ? (
        loading ? (
          <Loading />
        ) : listDataSearch.length === 0 ? (
          <Nodata/>
        ) : (
          listDataSearch.map(data => (
            <ItemUser key={data.id} data={data}/>
          ))
        )
      ) : <Body idGroup={dataGroup.id}/>}
            </View>
        </View>
    )
}

export default MembersGroup

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:Colors.background,
    },
    content: {
        flex:1,
    },
})
