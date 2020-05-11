var firebase = require('firebase/app');
require('firebase/functions');

const firebaseConfig = {
    apiKey: "AIzaSyDVHYIVQRZTohEZ5qZoO-MIkLa8yUGae_E",
    authDomain: "ainize-link-shortener.firebaseapp.com",
    databaseURL: "https://ainize-link-shortener.firebaseio.com",
    projectId: "ainize-link-shortener",
    storageBucket: "ainize-link-shortener.appspot.com",
    messagingSenderId: "78514503158",
    appId: "1:78514503158:web:c51098d96d6ca48c595bd7",
    measurementId: "G-6XG6M5DN6S"
};

firebase.initializeApp(firebaseConfig);

export default firebase;