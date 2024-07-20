import * as yup from 'yup'
export const signInSchema: any = yup.object().shape({
    email: yup.string().required('Email is required !').email(),
    password: yup.string().required('Password is required !').min(6),
})
