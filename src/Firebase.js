import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyBeBgbdqwgluBVeeEepiDnde-BAR6HISAw",
  authDomain: "very-important-cat.firebaseapp.com",
  databaseURL: "https://very-important-cat.firebaseio.com",
  projectId: "very-important-cat",
  storageBucket: "very-important-cat.appspot.com",
  messagingSenderId: "438601019743",
  appId: "1:438601019743:web:3649bd3d31c3aa150046ea"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
