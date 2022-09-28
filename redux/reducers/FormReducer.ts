import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { FormType, voidForm } from '../../types/FormType'
import create from "../../services/create"
import checkForm from '../../services/verifier'

const form = createSlice({
    name: 'form',
    initialState: { value: voidForm, status: 'undefined', msg: '' },
    reducers: {
        Post: (state, action: PayloadAction<FormType>) => {
            state.value = action.payload
            const checked = checkForm(action.payload)
            if (!checked.error) {
                state.status = create(action.payload)
            } else {
                state.status = 'error'
                state.msg = checked.msg
            }
        },
    }
})

export const { Post } = form.actions

export default form.reducer