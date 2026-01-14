<script setup lang="ts">
import { useTaskStore } from '@/modules/task/taskStore'
import type { Task } from '@/modules/task/taskType'
import { ref, onMounted } from 'vue'
import { GoogleMap, InfoWindow, Marker } from 'vue3-google-map'

const center = ref({ lat: 6.3703, lng: 2.3912 })
const taskStore = useTaskStore()

onMounted(async () => {
  await taskStore.taskList()
})
const selectedTask = ref<Task | null>(null)

const openInfoWindow = (task: Task) => {
  selectedTask.value = task
}

const closeInfoWindow = () => {
  selectedTask.value = null
}
</script>
<template>
  <div class="map-container">
    <GoogleMap
      api-key="AIzaSyA53WYf8RDgsTW6VwpxsncW6tJ7c3Anb2s"
      :libraries="['marker']"
      :center="center"
      :zoom="12"
      style="width: 100%; height: 100vh"
    >
      <Marker
        v-for="task in taskStore.tasks"
        :key="task.id"
        :options="{ position: { lat: task.latitude, lng: task.longitude }, title: task.title }"
         @click="openInfoWindow(task)"
      />
       <InfoWindow
      v-if="selectedTask"
      :options="{
        position: { lat: selectedTask.latitude, lng: selectedTask.longitude }
      }"
      @closeclick="closeInfoWindow"
    >
      <div class="info-window">
        <h4 style="font-weight: 600;">{{ selectedTask.title }}</h4>
        <p>{{ selectedTask.description }}</p>
      </div>
    </InfoWindow>
      <div class="default-layout">
        <main>
          <router-view />
        </main>
      </div>
    </GoogleMap>
  </div>
</template>

<style scoped>
.map-container {
  width: 100%;
  margin-bottom: 20px;
  z-index: 11;
  
}

.task-marker {
  background: white;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  width: 200px;
  cursor: pointer;
  transition: transform 0.2s;
}

.task-marker:hover {
  transform: scale(1.05);
}

.marker-content h4 {
  margin: 0 0 5px 0;
  font-size: 14px;
  color: #333;
}

.marker-content p {
  margin: 0;
  font-size: 12px;
  color: #666;
}

.default-layout {
  width: 100%;
  height: 100vh;
  padding: 0 auto;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  pointer-events: none;
}

main {
  width: 95%;
  height: 100%;
  /* background-color: #f5f5f5; */
  margin: 0 auto;
}
.info-window h4 {
  margin: 0 0 8px 0;
  color: #333;
  font-size: 16px;
}

.info-window p {
  margin: 0;
  color: #666;
  font-size: 14px;
}
</style>
