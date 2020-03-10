import * as firebase from "firebase";
import "firebase/firestore";

import config from "../env";

firebase.initializeApp(config);

export default firebase;
