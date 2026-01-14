import api from "@/api/axios"
import type { TaskPayload } from "./taskType"

export const taskRequest = {
    create(data: TaskPayload){
        return api.post('/tasks', data)
    },

    update(data: TaskPayload, id:number){
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