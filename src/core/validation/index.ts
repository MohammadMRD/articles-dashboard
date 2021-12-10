import { object } from 'yup'
import to from 'await-to-js'
import type { AnyObject } from 'yup/lib/types'
import type { AssertsShape, ObjectShape, OptionalObjectSchema, TypeOfShape } from 'yup/lib/object'
export * from './schema'

// FIXME: Define correct types and remove `any` type
export type FormSchema = OptionalObjectSchema<any, AnyObject, TypeOfShape<any>>

export function createFormSchema(form: ObjectShape): FormSchema {
  return object(form)
}

function normalizeErrors(errors: any): ObjectShape {
  const formattedErrors: ObjectShape = {}

  errors.inner.forEach((error: any) => (formattedErrors[error.path] = error.message))

  return formattedErrors
}

export async function validateForm(schema: FormSchema, form: unknown): Promise<undefined | ObjectShape> {
  const [errors] = await to<unknown, AssertsShape<ObjectShape>>(schema.validate(form, { abortEarly: false }))

  if (!errors) return

  return normalizeErrors(errors)
}
