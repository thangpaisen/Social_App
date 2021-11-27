import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Header from "./Header"
const UsersManagement = () => {
    return (
        <View style={styles.container}>
            <Header title={'Quản lý người dùng'}/>
        </View>
    )
}

export default UsersManagement

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
})
