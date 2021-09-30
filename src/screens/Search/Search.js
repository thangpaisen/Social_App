import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Header from './Header';
import firestore from '@react-native-firebase/firestore';
import {Avatar} from 'react-native-elements';
import Loading from './../../components/Loading';
import {useNavigation} from '@react-navigation/native';

const Search = () => {
  const navigation = useNavigation();
  const [valueSearch, setValueSearch] = useState('');
  const [listUserSearch, setListUserSearch] = useState([]);
  const [showData, setShowData] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleOnSearch = value => {
    setShowData(true);
    setLoading(true);
    const sub = firestore()
      .collection('users')
      .onSnapshot(querySnapshot => {
        var listUser = [];
        querySnapshot.forEach(doc => {
          if (value.toUpperCase() === doc.data().email.toUpperCase())
            listUser.unshift()({...doc.data()});
          else if (value.toUpperCase() === doc.data().displayName.toUpperCase())
            listUser.unshift()({...doc.data()});
          else if (
            doc.data().displayName.toUpperCase().includes(value.toUpperCase())
          )
            listUser.push({...doc.data()});
        });
        setListUserSearch(listUser);
        setLoading(false);
      });
    return () => sub();
  };
  const handleOnHideData = value => {
    setShowData(false);
  };
  useEffect(() => {
  }, []);
  return (
    <View style={styles.container}>
      <Header
        handleOnSearch={handleOnSearch}
        handleOnHideData={handleOnHideData}
        valueSearch={valueSearch}
        setValueSearch={setValueSearch}
      />
      {showData ? (
        loading ? (
          <Loading />
        ) : listUserSearch.length === 0 ? (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{}}>Không tìm thấy người dùng nào họp lệ</Text>
          </View>
        ) : (
          listUserSearch.map(user => (
            <TouchableOpacity
              style={styles.itemUser}
              key={user.uid}
              onPress={() => {
                navigation.navigate('ProfileUser', {uidUser: user.uid});
              }}>
              <Avatar
                source={{
                  uri:
                    user.imageAvatar ||
                    'https://image.flaticon.com/icons/png/512/149/149071.png',
                }}
                size={45}
                rounded
                containerStyle={{}}
              />
              <View style={{marginLeft: 10}}>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                  {user.displayName}
                </Text>
                <Text style={{fontSize: 14}}>{user.email}</Text>
              </View>
            </TouchableOpacity>
          ))
        )
      ) : null}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  itemUser: {
    paddingHorizontal: 20,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
