<template>
  <div>
    <div v-if="data">
      <h1>Employee Detail ID: ({{ data.id }})</h1>
      <TabView @tab-change="onTabChange">
        <TabPanel header="User">
          <div v-if="activeTab === 0">
            <div class="profile">
              <div class="profile-1">
                <div class="wrap_div">
                  <label for="firstName">First name</label>
                  <ValidationField name="firstName">
                    <InputText
                      class="input_class"
                      type="text"
                      name="firstName"
                      v-model="data.firstName"
                    />
                  </ValidationField>
                </div>
                <div class="wrap_div">
                  <label for="lastName">Last name</label>
                  <ValidationField name="lastName">
                    <InputText
                      class="input_class"
                      type="text"
                      name="lastName"
                      v-model="data.lastName"
                    />
                  </ValidationField>
                </div>
                <div class="wrap_div">
                  <label for="phone">Phone</label>
                  <ValidationField name="Phone">
                    <InputText
                      class="input_class"
                      type="text"
                      name="phone"
                      v-model="data.phone"
                    />
                  </ValidationField>
                </div>
              </div>

              <div class="profile-2">
                <div class="wrap_div">
                  <label for="email">Email</label>
                  <ValidationField name="email">
                    <InputText
                      class="input_class"
                      type="text"
                      name="email"
                      v-model="data.email"
                      v-bind="emailAttrs"
                    />
                  </ValidationField>
                </div>
                <div class="wrap_div">
                  <label for="weight">Weight</label>
                  <ValidationField name="weight">
                    <InputText
                      class="input_class"
                      type="text"
                      name="weight"
                      v-model="data.weight"
                      v-bind="weightAttrs"
                    />
                  </ValidationField>
                </div>
                <div class="wrap_div">
                  <label for="height">Height</label>
                  <ValidationField name="height">
                    <InputText
                      class="input_class"
                      type="text"
                      name="height"
                      v-model="data.height"
                      v-bind="heightAttrs"
                    />
                  </ValidationField>
                </div>
                <div class="wrap_div">
                  <label for="age">Age</label>
                  <ValidationField name="age">
                    <InputText
                      class="input_class"
                      type="text"
                      name="age"
                      v-model="data.age"
                      v-bind="ageAttrs"
                    />
                  </ValidationField>
                </div>
              </div>
            </div>

            <div class="wrap_div_button">
              <ConfirmToast />
              <ConfirmDialog></ConfirmDialog>
              <div class="card flex flex-wrap gap-2 justify-center">
                <SubmitButton @click="onSubmit" label="Save" outlined />
                <SubmitButton
                  @click="onChangeCancel"
                  label="Cancel"
                  severity="danger"
                  outlined
                />
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel header="Cards">
          <div v-if="activeTab === 1">
            <div v-if="userPosts && userPosts.length > 0" class="body-card">
              <BodyCard
                class="item_body"
                v-for="(item, index) in userPosts"
                :key="index"
              >
                <template #title>{{ item.title }}</template>
                <template #content>
                  <p class="m-0">{{ item.body }}</p>
                </template>
              </BodyCard>
            </div>
            <div v-else>
              <span> Không có thẻ Card nào!!!</span>
            </div>
          </div>
        </TabPanel>
        <TabPanel header="To do">
          <div v-if="activeTab === 2">
            <div v-if="userTodo" class="card">
              <DataTable :value="userTodo" tableStyle="min-width: 50rem">
                <TableColumn field="id" header="ID"></TableColumn>
                <TableColumn field="todo" header="TO DO"></TableColumn>
                <TableColumn field="completed" header="COMPLETED"></TableColumn>
                <TableColumn field="userId" header="User ID"></TableColumn>
              </DataTable>
            </div>
          </div>
        </TabPanel>
      </TabView>
    </div>
    <div v-else-if="loading">
      <ProgressSpinner
        style="
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          top: 20px;
        "
        strokeWidth="8"
        fill="transparent"
        animationDuration=".5s"
        aria-label="Custom ProgressSpinner"
      />
    </div>
    <div v-else>
      <p>Không tìm thấy dữ liệu nhân viên.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { useCounterStore } from "@/stores/modules/employment";

