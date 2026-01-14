/* eslint-disable prettier/prettier */

import Task from "#models/task";
import { Authenticator } from "@adonisjs/auth";
import { Authenticators } from "@adonisjs/auth/types";


export class TaskService {

  async createTask(data: any, auth: Authenticator<Authenticators>){
    const task = new Task()
    task.title = data.title
    task.description = data.description
    task.status = data.status
    task.longitude = data.longitude
    task.latitude = data.latitude
    task.createdBy = auth.user!.id

    await task.save()
    return task
  }

  async updateTask(taskId: string, data: any){
    const task = await Task.query().where('id', taskId).first()
    if(!task)throw new Error('Tâche non trouvée')
    
    task.title = data.title ?? task.title
    task.description = data.description ?? task.description
    task.status = data.status ?? task.status
    task.longitude = data.longitude ?? task.longitude
    task.latitude = data.latitude ?? task.latitude
    
    await task.save()
    return task
  }

  async deleteTask(taskId: string){
    const task = await Task.query().where('id', taskId).first()
    if(!task)throw new Error('Tâche non trouvée')

    await task.delete()
  }

  async getTasks(){
    const tasks = await Task.all()
    return tasks
  }

  async getTaskById(taskId: string){
    const task = await Task.query().where('id', taskId).first()
    if(!task)throw new Error('Tâche non trouvée')
    return task
  }
  async validateTask(taskId: string){
    const task = await Task.query().where('id', taskId).first()
    if(!task)throw new Error('Tâche non trouvée')
    if((task.status === 'validate' )) throw new Error('Tradition déjà validée') 
    task.status = 'validate'
    await task.save()
    return task
  }

  async rejectTask(taskId: string){
    const task = await Task.query().where('id', taskId).first()
    if(!task)throw new Error('Tâche non trouvée')
    if ((task.status === 'rejected' )) throw new Error('Tâche déjà rejetée') 
    task.status = 'rejected'
    await task.save()
    return task
  }
}