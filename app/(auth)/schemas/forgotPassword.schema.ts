import * as yup from 'yup'
export const forgotPasswordSchema: any = yup.object().shape({
    email: yup.string().required('Email is required !').email(),
})
