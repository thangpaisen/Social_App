import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from "@react-navigation/native";

const Header = ({data}) => {
    const navigation = useNavigation();
    console.log('data',data)
    return (
        <View style={styles.header}>
        <TouchableOpacity
            onPress={() => navigation.goBack()}
        >
            <Icon name="chevron-back" size={30} color={'black'} />
        </TouchableOpacity>
        <Text style={styles.nameGroup} numberOfLines={1}>{data?.name}</Text>
        <TouchableOpacity>
            <Icon name="ellipsis-horizontal-circle-outline" size={30} color={'black'} />
          </TouchableOpacity>
      </View>
    )
}

export default Header

const styles = StyleSheet.create({
    header: {
    position: 'absolute',
    zIndex: 99999,
    top: 0,
    left: 0,
    right: 0,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  nameGroup: {
    flex:1,
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    paddingHorizontal:10,
    // color: 'transparent',
  },
})
