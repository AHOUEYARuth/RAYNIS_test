<script setup lang="ts">
import { useTaskStore } from '@/modules/task/taskStore'
import { ref, onMounted } from 'vue'
import { GoogleMap, AdvancedMarker } from 'vue3-google-map'

const center = ref({ lat: 6.3703, lng: 2.3912 })
const taskStore = useTaskStore()

onMounted(async () => {
  await taskStore.taskList()
})
</script>
<template>
  <div class="map-container">
    <GoogleMap
      api-key="AIzaSyA53WYf8RDgsTW6VwpxsncW6tJ7c3Anb2s"
      :libraries="['marker']"
      :center="center"
      :zoom="12"
      style="width: 100%; height: 500px"
    >
      <AdvancedMarker
        v-for="task in taskStore.tasks"
        :key="task.id"
        :options="{
          position: {
            lat: parseFloat(task.latitude),
            lng: parseFloat(task.longitude),
          },
        }"
      >
        <div class="task-marker">
          <div class="marker-content">
            <h4>{{ task.title }}</h4>
            <p>{{ task.description }}</p>
          </div>
        </div>
      </AdvancedMarker>
    </GoogleMap>
  </div>

  <div class="default-layout">
    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.map-container {
  width: 100%;
  margin-bottom: 20px;
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
}

main {
  width: 95%;
  height: 100%;
  background-color: #f5f5f5;
  margin: 0 auto;
}
</style>
