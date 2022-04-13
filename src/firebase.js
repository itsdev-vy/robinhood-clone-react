import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCCs0HFGs_MvuP024HJdUi0fkiObBLf5eA",
    authDomain: "robinhood-a6cfe.firebaseapp.com",
    projectId: "robinhood-a6cfe",
    storageBucket: "robinhood-a6cfe.appspot.com",
    messagingSenderId: "927044300784",
    appId: "1:927044300784:web:55675daf374e02a2dbb735"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export { db };