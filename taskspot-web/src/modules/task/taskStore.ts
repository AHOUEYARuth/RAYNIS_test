import { defineStore } from "pinia";
import type { Task } from "./taskType";
import { taskRequest } from "./taskRequest";


export const useTaskStore = defineStore("task", {
    state: () => ({
        tasks: [] as Task[],
        loading: false,
        message: null as string | null,
        error: null as string | null,
    }),

    actions: {
        clearMessages() {
            this.message = null
            this.error = null
        },

        async createTask(payload: Task){
            try {
                this.loading = true
                this.clearMessages()
                const {data} = await taskRequest.create(payload)
                this.message = data.message || 'Tâche créée avec succès'
            } catch (error: any) {
                this.error = error?.response?.data?.message || "Une erreur est survenue lors de la création de la tâche"
            }finally{
                this.loading = false
            }
        },

        async updateTask(payload: Task, id:number){
            try {
                this.loading = true
                this.clearMessages()
                const {data} = await taskRequest.update(payload, id)
                this.message = data.message || 'Tâche mise à jour avec succès'
            } catch (error: any) {
                this.error = error?.response?.data?.message || "Une erreur est survenue lors de la mise à jour de la tâche"
            }finally{
                this.loading = false
            }
        },

        async taskList(){
            try {
                this.loading = true
                const {data} = await taskRequest.getTasks()
                this.tasks = data.data
                console.log(data);
                
            } catch (error: any) {
                this.error = error?.response?.data?.message || "Une erreur est survenue lors de la récupération des tâches"
            }finally{
                this.loading = false
            }
        },

        async deleteTask(id: number){
            try {
                this.loading = true
                this.clearMessages()
                const {data} = await taskRequest.delete(id)
                this.message = data.message || 'Tâche supprimée avec succès'
            } catch (error: any) {
                this.error = error?.response?.data?.message || "Une erreur est survenue lors de la suppression de la tâche"
            }finally{
                this.loading = false
            }
        },

        async validateTask(id: number){
            try {
                this.loading = true
                this.clearMessages()
                const {data} = await taskRequest.validateTask(id)
                this.message = data.message || 'Tâche validée avec succès'
            } catch (error: any) {
                this.error = error?.response?.data?.message || "Une erreur est survenue lors de la validation de la tâche"
            }finally{
                this.loading = false
            }
        },
        
        async rejectTask(id: number){
            try {
                this.loading = true
                this.clearMessages()
                const {data} = await taskRequest.rejectTask(id)
                this.message = data.message || 'Tâche rejetée avec succès'
            } catch (error: any) {
                this.error = error?.response?.data?.message || "Une erreur est survenue lors du rejet de la tâche"
            }finally{
                this.loading = false
            }
        }
    }
})