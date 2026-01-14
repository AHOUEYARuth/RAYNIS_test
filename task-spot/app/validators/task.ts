/* eslint-disable prettier/prettier */
import vine from '@vinejs/vine'

export const CreateTaskValidator = vine.compile(
    vine.object({
        title: vine.string().trim().minLength(3),
        description: vine.string().trim().minLength(10),
        longitude: vine.number(),
        latitude: vine.number(),
    })
)

export const UpdateTaskValidator = vine.compile(
    vine.object({
        title: vine.string().trim().minLength(3).optional(),
        description: vine.string().trim().minLength(10).optional(),
        status: vine.string().trim().optional(),
        longitude: vine.number().optional(),
        latitude: vine.number().optional(),
    })
)

export const messageProviderTask = {
    'title.required': 'Le titre est obligatoire.',
    'title.minLength': 'Le titre doit contenir au moins 3 caractères.',

    'description.required': 'La description est obligatoire.',
    'description.minLength': 'La description doit contenir au moins 10 caractères.',

    'longitude.required': 'La longitude est obligatoire.',
    'longitude.number': 'La longitude doit être un nombre.',

    'latitude.required': 'La latitude est obligatoire.',
    'latitude.number': 'La latitude doit être un nombre.',
}