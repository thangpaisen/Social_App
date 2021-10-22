import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Modal,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Button} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
const CreateGroup = () => {
    const navigation = useNavigation();
  const [dataGroup, setDataGroup] = useState({
    name: '',
    description: '',
  });
  const [disabledButton, setDisabledButton] = useState(true);
  const [loadingCreateGroup, setLoadingCreateGroup] = useState(false);
  const handleCreateGroup =()=>{
    setLoadingCreateGroup(true);
    setTimeout(() => {
        setLoadingCreateGroup(false);
        navigation.navigate('Groups');
    }, 2000);
    }
  return (
      <>
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}
            onPress={() => {
                navigation.goBack();
            }}
        >
          <Icon name="close" size={30} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Create Group</Text>
        <Icon name="close" size={30} color="transparent" />
      </View>
      <View style={styles.body}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Group Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => {
              setDataGroup({...dataGroup, name: text});
              if (dataGroup.description.length > 0 && text.trim().length > 0)
                setDisabledButton(false);
              else setDisabledButton(true);
            }}
            value={dataGroup.name}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Group Description</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => {
              setDataGroup({...dataGroup, description: text});
              if (text.trim().length > 0 && dataGroup.name.length > 0)
                setDisabledButton(false);
              else setDisabledButton(true);
            }}
            value={dataGroup.description}
          />
        </View>
      </View>
      <Button
        buttonStyle={styles.buttonCreate}
        titleStyle={styles.buttonCreateTitle}
        disabled={disabledButton}
        onPress={() => handleCreateGroup()}
        title={'Tạo'}
      />
    </View>
    <Modal
        animationType="slide"
        transparent={true}
        visible={loadingCreateGroup}
      >
        <View style={styles.model}>
                <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </Modal>
    </>
  );
};

export default CreateGroup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  body: {
    flex: 1,
    marginTop: 10,
  },
  inputContainer: {
    padding: 10,
  },
  inputText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
    fontSize: 16,
  },
  buttonCreate: {
    marginHorizontal: 10,
    marginVertical: 20,
    borderRadius: 10,
    backgroundColor: '#09bff2',
  },
  buttonCreateTitle: {
    fontSize: 16,
  },
  model:{
      flex: 1,
      backgroundColor: 'white',
      opacity: 0.4,
      justifyContent:'center',
      alignItems: 'center',
  }
});
