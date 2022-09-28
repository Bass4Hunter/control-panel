import { FormType } from '../types/FormType'

export default function checkForm(obj: FormType) {
    const validString: RegExp = /^\S+(?: \S+)*$/
    for (const [key, value] of Object.entries(obj)) {
        if (!validString.test(value)! && key != 'autoResponse')
            return { error: true, msg: 'Error en ' + key }
    }

    return { error: false, msg: '' }
}
