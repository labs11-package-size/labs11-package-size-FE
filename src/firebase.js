import * as firebase from 'firebase';

const config = {
	apiKey: 'AIzaSyCcW1hsaVQvhRe8ls0obrM7ZzN9XHCC86E',
	authDomain: 'labs11-package-size.firebaseapp.com',
	databaseURL: 'https://labs11-package-size.firebaseio.com',
	projectId: 'labs11-package-size',
	storageBucket: 'labs11-package-size.appspot.com',
	messagingSenderId: '863437608493',
};
firebase.initializeApp(config);

const googleAuth = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuth };
