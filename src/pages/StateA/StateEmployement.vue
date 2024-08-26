<template>
  <div>
    <p>Count: {{ counterStore }}</p>
    <!-- <button @click="counterStore.increment">Increase</button>
    <button @click="counterStore.decrement">Decrease</button> -->
  </div>
</template>

<script setup>
import { useCounterStore } from "@/stores/modules/employment";

const counterStore = useCounterStore;
console.log(counterStore);
</script>
