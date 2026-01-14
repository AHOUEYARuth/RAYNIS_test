/* eslint-disable prettier/prettier */
import type { HttpContext } from '@adonisjs/core/http'

import { TaskService } from '#services/task_service'
import { CreateTaskValidator, messageProviderTask, UpdateTaskValidator } from '#validators/task'
import { SimpleMessagesProvider } from '@vinejs/vine'

export default class TasksController {
  private taskService: TaskService

  constructor() {
    this.taskService = new TaskService()
  }

  async store({ request, response, auth }: HttpContext) {
    try {
      const payload = await request.validateUsing(CreateTaskValidator, {
        messagesProvider: new SimpleMessagesProvider(messageProviderTask),
      })
      const task = await this.taskService.createTask(payload, auth)
      return response.status(201).json({
        message: 'Tâche créée avec succès.',
        data: task,
      })
    } catch (error) {
      return response.status(500).json({
        message: error.messages || "Une erreur s'est produite lors de l'inscription",
      })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
        const payload = await request.validateUsing(UpdateTaskValidator, {
            messagesProvider: new SimpleMessagesProvider(messageProviderTask)
        })
        const task = await this.taskService.updateTask(params.id, payload)
        return response.status(200).json({
            message: 'Tâche mise à jour avec succès.',
            data: task,
        })
    } catch (error) {
        return response.status(500).json({
        message: error.message || "Erreur s'est produite",
      })
    }
  }

  async delete({ params, response }: HttpContext) {
    try {
        await this.taskService.deleteTask(params.id)
        return response.status(200).json({
            message: 'Tâche supprimée avec succès.',
        })
    } catch (error) {
        return response.status(500).json({
        message: error.message || "Erreur s'est produite",
      })
    }
  }
  
  async index({ response }: HttpContext) {
    try {
        const tasks = await this.taskService.getTasks()
        return response.status(200).json({
            message: 'Liste des tâches récupérée avec succès.',
            data: tasks,
        })
    } catch (error) {
        return response.status(500).json({
        message: error.message || "Erreur s'est produite",
      })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
        const task = await this.taskService.getTaskById(params.id)
        return response.status(200).json({
            message: 'Tâche récupérée avec succès.',
            data: task,
        })
    } catch (error) {
        return response.status(500).json({
        message: error.message || "Erreur s'est produite",
      })
    }
  }

  async validate({ params, response }: HttpContext) {
    try {
        const task = await this.taskService.validateTask(params.id)
        return response.status(200).json({
            message: 'Tâche validée avec succès.',
            data: task,
        })
    } catch (error) {
        return response.status(500).json({
        message: error.message || "Erreur s'est produite",
      })
    }
  }

  async reject({ params, response }: HttpContext) {
    try {
        const task = await this.taskService.rejectTask(params.id)
        return response.status(200).json({
            message: 'Tâche rejetée avec succès.',
            data: task,
        })
    } catch (error) {
        return response.status(500).json({
        message: error.message || "Erreur s'est produite",
      })
    }
  }
}
