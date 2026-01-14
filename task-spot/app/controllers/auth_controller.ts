/* eslint-disable prettier/prettier */
import type { HttpContext } from '@adonisjs/core/http'

import { AuthService } from '#services/auth_service'
import { LoginValidator, messageProviderAuth, RegisterValidator } from '#validators/auth'
import { SimpleMessagesProvider } from '@vinejs/vine'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {
  private authService: AuthService

  constructor() {
    this.authService = new AuthService()
  }

  async register({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(RegisterValidator, {
        messagesProvider: new SimpleMessagesProvider(messageProviderAuth),
      })
      const user = await this.authService.createUser(payload)
      return response.status(201).json({
        message: 'Utilisateur créé avec succès.',
        data: user,
      })
    } catch (error) {
      return response.status(500).json({
        message: error.messages || "Une erreur s'est produite lors de l'inscription",
      })
    }
  }

  async login({ request, response }: HttpContext) {
    try {
      const { email, password } = await request.validateUsing(LoginValidator, {
        messagesProvider: new SimpleMessagesProvider(messageProviderAuth),
      })

      const user = await User.query().where('email', email).first()
      if (!user)
        return response.status(404).json({
          message:
            'Utilisateur non trouvé, vérifiez votre addresse email',
        })

      const isValidPassword = await hash.verify(user.password, password)
      if (!isValidPassword) return response.status(401).json({ message: 'Mot de passe incorrect' })
      const token = await User.accessTokens.create(user, ['*'], { expiresIn: '2 days' })
      return response.status(201).json({
        message: 'Connexion réussie',
        user: user,
        token: token.value!.release(),
      })
    } catch (error) {
      return response.status(500).json({
        message: error.messages || "Une erreur s'est produite lors de la connexion",
      })
    }
    
  }
}
