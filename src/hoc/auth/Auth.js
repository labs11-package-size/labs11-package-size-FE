import * as firebase from 'firebase';
import * as config from '../../firebase.config';
import { setNext } from '../../store/actions/userActions';

firebase.initializeApp(config);

export function requireAuth(store) {
	return function(nextState, replace) {
		if (firebase.auth().currentUser === null) {
			store.dispatch(setNext(nextState.location.pathname));
			replace({
				pathname: '/login',
			});
		}
	};
}
