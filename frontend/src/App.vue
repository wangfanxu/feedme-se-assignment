<template>
  <div id="app">
    <h1>Total order: {{ totalOrderNumber }}</h1>
    <div class="flex-container">
      <NormalOrder @submitOrderHandler="submitOrderHandler" />
      <VIPOrder @submitOrderHandler="submitOrderHandler" />
      <PendingTask :pendingTasks="pendingTaskQueue" />
      <CompleteTask
        :completedTasks="completedTasks"
        :numberOfCompletedTask="numberOfCompletedTask"
      />
    </div>
    <br />
    <div class="flex-container">
      <CookingBot
        @onBotIncrease="onBotIncrease"
        @onBotDecrease="onBotDecrease"
        :bots="bots"
      />
    </div>
  </div>
</template>

<script setup>
import NormalOrder from "./components/NormalOrder.vue";
import VIPOrder from "./components/VIPOrder.vue";
import CookingBot from "./components/CookingBot.vue";
import PendingTask from "./components/PendingTask.vue";
import CompleteTask from "./components/CompleteTask.vue";
import { ref, reactive } from "vue";

const pendingTaskQueue = ref([]);
const completedTasks = ref([]);
const totalOrderNumber = ref(0);
const numberOfCompletedTask = ref(0);

let taskId = 0;

const taskType = {
  normalTask: "normal",
  vipTask: "vip",
};

const bots = reactive({});
const onBotIncrease = (id) => {
  bots[id] = {
    status: "idle",
  };
  //check any pending task
  if (!pendingTaskQueue.value.length) return;

  //have pending task, execute it
  executeOrder(id);
};

const onBotDecrease = () => {
  // Convert the keys to numbers and find the maximum key
  const maxKey = Math.max(...Object.keys(bots).map(Number));

  const bot = bots[maxKey];
  if (bot.status === "working") {
    //determine is it vip or normal order
    if (bot.taskType === taskType.vipTask) handleVipOrderInsertion(bot.taskId);
    else
      pendingTaskQueue.value.push({
        taskType: taskType.normalTask,
        taskId: bot.taskId,
      });
  }

  // Delete the bot with the maximum key
  delete bots[maxKey];
};

const handleVipOrderInsertion = (taskId) => {
  // Find the index of the last VIP task in the queue
  const lastVipTaskIndex = pendingTaskQueue.value.reduce(
    (lastIndex, task, index) =>
      task.taskType === taskType.vipTask ? index : lastIndex,
    -1
  );

  // If there are no VIP tasks in the queue, insert into first position of the array
  if (lastVipTaskIndex === -1) {
    pendingTaskQueue.value.unshift({
      taskType: taskType.vipTask,
      taskId: taskId,
    });
  } else {
    // Otherwise, insert the new task after the last VIP task
    pendingTaskQueue.value.splice(lastVipTaskIndex + 1, 0, {
      taskType: taskType.vipTask,
      taskId: taskId,
    });
  }
};
const executeOrder = (botId) => {
  if (!bots[botId]) return; //case bot no longer exist
  const task = pendingTaskQueue.value.shift();

  bots[botId].status = "working";
  bots[botId].taskType = task.taskType;
  bots[botId].taskId = task.taskId;
  setTimeout(() => {
    if (!bots[botId]) return; //case bot no longer exist

    bots[botId].status = "idle";
    bots[botId].taskType = "";
    bots[botId].taskId = "";

    completedTasks.value.push(task);
    numberOfCompletedTask.value++;

    // Check if there are any remaining tasks
    if (pendingTaskQueue.value.length > 0) {
      // Find an idle bot
      const idleBotEntry = Object.entries(bots).find(
        /* eslint-disable */
        ([_botId, bot]) => bot.status === "idle"
      );

      if (idleBotEntry) {
        const [idleBotId] = idleBotEntry;

        // Execute the order with the idle bot
        executeOrder(idleBotId);
      }
    }
  }, 10000); // 10000 milliseconds = 10 seconds
};

const submitOrderHandler = (normalOrder = true) => {
  totalOrderNumber.value += 1;
  taskId++;
  if (normalOrder) {
    //push into the end of the queue
    pendingTaskQueue.value.push({
      taskType: taskType.normalTask,
      taskId: taskId,
    });
  } else {
    handleVipOrderInsertion(taskId);
  }

  onNewTaskCreated();
};

const onNewTaskCreated = () => {
  const idleBotEntry = Object.entries(bots).find(
    ([_botId, bot]) => bot.status === "idle"
  );
  if (!idleBotEntry) return;

  const [idleBotId, idleBot] = idleBotEntry;
  executeOrder(idleBotId);
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.flex-container {
  display: flex;
  margin-bottom: 20px;
}
</style>
