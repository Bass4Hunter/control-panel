import { collection, addDoc } from "firebase/firestore";
import db from './firebase'
import { FormType } from '../types/FormType'
import { Console } from "console";

export default function create(obj: FormType) {
    try {
        const res = addDoc(collection(db, "forms"), obj).then(res => {
        });
    } catch (e) {
        return 'error'
    }
    return 'successfull'
}