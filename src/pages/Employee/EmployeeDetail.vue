<template>
  <div>
    <div v-if="data">
      <h1>Employee Detail ID: ({{ data.id }})</h1>
      <TabView>
        <TabPanel header="User">
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
            <!-- <SubmitButton
          label="Cancel"
          @click="onChangeCancel"
          severity="secondary"  
          style="min-width: 10rem"
        /> -->
            <ConfirmToast />
            <ConfirmDialog></ConfirmDialog>
            <div class="card flex flex-wrap gap-2 justify-center">
              <SubmitButton
                @click="onSubmit"
                label="Save"
                outlined
              ></SubmitButton>
              <SubmitButton
                @click="onChangeCancel"
                label="Cancel"
                severity="danger"
                outlined
              ></SubmitButton>
            </div>
            <!-- <SubmitButton
          type="button"
          label="Cancel"
          severity="secondary"
          @click="oncancel"
        ></SubmitButton> -->
            <!-- <SubmitButton
          type="button"
          label="Save"
          @click="onSubmit"
        ></SubmitButton> -->
          </div>
        </TabPanel>
        <TabPanel header="Cards">
          <div v-if="userPosts && userPosts.length > 0" class="body-card">
            <BodyCard v-for="(item, index) in userPosts" :key="index">
              <template #title>{{ item.title }}</template>
              <template #content>
                <p class="m-0">
                  {{ item.body }}
                </p>
              </template>
            </BodyCard>
          </div>
          <div v-else>
            <span>Không có thẻ Card nào!!!</span>
          </div>
        </TabPanel>
        <TabPanel header="To do">
          <div v-if="userTodo" class="card">
            <DataTable :value="userTodo" tableStyle="min-width: 50rem">
              <TableColumn field="id" header="ID"></TableColumn>
              <TableColumn field="todo" header="TO DO"></TableColumn>
              <TableColumn field="completed" header="COMPLETED"></TableColumn>
              <TableColumn field="userId" header="User ID"></TableColumn>
            </DataTable>
          </div>
        </TabPanel>
      </TabView>

      <!-- <div v-for="(item, index) in userPosts" :key="index">
        <h2>{{ item.title }}</h2>
        <p>{{ item.body }}</p>
      </div> -->
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

const confirm = useConfirm();
const toast = useToast();
const route = useRouter();
const data = ref(null);
const userPosts = ref(null);
const loading = ref(false);
const userTodo = ref(null);
// const oncancel = () => {
//   route.push({ path: "/employee" });
// };

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
        } catch (error) {
          console.error("lỗi data");
        }
      } else {
        console.log("edit thất bại");
      }

      toast.add({
        severity: "info",
        summary: "Confirmed",
        detail: "You have accepted",
        life: 3000,
      });
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
        detail: "Record deleted",
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
const fetchDaaUser = async () => {
  try {
    loading.value = true;
    await axios
      .get(`https://dummyjson.com/users/${route.currentRoute.value.params.id}`)
      .then((response) => {
        data.value = response.data;
      })
      .catch((error) => {
        console.error("Error fetching data data:", error);
      });

    await axios
      .get(
        `https://dummyjson.com/users/${route.currentRoute.value.params.id}/posts`
      )
      .then((response) => {
        userPosts.value = response.data.posts;
      })
      .catch((error) => {
        console.error("Error fetching data data:", error);
      });
    await axios
      .get(
        `https://dummyjson.com/users/${route.currentRoute.value.params.id}/todos`
      )
      .then((response) => {
        console.log({ response });
        userTodo.value = response.data.todos;
        console.log("userTodo", userTodo.value);
      })
      .catch((error) => {
        console.error("Error fetching data data:", error);
      });
  } catch (error) {
    console.error("khong co du lieu nao o day");
  } finally {
    loading.value = false;
  }
};
// const fetchCard = async () => {
//   await axios
//     .put(
//       `https://dummyjson.com/users/${route.currentRoute.value.params.id}/posts`
//     )
//     .then((response) => {
//       data.value = response.data;
//       console.log({ data: data.value });
//     });
// };
onMounted(() => {
  // const storedData = JSON.parse(localStorage.getItem("useData"));
  //   console.log({ storedData });
  //   if (storedData) {
  //     // data.value = storedData;
  //     console.log({ data: data.value });
  //   }
  // Gửi yêu cầu API để lấy chi tiết người dùng dựa trên ID
  fetchDaaUser();
  // fetchCard();
});
</script>

<style>
.card {
  margin: 1rem;
}

.employe-detail {
  display: flex;
  justify-content: space-around;
  border: 1px solid #6666;

  background: #cccccc;
  height: 100vh;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1);
}
.wrap_div {
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
.p-card-body {
  margin: 20px;
}
.p-card.p-component {
  margin: 20px;
  width: 30%;
  background: #3333;
}
</style>
