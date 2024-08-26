<template>
  <div class="card flex justify-center">
    <ListboxCheck
      v-model="selectedCity"
      :options="cities"
      optionLabel="name"
      class="w-full md:w-56"
    />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const selectedCity = ref(null);
const cities = [
  {
    name: "Home",
    to: "/",
  },
  {
    name: "Employee",
    to: "/employee",
  },
  {
    name: "Test",
    to: "/test",
  },
  {
    name: "Statement",
    to: "/state",
  },
  {
    name: "Logout",
    to: "/logout",
  },
];

watch(
  selectedCity,
  (newVal) => {
    if (newVal) {
      console.log(newVal);
      router.push(newVal);
    }
  },
  { deep: true }
);
</script>

<style></style>
