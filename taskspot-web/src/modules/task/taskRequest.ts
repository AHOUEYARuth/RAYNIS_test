import api from "@/api/axios"
import type { Task } from "./taskType"

export const taskRequest = {
    create(data: Task){
        return api.post('/tasks', data)
    },

    update(data: Task, id:number){
        return api.post(`/tasks/${id}`, data)
    },

    getTasks(){
        return api.get('/tasks')
    },

    delete(id: number){
        return api.delete(`/tasks/${id}`)
    },

    taskDetail(id: number){
        return api.get(`/tasks/${id}`)
    },

    validateTask(id: number){
        return api.post(`/tasks/validate/${id}`)
    },

    rejectTask(id: number){
        return api.post(`/tasks/reject/${id}`)
    }
}