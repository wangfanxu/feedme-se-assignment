<template>
  <div id="app">
    <div class="flex-container">
      <NormalOrder @submitOrderHandler="submitOrderHandler" />
      <VIPOrder @submitOrderHandler="submitOrderHandler" />
      <WorkingArea
        :pendingTasks="pendingTasks"
        :completedTasks="completedTasks"
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
import WorkingArea from "./components/WorkingArea.vue";
import { ref, computed, reactive } from "vue";

// const executingTaskQueue = ref([]);
const pendingTaskQueue = ref([]);

const pendingTasks = computed(() => pendingTaskQueue.value.length);
const completedTasks = ref(0);
const taskType = {
  normalTask: "normal",
  vipTask: "vip",
};

const bots = reactive({});
const onBotIncrease = (id) => {
  bots[id] = {
    status: "idle",
  };
  console.log(bots);
  //check any pending task
  if (!pendingTaskQueue.value.length) return;

  //have pending task, execute it
  console.log("start execute task");
  executeOrder(id);
};

const onBotDecrease = () => {
  // Convert the keys to numbers and find the maximum key
  const maxKey = Math.max(...Object.keys(bots).map(Number));

  const bot = bots[maxKey];
  if (bot.status === "working") {
    //determine is it vip or normal order
    if (bot.taskType === taskType.vipTask)
      pendingTaskQueue.value.unshift(taskType.vipTask);
    else pendingTaskQueue.value.push(taskType.normalTask);
  }

  // Delete the bot with the maximum key
  delete bots[maxKey];
};

const executeOrder = (botId) => {
  if (!bots[botId]) return; //case bot no longer exist
  console.log("setting bot", bots[botId]);
  const taskType = pendingTaskQueue.value.shift();

  bots[botId].status = "working";
  bots[botId].taskType = taskType;
  setTimeout(() => {
    if (!bots[botId]) return; //case bot no longer exist

    bots[botId].status = "idle";
    bots[botId].taskType = "";

    completedTasks.value += 1;

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
  console.log("hello");
  if (normalOrder) {
    //push into the end of the queue
    pendingTaskQueue.value.push(taskType.normalTask);
  } else {
    //push into first position
    pendingTaskQueue.value.unshift(taskType.vipTask);
  }

  onNewTaskCreated();
};

const onNewTaskCreated = () => {
  const idleBotEntry = Object.entries(bots).find(
    ([_botId, bot]) => bot.status === "idle"
  );
  if (!idleBotEntry) return;

  const [idleBotId, idleBot] = idleBotEntry;
  console.log("Idle bot ID:", idleBotId);
  console.log("Idle bot:", idleBot);
  executeOrder(idleBotId);
};

// const onNewTaskExecuting = () => {
//   //set up scheduler for 10s, once done process remove the first element from executingTaskQueue
//   //then update the completed task
// };
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
