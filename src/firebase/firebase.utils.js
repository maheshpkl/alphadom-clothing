import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyDowXR6HMbTkDAs0wfFqqoKPiSrc_fJCsM',
  authDomain: 'alphadom-db.firebaseapp.com',
  projectId: 'alphadom-db',
  storageBucket: 'alphadom-db.appspot.com',
  messagingSenderId: '21943602271',
  appId: '1:21943602271:web:eff5aca8e70906fbfedfea'
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRaf = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRaf.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRaf.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('Error creating user', error.message);
    }
  }
  return userRaf;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