const confirm = useConfirm();
const toast = useToast();
const route = useRouter();
const data = ref(null);
const userPosts = ref(null);
const loading = ref(false);
const userTodo = ref(null);
const editStore = ref(null);
const activeTab = ref(0);
const dataStore = useCounterStore();
const onSubmit = () => {
  confirm.require({
    message: "Are you sure you want to proceed?",
    header: "Confirmation",
    icon: "pi pi-exclamation-triangle",
    rejectProps: {
      label: "Cancel",
      severity: "secondary",
      outlined: true,
    },
    acceptProps: {
      label: "Save",
    },
    accept: async () => {
      const req = {
        firstName: data.value.firstName,
        lastName: data.value.lastName,
        email: data.value.email,
        phone: data.value.phone,
        height: data.value.height,
        weight: data.value.weight,
        age: data.value.age,
      };

      if (req) {
        try {
          await axios.put(
            `https://dummyjson.com/users/${route.currentRoute.value.params.id}`,
            req
          );
          toast.add({
            severity: "success",
            summary: "Success",
            detail: "Data saved successfully",
            life: 3000,
          });
        } catch (error) {
          await axios.put(`https://dummyjson.com/users/2`, req);

          console.log(dataStore.addEmp[0]);
          toast.add({
            severity: "success",
            summary: "Success",
            detail: "Data saved successfully",
            life: 3000,
          });
        }
      } else {
        toast.add({
          severity: "error",
          summary: "Error",
          detail: "Failed to save data",
          life: 3000,
        });
      }
    },
    reject: () => {
      toast.add({
        severity: "error",
        summary: "Cancelled",
        detail: "Action cancelled",
        life: 3000,
      });
    },
  });
};

const onChangeCancel = () => {
  confirm.require({
    message: "Do you want to cancel this record?",
    header: "Save Edit",
    icon: "pi pi-info-circle",
    rejectLabel: "No",
    acceptLabel: "Yes",
    rejectClass: "p-button-secondary p-button-outlined",
    acceptClass: "p-button-danger",
    accept: () => {
      toast.add({
        severity: "info",
        summary: "Confirmed",
        detail: "Record cancelled",
        life: 3000,
      });
      route.push({ path: "/employee" });
    },
    reject: () => {
      toast.add({
        severity: "error",
        summary: "Rejected",
        detail: "You have rejected",
        life: 3000,
      });
    },
  });
};

const fetchDaaUser = async (tabIndex) => {
  try {
    loading.value = true;
    switch (tabIndex) {
      case 0:
        try {
          const response = await axios.get(
            `https://dummyjson.com/users/${route.currentRoute.value.params.id}`
          );
          data.value = response.data;
        } catch {
          // lay trong store
          data.value = dataStore.addEmp[0];
        }
        break;
      case 1:
        if (!userPosts.value) {
          const response = await axios.get(
            `https://dummyjson.com/users/${route.currentRoute.value.params.id}/posts`
          );
          userPosts.value = response.data.posts;
        }
        break;
      case 2:
        if (!userTodo.value) {
          const response = await axios.get(
            `https://dummyjson.com/users/${route.currentRoute.value.params.id}/todos`
          );
          userTodo.value = response.data.todos;
        }
        break;
    }
  } catch (error) {
    console.error("Error fetching data");
  } finally {
    loading.value = false;
  }
};

const onTabChange = (event) => {
  activeTab.value = event.index;
  fetchDaaUser(activeTab.value);
};

onMounted(() => {
  fetchDaaUser(0);
});
</script>

<style scoped>
.profile {
  display: flex;
  justify-content: space-around;
  border: 1px solid #6666;

  background: #cccccc;
  height: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1);
}
.wrap_div {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding-bottom: 10px;
}

.input_class {
  width: 100% !important;
  margin-bottom: 20px;
}
.wrap_div_button {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
.profile {
  display: flex;
  justify-content: space-between;
}
.profile-1,
.profile-2 {
  width: 45%;
}

.body-card {
  display: flex;
}
/* .item_body {
  margin: 20px;
}
*/
.item_body {
  margin: 20px;
  width: 30%;
  background: #3333;
}
</style>
