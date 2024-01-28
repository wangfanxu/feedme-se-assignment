<template>
  <div class="working-area">
    <div class="pending-area">
      <h2>Pending Orders</h2>
      <p>Number of pending orders: {{ props.pendingTasks }}</p>
    </div>
    <div class="completed-area">
      <h2>Completed Orders</h2>
      <p>Number of completed orders: {{ props.completedTasks }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  pendingTasks: Number,
  completedTasks: Number,
});

console.log("props", props.pendingTasks);

// watch(
//   () => props.pendingTasks,
//   (newVal, oldVal) => {
//     console.log("pendingTasks updated:", newVal);
//     console.log("old val", oldVal);
//   }
// );
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
</style>
