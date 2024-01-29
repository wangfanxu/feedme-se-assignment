<template>
  <div class="card">
    <h1>Cooking Bot</h1>
    <div class="badge">{{ botStatus }}</div>

    <h2>Current Bots: {{ numberOfBots }}</h2>
    <table class="styled-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Status</th>
          <th>Order ID</th>
          <th>Order type</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(bot, id) in props.bots" :key="id">
          <td>{{ id }}</td>
          <td>{{ bot.status }}</td>
          <td>{{ bot.taskId }}</td>
          <td>{{ bot.taskType }}</td>
        </tr>
      </tbody>
    </table>
    <button @click="onBotIncrease">Increase Bot</button>
    <button @click="onBotDecrease">Decrease Bot</button>
  </div>
</template>

<script setup>
import { defineEmits, ref, defineProps } from "vue";
const props = defineProps({
  bots: Object,
});

const emit = defineEmits(["onBotIncrease", "onBotDecrease"]);
const numberOfBots = ref(0);
let botId = 0;

const onBotIncrease = async () => {
  numberOfBots.value += 1;
  botId++;
  emit("onBotIncrease", botId);
};

const onBotDecrease = async () => {
  if (numberOfBots.value <= 0) return;
  numberOfBots.value -= 1;
  emit("onBotDecrease", botId); // Emit the 'submit' event with the current totalOrders value
};
</script>

<style scoped>
.card {
  width: 300px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

button {
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  transition-duration: 0.4s;
}

button:hover {
  background-color: #45a049;
}

.badge {
  display: inline-block;
  padding: 10px;
  color: white;
  background-color: #f44336; /* Red */
  margin-top: 10px;
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
