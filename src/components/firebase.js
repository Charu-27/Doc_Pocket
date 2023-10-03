import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; 
import "firebase/compat/firestore"
import "firebase/compat/storage"

const app=firebase.initializeApp( {
    apiKey: 'AIzaSyCLXFwIvoP52ryOro3zxwG8zq3FCDrrw4o',
    authDomain:'doc-pocket-e31d8.firebaseapp.com',
    projectId:'doc-pocket-e31d8',
    storageBucket:'doc-pocket-e31d8.appspot.com',
    messagingSenderId:'382937267910',
    appId:'1:382937267910:web:d684a3f7f60ea4d62b61c7',
    measurementId:'G-71BGNYVBM0'
  })
  
  const firestore=app.firestore()
  export const database={
    folders:firestore.collection('folders'),
    files :firestore.collection('files'),
    formatDoc:doc=>{
      return {id:doc.id, ...doc.data()}
    }, 
    getCurrentTimestamp :firebase.firestore.FieldValue.serverTimestamp
  }
export const storage = app.storage()
export const auth=app.auth()
export default app

