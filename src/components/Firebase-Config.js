import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyBVYMYEPiNgEab0WMpHbqvyVL7oihTBdhA",
    authDomain: "bejamas-recruitment.firebaseapp.com",
    projectId: "bejamas-recruitment",
    storageBucket: "bejamas-recruitment.appspot.com",
    messagingSenderId: "350460122666",
    appId: "1:350460122666:web:721afbc0e8bfe3d0921553",
    measurementId: "G-BE0JL4171F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
//#endregion
const colRef = collection(db, "products");
//#endregion
//#endregion
export const getAll = async () => {
    const snapshot = await getDocs(colRef);
    return snapshot.docs.map((doc) => {
        return {
            id: doc.id, // append document id to each document
            ...doc.data(),
        };
    });
};
