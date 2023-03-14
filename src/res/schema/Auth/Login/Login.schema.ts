import {object, string} from 'yup'

export default ()=> object({
    username: string().required(),
    password: string().required()
})