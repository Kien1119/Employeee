<template>
  <div class="card">
    <!-- <DataTable
      scrollable
      scrollHeight="600px"
      :loading="loading"
      :value="products"
      tableStyle="min-width: 50rem"
    >
      <TableColumn field="address" header="Address"></TableColumn>
      <TableColumn field="age" header="Age"></TableColumn>
      <TableColumn field="bank" header="Bank"></TableColumn>
      <TableColumn field="birthday" header="Birthday"></TableColumn>
      <TableColumn field="bloodGroup" header="Blood Group"></TableColumn>
      <TableColumn field="company" header="Company"></TableColumn>
      <TableColumn field="domain" header="Domain"></TableColumn>
      <TableColumn field="ein" header="Ein"></TableColumn>
      <TableColumn field="email" header="Email"></TableColumn>
      <TableColumn field="eyeColor" header="Eyes Color"></TableColumn>
      <TableColumn field="firstName" header="First Name"></TableColumn>
      <TableColumn field="gender" header="Gender"></TableColumn>
      <TableColumn field="hair" header="Hair"></TableColumn>
      <TableColumn field="height" header="Height"></TableColumn>
      <TableColumn field="id" header="ID"></TableColumn>
      <TableColumn field="image" header="Image"></TableColumn>
      <TableColumn field="ip" header="IP"></TableColumn>
      <TableColumn field="lastName" header="Last Name"></TableColumn>
      <TableColumn field="macAddress" header="MacAddress"></TableColumn>
      <TableColumn field="maidenName" header="maidenName"></TableColumn>
      <TableColumn field="password" header="Password"></TableColumn>
      <TableColumn field="phone" header="Phone"></TableColumn>
      <TableColumn field="snn" header="SNN"></TableColumn>
      <TableColumn field="university" header="University"></TableColumn>
      <TableColumn field="userAgent" header="UserAgent"></TableColumn>
      <TableColumn field="userName" header="Username"></TableColumn>
      <TableColumn field="weight" header=""></TableColumn>
    </DataTable> -->
    <DataTable
      :loading="loading"
      lazy
      selectionMode="single"
      scrollable
      scrollHeight="600px"
      :value="products"
      tableStyle="min-width: 50rem"
    >
      <TableColumn field="stt" header="STT" page="" style="width: 10rem">
        <template #body="{ index }">
          {{ index + 1 }}
        </template>
      </TableColumn>

      <!-- <template #body="{ index }">
                  <ConfirmToast />
                  <div class="flex flex-wrap gap-2">
                    {{ index }}
                  </div>
                </template> -->
      <!-- <TableColumn sortable field="id" header="ID"> </TableColumn> -->
      <TableColumn sortable field="firstName" header="First Name">
      </TableColumn>
      <TableColumn sortable field="lastName" header="Last Name"></TableColumn>
      <TableColumn sortable field="email" header="Email"></TableColumn>
      <TableColumn sortable field="phone" header="Phone"></TableColumn>
      <TableColumn sortable field="gender" header="Gender"></TableColumn>
      <TableColumn sortable field="height" header="Height"> </TableColumn>
      <TableColumn sortable field="weight" header="Weight"></TableColumn>
      <TableColumn sortable field="age" header="Age"> </TableColumn>
      <TableColumn field="Actions" header="Actions" style="width: 10rem">
        <template #body="{ data }">
          <ConfirmToast />
          <div class="flex flex-wrap gap-2">
            <SubmitButton
              :id="data.id"
              @click="deleData(data.id)"
              label="Delete"
              type="button"
              icon="pi pi-trash"
              rounded
            />

            <SubmitButton
              @click="submitProfile(data)"
              label="Profile"
              type="button"
              icon="pi pi-user"
              rounded
              severity="success"
              style="background: rgb(21, 171, 21) !important"
            />
          </div>
        </template>
      </TableColumn>
    </DataTable>
  </div>
</template>

<script setup>
import { useCounterStore } from "@/stores/modules/employment";
import { onMounted, ref } from "vue";
const products = ref([]);
const counterStore = useCounterStore();

onMounted(() => {
  console.log({ counterStore });
  try {
    const empList = counterStore.addEmp;
    console.log({ empList });

    products.value = empList;
  } catch (error) {
    console.error("Error data");
  }
});

// console.log(counterStore.doubleCount);
// console.log(counterStore.increment);
</script>
