import React,{useContext,useState} from 'react';
import {StyleSheet, Text, View, Image,TouchableOpacity,Alert,ImageBackground,StatusBar,Pressable,ToastAndroid } from 'react-native';
import {Input, Button, SocialIcon} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
// import {useDispatch} from 'react-redux';
import imgBr from '../../assets/images/br.png';
// import {loginUser} from '../redux/actions/user'
import * as Animatable from 'react-native-animatable';
import auth from '@react-native-firebase/auth';

const  validateEmail =(email)=> {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
export default function SignIn({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessageEmail, setErrorMessageEmail] = useState('');
  const [errorMessagePassword, setErrorMessagePassword] = useState('');
//   const dispatch = useDispatch()
  const [secureTextEntry, setSecureTextEntry] = useState(true)
  const handleOnPressLogin =() =>{
        if(!validateEmail(email.trim()))
          setErrorMessageEmail('Email must be a valid email')
        if(password.trim().length<6)
          setErrorMessagePassword('Password must be at least 6 characters')
        if(validateEmail(email.trim()) && password.trim().length>=6)
          loginUser(email.trim(),password.trim());      
  }
  const loginUser =   async (email, password) => 
    {
          await auth()
            .signInWithEmailAndPassword(email, password)
            .then((res) => {
              ToastAndroid.show('Đăng nhập thành công!',ToastAndroid.SHORT);
            })
            .catch(error => {
              console.log(error.code);
              if(error.code==='auth/wrong-password')
                {
                  ToastAndroid.show('Đăng nhập thất bại! mật khẩu không đúng',ToastAndroid.SHORT);
                  setErrorMessagePassword('mật khẩu không đúng')
                }
              else if(error.code==='auth/network-request-failed')
                {
                  ToastAndroid.show('Đăng nhập thất bại! Kiểm tra kết nối Internet',ToastAndroid.SHORT);
                }
                else if(error.code==='auth/user-not-found')
                {
                  ToastAndroid.show('Đăng nhập thất bại! Tài khoản không tồn tại',ToastAndroid.SHORT);
                  setErrorMessageEmail('Tài khoản ko tồn tại')
                }
                else if(error.code==='auth/user-disabled')
                {
                  ToastAndroid.show('Đăng nhập thất bại! Tài khoản bạn đã bị khoá',ToastAndroid.SHORT);
                  setErrorMessageEmail('Tài khoản đã bị khoá')
                }
              else
                ToastAndroid.show('Đăng nhập thất bại! Lỗi không xác đinh thử lại sau..',ToastAndroid.SHORT);
            });     
    }

  return (
    <ImageBackground  style={styles.loginContainer} source={imgBr} resizeMode="cover">
      <StatusBar backgroundColor="transparent" barStyle="light-content" translucent={true} />
      <View style={{flex:3}}></View>
      <Animatable.View style={styles.main} animation="fadeInUp">   
        <View style={styles.title}>
          <Text style={styles.footerTitle}>Welcome AnimeShop</Text>
          <Text style={styles.footerTitle2}>Đăng nhập tài khoản</Text>
        </View>
        <View style={styles.action}>
          <Input
            value={email}
            label="Email"
            labelStyle={{fontWeight: '500', fontSize: 16}}
            placeholder="Nhập Email vào...."
            leftIcon={<Icon name="mail" size={20} color="gray" />}
            style={{
              fontSize: 16,
              borderWidth: 0,
              borderBottomColor: 'transparent',
            }}
            inputContainerStyle={{borderBottomWidth: 0.5}}
            errorStyle={{color: 'red', marginLeft: 0}}
            errorMessage={errorMessageEmail}
            onChangeText={(text) => {
              setEmail(text);
              setErrorMessageEmail('');
            }}
          />
          <Input
            value={password}
            label="Password"
            secureTextEntry={secureTextEntry}
            labelStyle={{fontWeight: '500', fontSize: 16}}
            placeholder="Nhập Password vào...."
            leftIcon={<Icon name="lock-closed" size={20} color="gray" />}
            rightIcon={<Pressable onPress={()=>setSecureTextEntry(!secureTextEntry)}>
                  <Icon name={secureTextEntry?"eye-off-outline":"eye-outline"} size={20} color="gray" />
                </Pressable>
              }
            style={{
              fontSize: 16,
              borderWidth: 0,
              borderBottomColor: 'transparent',
            }}
            // containerStyle={{backgroundColor:'red'}}
            inputContainerStyle={{borderBottomWidth: 0.5}}
            errorStyle={{color: 'red', marginLeft: 0}}
            errorMessage={errorMessagePassword}
            onChangeText={(text) => {
              setPassword(text);
              setErrorMessagePassword('');
            }}
          />
        </View>
        <Button
          title="Đăng nhập"
          titleStyle={{color:'#333'}}
          containerStyle={{borderRadius: 20,marginHorizontal:10,}}
          buttonStyle={{backgroundColor: '#5cfff2'}}
          ViewComponent={LinearGradient} 
          linearGradientProps={{
            start:{x: 0, y: 0},
            end:{x: 1, y: 0},
            colors:['#5cfff2', '#09d6c6']
          }}
          onPress={()=>{
            handleOnPressLogin();
            }}
        />
        <View style={styles.signup}>
            <Text style={{fontSize: 14}} >
                Bạn chưa có tài khoản?
            </Text>
            <TouchableOpacity 
              onPress={()=>navigation.navigate('SignUp')}
            >
                <Text style={styles.signupNow}>Đăng ký ngay</Text>
            </TouchableOpacity>
        </View>
      </Animatable.View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    
  },
  main: {
    flex: 5,
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius:40,
    borderTopRightRadius:40,
    elevation:1,
    justifyContent: 'space-between',
  },
  title:{
    marginTop:20,
  },
  footerTitle: {
    marginLeft:10,
    fontSize: 24,
    fontWeight: 'bold',
    // textAlign: 'center',
  },
  footerTitle2: {
    paddingVertical:10,
    marginLeft:10,
    color: 'gray',
    // textAlign: 'center',
  },
  action: {
    // marginTop: 40,
  },
  loginUsingMedia:{
    //   backgroundColor: 'red',
      flexDirection: 'row',
      justifyContent: 'center',
  },
  signup:{
      padding:10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
  },
  signupNow:{
      fontSize: 14, fontWeight: 'bold', color:'#1394f0',
       textDecorationLine: 'underline',
       paddingHorizontal: 10,
  }
});
