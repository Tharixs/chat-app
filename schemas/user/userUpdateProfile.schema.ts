import * as yup from 'yup'
export const userUpdateProfileSchema: any = yup.object().shape({
    userName: yup.string().min(3, 'Name must be at least 3 characters'),
    imageUrl: yup.string().nullable(),
})
