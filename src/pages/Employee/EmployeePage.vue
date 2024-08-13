<template>
  <div>
    <div class="container">
      <h2>Employee</h2>
      <form class="form-employee">
        <div class="card flex flex-wrap justify-center gap-1">
          <IconField>
            <InputIcon class="pi pi-search" />
            <InputText
              v-model="searchText"
              placeholder="Search"
              style="width: 300px"
            />
          </IconField>
          <div class="card flex justify-content-center">
            <SelectButton
              @click="genderClick"
              v-model="genderValue"
              :options="options"
              aria-labelledby="basic"
            />
          </div>
          <SubmitButton label="Add Employment" @click="visible = true" />

          <TableDialog
            v-model:visible="visible"
            modal
            header="Employment Profile"
            :style="{ width: '50rem' }"
          >
            <div class="profile">
              <div class="profile-1">
                <div class="wrap_div">
                  <label for="firstName">firstName</label>
                  <ValidationField name="firstName">
                    <InputText
                      class="input_class"
                      type="text"
                      name="firstName"
                      v-model="firstName"
                      v-bind="firstNameAttrs"
                    />
                  </ValidationField>
                  <span style="color: #d81221">{{ errors.firstName }}</span>
                </div>
                <div class="wrap_div">
                  <label for="lastName">lastName</label>
                  <ValidationField name="lastName">
                    <InputText
                      class="input_class"
                      type="text"
                      name="lastName"
                      v-model="lastName"
                      v-bind="lastNameAttrs"
                    />
                  </ValidationField>
                  <span style="color: #d81221">{{ errors.lastName }}</span>
                </div>

                <div class="wrap_div">
                  <label for="email">Email</label>
                  <ValidationField name="email">
                    <InputText
                      class="input_class"
                      type="text"
                      name="email"
                      v-model="email"
                      v-bind="emailAttrs"
                    />
                  </ValidationField>
                </div>
                <span style="color: #d81221">{{ errors.email }}</span>
              </div>

              <div class="profile-2">
                <div class="wrap_div">
                  <label for="height">height</label>
                  <ValidationField name="height">
                    <InputText
                      class="input_class"
                      type="text"
                      name="height"
                      v-model="height"
                      v-bind="heightAttrs"
                    />
                  </ValidationField>
                  <span style="color: #d81221">{{ errors.height }}</span>
                </div>

                <div class="wrap_div">
                  <label for="phone">Phone</label>
                  <ValidationField name="phone">
                    <InputText
                      class="input_class"
                      type="text"
                      name="phone"
                      v-model="phone"
                      v-bind="phoneAttrs"
                    />
                  </ValidationField>
                  <span style="color: #d81221">{{ errors.phone }}</span>
                </div>
                <div class="wrap_div">
                  <label for="weight">Weight</label>
                  <ValidationField name="weight">
                    <InputText
                      class="input_class"
                      type="text"
                      name="weight"
                      v-model="weight"
                      v-bind="weightAttrs"
                    />
                  </ValidationField>
                  <span style="color: #d81221">{{ errors.weight }}</span>
                </div>
              </div>
            </div>

            <div class="wrap_div_button">
              <SubmitButton
                type="button"
                label="Cancel"
                severity="secondary"
                @click="visible = false"
              ></SubmitButton>
              <SubmitButton
                type="button"
                label="Save"
                @click="onSubmit"
              ></SubmitButton>
            </div>
          </TableDialog>
        </div>

        <div>
          <TabView @tab-click="fetchData()">
            <TabPanel header="List">
              <DataTable
                :lazy="true"
                paginator
                :loading="loading"
                :rows="lazyParams.rows"
                :first="lazyParams.first"
                :totalRecords="totalRecords"
                :rowsPerPageOptions="[5, 10, 15, 20]"
                selectionMode="single"
                scrollable
                scrollHeight="600px"
                :value="filterData"
                tableStyle="min-width: 50rem"
                @page="onPage"
              >
                <TableColumn sortable field="id" header="ID"></TableColumn>
                <TableColumn sortable field="firstName" header="First Name">
                </TableColumn>
                <TableColumn
                  sortable
                  field="lastName"
                  header="Last Name"
                ></TableColumn>
                <TableColumn
                  sortable
                  field="email"
                  header="Email"
                ></TableColumn>
                <TableColumn
                  sortable
                  field="phone"
                  header="Phone"
                ></TableColumn>
                <TableColumn
                  sortable
                  field="gender"
                  header="Gender"
                ></TableColumn>
                <TableColumn sortable field="height" header="Height">
                </TableColumn>
                <TableColumn
                  sortable
                  field="weight"
                  header="Weight"
                ></TableColumn>
                <TableColumn sortable field="age" header="Age"> </TableColumn>
                <TableColumn
                  field="Actions"
                  header="Actions"
                  style="width: 10rem"
                >
                  <template #body="{ data }">
                    <div class="flex flex-wrap gap-2">
                      <SubmitButton type="button" icon="pi pi-trash" rounded />
                      <SubmitButton
                        type="button"
                        icon="pi pi-pencil"
                        rounded
                        severity="success"
                      />
                      <SubmitButton
                        @click="submitProfile(data)"
                        label="Profile"
                        style="background: #d81221 !important"
                        icon="pi pi-user"
                      />
                    </div>
                  </template>
                </TableColumn>
              </DataTable>
            </TabPanel>
            <TabPanel header="Cards">
              <p>CARDS</p>
            </TabPanel>
          </TabView>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useForm } from "vee-validate";
