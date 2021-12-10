import * as yup from 'yup'

export const usernameSchema = yup.string().label('Username').required()
export const passwordSchema = yup.string().label('Password').required()
export const emailSchema = yup.string().label('Email').email().required()
export const articleTitleSchema = yup.string().label('Title').required()
export const articleDescriptionSchema = yup.string().label('Description').required()
export const articleBodySchema = yup.string().label('Body').required()
export const tagSchema = yup.string()
export const tagsSchema = yup.array().of(tagSchema)
