import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Nodata = ({title}) => {
    return (
        <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{}}>{ title || 'Không có dữ liệu'}</Text>
          </View>
    )
}

export default Nodata

const styles = StyleSheet.create({})