import * as yup from "yup";
import { useRouter } from "vue-router";

const router = useRouter();
// const data = ref();

const visible = ref(false);
const searchText = ref("");
const totalRecords = ref(0);
const lazyParams = ref({
  first: 0,
  rows: 5,
  page: 1,
});

const genderValue = ref();
const options = ref(["male", "female"]);

function genderClick() {}
// const filterData = computed(() => {
//   if (!data.value) {
//     return [];
//   }

//   console.log("comput ");
//   let results = data.value;

//   if (searchText.value)
//     results = results.filter(
//       (item) =>
//         item.firstName.toUpperCase().includes(searchText.value.toUpperCase()) ||
//         item.lastName.toUpperCase().includes(searchText.value.toUpperCase()) ||
//         item.email.toUpperCase().includes(searchText.value.toUpperCase()) ||
//         item.phone.includes(searchText.value)
//     );

//   if (genderValue.value) {
//     results = results.filter((item) => item.gender === genderValue.value);
//   }
//   console.log({ data: data.value, results });
//   return results;
// });
const filterData = ref([]);

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: yup.object({
    firstName: yup
      .string()
      .required("firstName is required")
      .min(3, "firstName must be at least 3 characters")
      .max(50, "firstName must be at most 50 characters"),
    lastName: yup
      .string()
      .required("lastName is required")
      .min(3, "lastName must be at least 3 characters")
      .max(50, "lastName must be at most 50 characters"),
    email: yup.string().email("Email must be a@gmail.com").required(),
    height: yup.string().required(),
    phone: yup.string().min(11).required(),
    weight: yup.string().required(),
  }),
});

const onSubmit = handleSubmit(async (values) => {
  const req = {
    firstName: values.firstName,
    lastName: values.lastName,
    email: values.email,
    height: values.height,
    phone: values.phone,
    weight: values.weight,
    gender: values.gender,
  };

  const id = 1;

  await axios.post(`https://dummyjson.com/posts/${id}`, req);

  visible.value = false;
});

const [firstName, firstNameAttrs] = defineField("firstName");
const [lastName, lastNameAttrs] = defineField("lastName");
const [email, emailAttrs] = defineField("email");
const [height, heightAttrs] = defineField("height");
const [phone, phoneAttrs] = defineField("phone");
const [weight, weightAttrs] = defineField("weight");
const loading = ref(false);
const fetchUsers = async (rows, page) => {
  const skip = (page - 1) * rows;
  const url = `https://dummyjson.com/users?limit=${rows}&skip=${skip}&select=firstName,lastName,email,height,phone,gender,weight,age`;

  try {
    loading.value = true;
    const response = await axios.get(url);

    const { data } = response;
    // Gán dữ liệu từ API vào filterData
    filterData.value = data.users;
    console.log("1", filterData.value);

    totalRecords.value = data.total;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu:", error);
  } finally {
    loading.value = false;
  }
};

const onPage = (event) => {
  lazyParams.value = {
    ...lazyParams.value,
    first: event.first,
    rows: event.rows,
    page: event.page + 1,
  };
  fetchUsers(lazyParams.value.rows, lazyParams.value.page);
};

onMounted(() => {
  fetchUsers(lazyParams.value.rows, lazyParams.value.page);
});
const submitProfile = (data) => {
  if (data && data.id) {
    localStorage.setItem("useData", JSON.stringify(data));
    router.push({ name: "employee-detail", params: { id: data.id } });
  } else {
    console.error("Không có dữ liệu hợp lệ được chọn.");
  }
};
</script>

<style scoped>
.container {
  margin: 10px;
  padding: 10px;
}
.form-employee {
  border: 1px solid #6666;

  background: #cccccc;
  height: 100vh;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1);
}
h2 {
  font-size: 32px;
  font-family: Georgia, serif;
  margin: 0 0 8px;
  color: #000000de;
}
.p-inputtext.p-component {
  width: 40%;
  height: 50px;
}
/* .p-inputtext.p-component {
  width: 300px;
} */
.card.flex.flex-wrap.justify-center.gap-1 {
  justify-content: space-between;
}
.card.flex.justify-center {
  margin: 20px;
}
.p-selectbutton.p-button-group.p-component {
  display: flex;
}
.profile {
  display: flex;
  justify-content: space-between;
}
.profile-1,
.profile-2 {
  width: 45%;
}

.wrap_div {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding-bottom: 10px;
}

.input_class {
  width: 100% !important;
}

.wrap_div_button {
  display: flex;
  justify-content: center;
  gap: 10px;
}
.p-tabview-nav-link .p-tabview-header-action {
  margin-left: 10px;
}
</style>
