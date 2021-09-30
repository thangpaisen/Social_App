import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Avatar, Badge} from 'react-native-elements';
const Chat = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textHeader}>Tin nhắn</Text>
        <TouchableOpacity>
          <Icon name="search" size={30} color={'black'} />
        </TouchableOpacity>
      </View>
      <View style={styles.listFriendOnLine}>
        <FlatList
          horizontal
          data={[1, 2, 3, 4, 5]}
          renderItem={(item, index) => (
            <TouchableOpacity style={styles.itemFriendOnLine}>
              <View>
                <Avatar
                  source={{
                    uri: 'https://image.flaticon.com/icons/png/512/149/149071.png',
                  }}
                  size={50}
                  rounded
                />
                <Badge
                  status="success"
                  containerStyle={{position: 'absolute', bottom: 4, right: 4}}
                />
              </View>
              <Text style={styles.nameItemFriendOnLine} numberOfLines={2}>
                Nguyễn Hữu Thắng
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item}
        />
      </View>
      <View
        style={{
          height: 4,
          backgroundColor: '#ededed',
          marginVertical: 10,
        }}></View>
      <View style={styles.listMessage}>
        <FlatList
          data={[1, 2, 3, 4, 5]}
          renderItem={(item, index) => (
            <TouchableOpacity style={styles.itemMessage}>
              <Avatar
                source={{
                  uri: 'https://image.flaticon.com/icons/png/512/149/149071.png',
                }}
                size={50}
                rounded
              />
              <View style={{paddingLeft: 10}}>
                <Text style={styles.nameFriendMessage}>Nguyễn Hữu Thắng</Text>
                <Text style={styles.lastMessage}>Bạn: Hello world!</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item}
        />
      </View>
    </View>
  );
};

export default Chat;
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textHeader: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  listFriendOnLine: {
    marginTop: 10,
    flexDirection: 'row',
  },
  itemFriendOnLine: {
    width: width / 5,
    alignItems: 'center',
    marginLeft: 10,
  },
  nameItemFriendOnLine: {
    marginTop: 2,
    fontSize: 12,
    textAlign: 'center',
  },
  listMessage: {},
  itemMessage: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  nameFriendMessage: {
    fontSize: 16,
    color: '#000',
  },
  lastMessage: {
    marginTop: 4,
    color: 'gray',
  },
});
