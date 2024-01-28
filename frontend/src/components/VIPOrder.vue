<template>
  <div class="card">
    <h1>VIP Customer Order</h1>
    <h2>Total Submitted Orders: {{ totalOrders }}</h2>
    <button @click="submitOrder">Submit VIP Order</button>
  </div>
</template>

<script setup>
import { defineEmits } from "vue";

const emit = defineEmits(["submitOrderHandler"]);

const submitOrder = async () => {
  // await axios.post('/api/orders', orderData);

  //update firestore to increase total order
  //push to submitOrderHandler to handle to position
  emit("submitOrderHandler", false); // Emit the 'submit' event with the current totalOrders value
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
</style>
