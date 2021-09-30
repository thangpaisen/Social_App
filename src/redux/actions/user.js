import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const setUser = data => {
  return {
    type: 'SET_USER',
    payload: data,
  };
};
export const getUser = () => dispatch => {
        firestore().collection('users')
      .onSnapshot(querySnapshot => {
      var user = {};
      querySnapshot?.forEach(doc => {
          if(doc.data().uid === auth().currentUser.uid)
                 user= {...doc.data(),idDocFb:doc.id}
      });
      dispatch(setUser(user))
    });
}
// export const updateUser = (data) => dispatch => {
//       const subscriber = firestore().collection('users')
//       .onSnapshot(querySnapshot => {
//       var user = {};
//       querySnapshot.forEach(doc => {
//           if(doc.data().uid === auth().currentUser.uid)
//                 user= {...doc.data(),idDocFb:doc.id}
//       });
//       dispatch(setUser(user))
//       return ()=>subscriber()
//     });
// }

