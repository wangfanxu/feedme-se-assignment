<template>
  <div class="pending-area">
    <h2>Completed Orders</h2>
    <p>Completed orders: {{ props.completedTasks.length }}</p>
    <table class="styled-table">
      <thead>
        <tr>
          <th>Task ID</th>
          <th>Task Type</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in props.completedTasks" :key="task.taskId">
          <td>{{ task.taskId }}</td>
          <td>{{ task.taskType }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  completedTasks: Array,
  numberOfCompletedTask: Number,
});
</script>

<style scoped>
.working-area {
  display: flex;
  justify-content: space-around;
}

.pending-area,
.completed-area {
  width: 300px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
}

.styled-table th,
.styled-table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.styled-table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #4caf50;
  color: white;
}
</style>
