import React from 'react'
import { View, Text ,Pressable,StyleSheet} from 'react-native'
import {Avatar} from 'react-native-elements';
import { useNavigation } from "@react-navigation/native";

const Header = () => {
    const navigation= useNavigation();
    return (
        <View style={styles.header}>
        <View style={styles.logo}>
          <Text style={styles.textLogo}>Animee</Text>
        </View>
        <Pressable style={styles.avatar} onPress={() =>navigation.navigate('Settings')}>
          <Avatar
            size={32}
            rounded
            source={{
              uri: 'https://i.pinimg.com/564x/e1/55/94/e15594a1ebed28e40a7836dd7927b150.jpg',
            }}
          />
        </Pressable>
      </View>
    )
}

export default Header
const styles = StyleSheet.create({
 header: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.3,
    borderBottomColor: '#d1d1d1',
    backgroundColor: 'white'
  },

  textLogo: {
    fontSize: 20,
    fontWeight: 'bold',
  }
})
