<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useTaskStore } from '../taskStore'

const taskStore = useTaskStore()
onMounted(() => {
  taskStore.taskList()
})

const form = reactive({
  title: '',
  description: '',
  longitude: '',
  latitude: '',
})
const resetForm = () => {
  form.title = ''
  form.description = ''
  form.longitude = ''
  form.latitude = ''
}
const submitForm = async () => {
  await taskStore.createTask(form)
  if (!taskStore.error) {
    resetForm()
    taskStore.taskList()
  }
}
const showDeleteModal = ref(false)
const taskToDelete = ref<number | null>(null)

const confirmDelete = (id: number) => {
  taskToDelete.value = id
  showDeleteModal.value = true
}

const deleteTask = async () => {
  if (taskToDelete.value !== null) {
    await taskStore.deleteTask(taskToDelete.value)
    await taskStore.taskList()
    cancelDelete()
  }
}

const cancelDelete = () => {
  showDeleteModal.value = false
  taskToDelete.value = null
}
</script>

<template>
  <div class="task-section">
    <div class="content">
      <div class="task_container">
        <div class="task_content">
          <h2>Listes des tâches</h2>
          <div v-if="taskStore.loading">Chargement...</div>
          <div v-else>
            <div v-if="taskStore.tasks.length === 0">Aucune tâche disponible</div>
            <div class="task_list">
              <div class="task_item" v-for="task in taskStore.tasks" :key="task.id">
                <h3>{{ task.title }}</h3>
                <p>{{ task.description }}</p>
                <div class="actions">
                  <button class="edit">Modifier</button>
                  <button class="del" @click="confirmDelete(task.id)">Supprimer</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="form_section">
        <h2>Ajouter une tâche</h2>
        <form class="login-form" @submit.prevent="submitForm">
          <div v-if="taskStore.error" class="alert alert-error">
            {{ taskStore.error }}
          </div>

          <input v-model="form.title" type="text" placeholder="Titre" />
          <input v-model="form.description" type="text" placeholder="Description" />
          <input v-model="form.longitude" type="text" placeholder="Longitude" />
          <input v-model="form.latitude" type="text" placeholder="Latitude" />
          <button :disabled="taskStore.loading">
            {{ taskStore.loading ? 'Ajout...' : 'Ajouter' }}
          </button>
        </form>
      </div>
    </div>

    <div v-if="showDeleteModal" class="modal-overlay" @click="cancelDelete">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>Confirmation de suppression</h3>
        </div>
        <div class="modal-body">
          <p>Êtes-vous sûr de vouloir supprimer cette tâche ?</p>
          <p class="warning">Cette action est irréversible.</p>
        </div>
        <div class="modal-footer">
          <button class="btn-cancel" @click="cancelDelete">annuler</button>
          <button class="btn-confirm" @click="deleteTask">supprimer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.task-section {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
.content {
  width: 100%;
  height: 95%;
  display: flex;
  justify-content: space-between;
  align-items: start;
}
.task_container {
  width: 30%;
  height: 100%;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: start;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
}
.form_section {
  width: 30%;
  padding: 10px;
  background-color: #fff;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  text-align: center;
}
.btn {
  width: 100%;
  display: flex;
  justify-content: end;
}
.btn button {
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  background-color: #00b7b6;
  color: #fff;
  cursor: pointer;
}
.task_list {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 20px;
}
.task_item {
  width: 100%;
  height: auto;
  background-color: #f5f5f5;
  border-radius: 5px;
  padding: 15px;
}
.task_item h3 {
  margin: 0;
  padding: 0;
  color: #333;
  font-weight: 600;
}
.actions {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 10px;
}
.actions button {
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.edit {
  background-color: #037575;
  color: #fff;
}
.del {
  background-color: #f44336;
  color: #fff;
}
.login-form {
  width: 100%;
  /*  height: 80%; */
  /*  max-width: 360px; */
  padding: 2rem;
  background: #ffffff;
  border-radius: 10px;
}

.login-form h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
}

.form-group {
  margin-bottom: 1rem;
}

.login-form input {
  width: 100%;
  padding: 0.75rem;
  font-size: 0.95rem;
  border-radius: 6px;
  border: 1px solid #ddd;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
  margin-bottom: 0.5rem;
}

.login-form input:focus {
  outline: none;
  border-color: #037575;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
}

.login-form button {
  width: 100%;
  padding: 0.75rem;
  margin-top: 0.5rem;
  border: none;
  border-radius: 6px;
  background: #037575;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.login-form button:hover:not(:disabled) {
  background: #037575;
}

.login-form button:disabled {
  background: #a5b4fc;
  cursor: not-allowed;
}
.alert {
  padding: 0.75rem;
  margin-bottom: 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
}

.alert-error {
  background: #fee2e2;
  color: #991b1b;
}

.alert-success {
  background: #dcfce7;
  color: #166534;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 12px;
  padding: 0;
  min-width: 400px;
  max-width: 500px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.modal-header {
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.modal-header h3 {
  margin: 0;
  font-size: 18px;
  color: #333;
}

.modal-body {
  padding: 20px;
}

.modal-body p {
  margin: 0 0 10px 0;
  color: #666;
  font-size: 15px;
}

.warning {
  color: #f44336;
  font-weight: 500;
  font-size: 13px !important;
}

.modal-footer {
  padding: 15px 20px;
  border-top: 1px solid #eee;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

.modal-footer button {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s;
}

.btn-cancel {
  background: #e0e0e0;
  color: #333;
}

.btn-cancel:hover {
  background: #d0d0d0;
}

.btn-confirm {
  background: #f44336;
  color: white;
}

.btn-confirm:hover {
  background: #d32f2f;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(244, 67, 54, 0.3);
}
</style>
