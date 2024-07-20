import * as yup from 'yup'
export const signUpSchema: any = yup.object().shape({
    email: yup.string().required('Email is required !').email(),
    password: yup.string().required('Password is required !').min(6),
    userName: yup.string().required('Username is required !'),
    imageUrl: yup.string(),
})
