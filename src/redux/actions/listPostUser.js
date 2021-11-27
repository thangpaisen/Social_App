import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const setListPostUser = data => {
  return {
    type: 'SET_LiST_POST_USER',
    payload: data,
  };
};
export const getListPostUser = () => dispatch => {
    //  firestore().collection('postsUser').orderBy('createdAt', 'desc').get()
    //   .then(querySnapshot => {
    //   const listPostUser = [];
    //   querySnapshot.forEach(doc => {
    //       if(doc.data().uidUser === auth().currentUser.uid)
    //         listPostUser.push({
    //         id: doc.id,
    //         ...doc.data(),
    //         });
    //   });
    //   dispatch(setListPostUser(listPostUser))
    // });
}