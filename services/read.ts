import db from './firebase'
import { FormType } from '../types/FormType'
import { Console } from "console";
import { collection, getDocs } from "firebase/firestore"; 

export default async function read() {
    try {
        const querySnapshot = await getDocs(collection(db, "forms"));
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
        });
    } catch (e) {
        return 'error'
    }
    return 'successfull'
}