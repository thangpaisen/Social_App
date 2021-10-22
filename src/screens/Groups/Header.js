import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from "@react-navigation/native";

const Header = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.header}>
        <Text style={styles.textHeader}>Nhóm</Text>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <TouchableOpacity style={{marginRight: 10}}
            onPress={() => navigation.navigate('StackGroups',{ screen: 'CreateGroup' })}
            >
            <Icon name="add-circle-outline" size={30} color={'black'} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="search" size={30} color={'black'} />
          </TouchableOpacity>
        </View>
      </View>
    )
}

export default Header

const styles = StyleSheet.create({
    header: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textHeader: {
    fontSize: 24,
    fontWeight: 'bold',
  },
})
