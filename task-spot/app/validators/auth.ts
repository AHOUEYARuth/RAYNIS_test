/* eslint-disable prettier/prettier */
import vine from '@vinejs/vine'

export const RegisterValidator = vine.compile(
  vine.object({
    last_name: vine.string().trim().minLength(3),
    first_name: vine.string().trim().minLength(3),
    email: vine.string().email().unique({ table: 'users', column: 'email' }),
    password: vine.string().minLength(6),
  })
) 

export const LoginValidator = vine.compile(
  vine.object({
    email: vine.string().email().trim().toLowerCase(),
    password: vine.string().minLength(6),
  })
)

export const messageProviderAuth = {
  'last_name.required': 'Le nom  est obligatoire.',
  'last_name.minLength': 'Le nom doit contenir au moins 3 caractères.',

  'first_name.required': 'Le prénom est obligatoire.',
  'first_name.minLength': 'Le prénom doit contenir au moins 3 caractères.',

  'email.required': "L'adresse e-mail est obligatoire.",
  'email.email': "L'adresse e-mail doit être valide.",
  'email.database.unique': 'Cette adresse e-mail est déjà utilisée.',

  'password.required': 'Le mot de passe est obligatoire.',
  'password.minLength': 'Le mot de passe doit contenir au moins 6 caractères.',
}