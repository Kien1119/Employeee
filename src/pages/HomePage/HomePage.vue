<template>
  <div>
    <ListAccordion :activeIndex="0">
      <AccordionTab header="Top 10 People with Highest Age">
        <DataTable :value="top10People" tableStyle="min-width: 50rem">
          <TableColumn field="id" header="ID"></TableColumn>
          <TableColumn field="firstName" header="First Name"></TableColumn>
          <TableColumn field="lastName" header="Last Name"></TableColumn>
          <TableColumn field="email" header="Email"></TableColumn>
          <TableColumn field="phone" header="Phone"></TableColumn>
          <TableColumn field="height" header="Height"></TableColumn>
          <TableColumn field="weight" header="Weight"></TableColumn>
          <TableColumn field="age" header="Age"></TableColumn>
        </DataTable>
      </AccordionTab>
      <AccordionTab header="Employees with the highest age">
        <DataTable :value="topEmployee" tableStyle="min-width: 50rem">
          <TableColumn field="id" header="ID"></TableColumn>
          <TableColumn field="firstName" header="First Name"></TableColumn>
          <TableColumn field="lastName" header="Last Name"></TableColumn>
          <TableColumn field="email" header="Email"></TableColumn>
          <TableColumn field="phone" header="Phone"></TableColumn>
          <TableColumn field="height" header="Height"></TableColumn>
          <TableColumn field="weight" header="Weight"></TableColumn>
          <TableColumn field="age" header="Age"></TableColumn>
        </DataTable>
      </AccordionTab>
    </ListAccordion>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
const data2 = ref([]);
const data = ref([]);
const top10People = computed(() => {
  return data.value;
});
const topEmployee = computed(() => {
  return data2.value;
});
onMounted(async () => {
  try {
    const response = await axios.get("https://dummyjson.com/users");
    const sortedData = response.data.users.sort((a, b) => b.age - a.age);
    data.value = sortedData.slice(0, 10);

    data2.value = sortedData.slice(0, 1);
  } catch (err) {
    console.error("Có lỗi xảy ra khi lấy dữ liệu", err);
  }
});
</script>
