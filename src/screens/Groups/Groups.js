import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ItemPost from './ItemPost';
import Header from "./Header";
import { useNavigation } from "@react-navigation/native";
const Groups = () => {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Header/>
      <ScrollView>
        <View style={{marginVertical: 10}}>
          <FlatList
            data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            horizontal
            renderItem={({item}) => (
              <View style={styles.itemGroup}>
                <Image
                  source={{
                    uri: 'https://images6.alphacoders.com/102/1029037.jpg',
                  }}
                  style={styles.imgGroup}
                />
                <Text style={styles.nameGroup} numberOfLines={2}>
                  Anime - Trai tim cua toi
                </Text>
              </View>
            )}
            keyExtractor={index => index.toString()}
          />
        </View>
        <ItemPost />
        <ItemPost />
      </ScrollView>
    </View>
  );
};

export default Groups;

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  itemGroup: {
    width: width / 4,
    marginLeft: 10,
  },
  imgGroup: {
    width: width / 4,
    height: width / 4,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  nameGroup: {
    padding: 4,
    fontSize: 14,
  },
});
