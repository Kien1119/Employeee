<template>
  <div>
    <div class="container">
      <h2>Employee</h2>
      <form>
        <div class="card flex flex-wrap justify-center gap-1">
          <InputGroup>
            <SubmitButton
              @click="handleSearch"
              icon="pi pi-search"
              severity="search"
            />
            <!-- @keyup.enter="applyFilters" -->

            <!-- @input="debouncedSearch" -->
            <InputText
              size="small"
              placeholder="Search...."
              v-model="searchQuery"
              @keyup.enter="debouncedSearch()"
            />
            <SubmitButton
              icon="pi pi-times"
              severity="danger"
              @click="resetFilters"
            />
          </InputGroup>
          <div class="addEmployee">
            <div class="card flex justify-content-center">
              <SelectButton
                @click="genderClick"
                v-model="genderValue"
                :options="options"
                aria-labelledby="basic"
              />
            </div>
            <SubmitButton label="Add Employment" @click="visible = true" />
          </div>
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

                <div class="wrap_div">
                  <label for="gender">Gender</label>
                  <ValidationField name="gender">
                    <DropdownField
                      class="input_class"
                      v-model="gender"
                      :options="genderOption"
                      optionLabel="name"
                      placeholder="Select a Gender"
                      checkmark
                      :highlightOnSelect="false"
                      v-bind="genderAttrs"
                      optionValue="name"
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
                <div class="wrap_div">
                  <label for="age">Age</label>
                  <ValidationField name="age">
                    <InputText
                      class="input_class"
                      type="text"
                      name="age"
                      v-model="age"
                      v-bind="ageAttrs"
                    />
                  </ValidationField>
                  <span style="color: #d81221">{{ errors.age }}</span>
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
          <TabView>
            <TabPanel header="List">
              <DataTable
                :paginator="true"
                :loading="loading"
                :rows="lazyParams.rows"
                lazy
                :totalRecords="totalRecords"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 25]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                selectionMode="single"
                scrollable
                scrollHeight="600px"
                :value="filteredData"
                tableStyle="min-width: 50rem"
                @page="onPage"
                @sort="onSort"
              >
                <TableColumn
                  field="stt"
                  header="STT"
                  page=""
                  style="width: 10rem"
                >
                  <template #body="{ index }">
                    {{ computedIndex + index + 1 }}
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

              <ConfirmDialog></ConfirmDialog>
            </TabPanel>
            <TabPanel header="Cards">
              <div class="cart_panel">Cart</div>
            </TabPanel>
          </TabView>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { watch, computed, onMounted, ref } from "vue";
import { useForm } from "vee-validate";
import * as yup from "yup";
import { useRouter } from "vue-router";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { useCounterStore } from "@/stores/modules/employment";
const stores = useCounterStore();
const router = useRouter();
const visible = ref(false);
const searchQuery = ref("");
const totalRecords = ref(0);
const confirm = useConfirm();
const toast = useToast();
const genderData = ref([]);

const genderValue = ref();

const filteredData = ref([]);
// const gender = ref(null);
const genderOption = ref([
  { name: "Female", code: "FE" },
  { name: "Male", code: "MA" },
]);
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
    age: yup.string().required(),
    gender: yup.string().required(),
  }),
});
const computedIndex = computed(() => {
  return lazyParams.value.page * lazyParams.value.rows - lazyParams.value.rows;
});
const onSubmit = handleSubmit((values) => {
  confirm.require({
    message: "Do you want to Add this record?",
    header: "Add Employeee",
    icon: "pi pi-info-circle",
    rejectLabel: "Cancel",
    acceptLabel: "Add",
    rejectClass: "p-button-secondary p-button-outlined",
    acceptClass: "p-button-danger",
    accept: async () => {
      toast.add({
        severity: "info",
        summary: "Confirmed",
        detail: "Record deleted",
        life: 3000,
      });
      const req = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        height: values.height,
        phone: values.phone,
        weight: values.weight,
        age: values.age,
        gender: values.gender,
      };

      if (req) {
        try {
          const a = await stores.addEmployee(req);
          filteredData.value.unshift(a);

          visible.value = true;
          localStorage.setItem("userData", JSON.stringify(a));
        } catch (error) {
          console.error("lỗi data");
        }
        visible.value = false;
      } else {
        alert("Add Thất bại");
      }
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
});

const [firstName, firstNameAttrs] = defineField("firstName");
const [lastName, lastNameAttrs] = defineField("lastName");
const [email, emailAttrs] = defineField("email");
const [height, heightAttrs] = defineField("height");
const [phone, phoneAttrs] = defineField("phone");
const [weight, weightAttrs] = defineField("weight");
const [age, ageAttrs] = defineField("age");
const [gender, genderAttrs] = defineField("gender");
const loading = ref(false);

const fetchUsers = async (
  lazyParams,
  sortField = "firstName,lastName,email,height,phone,weight,age,gender",
  sortOrder = "asc"
) => {
  const page = lazyParams.page;
  const row = lazyParams.rows;
  const limit = (page - 1) * row;
  const url_limit = `https://dummyjson.com/users/search?q=${searchQuery.value}&limit=${row}&skip=${limit}&sortBy=${sortField}&order=${sortOrder}&select=firstName,lastName,email,height,phone,weight,age,gender`;

  try {
    loading.value = true;
    const response = await axios.get(url_limit);

    const { data } = response;
    filteredData.value = data.users; // data fetch user
    totalRecords.value = data.total;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu:", error);
  } finally {
    loading.value = false;
  }
};

const lazyParams = ref({
  first: 5,
  page: 1,
  rows: 5,
});
const onPage = (event) => {
  lazyParams.value = {
    page: event.page + 1,
    rows: event.rows,
  };
  fetchUsers(lazyParams.value);
};
const sortField = ref("");
const sortOrder = ref("");
const onSort = (event) => {
  const sortField = event.sortField;
  const sortOrder = event.sortOrder === 1 ? "asc" : "desc";

  fetchUsers(lazyParams.value, sortField, sortOrder);
};

onMounted(() => {
  fetchUsers(lazyParams.value, sortField.value, sortOrder.value);
});
const submitProfile = (data) => {
  if (data && data.id) {
    router.push({ name: "employee-detail", params: { id: data.id } });
  } else {
    console.error("Không có dữ liệu hợp lệ được chọn.");
  }
};
watch([searchQuery], () => {
  debouncedSearch();
});

const resetFilters = () => {
  searchQuery.value = "";
  genderValue.value = "";
  fetchUsers(lazyParams.value);
};
const handleSearch = () => {
  debouncedSearch();
};
const deleData = (id) => {
  confirm.require({
    message: "Do you want to delete this record?",
    header: "Danger Zone",
    icon: "pi pi-info-circle",
    rejectLabel: "Cancel",
    acceptLabel: "Delete",
    rejectClass: "p-button-secondary p-button-outlined",
    acceptClass: "p-button-danger",
    accept: async () => {
      toast.add({
        severity: "info",
        summary: "Confirmed",
        detail: "Record deleted",
        life: 3000,
      });
      try {
        await axios.delete(`https://dummyjson.com/users/${id}`);
      } catch (error) {
        console.error("lỗi ko xóa data");
      }
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

const url_filter = (val) =>
  `https://dummyjson.com/users/filter?key=gender&value=${val}`;
const options = ref(["male", "female"]);
const genderClick = async () => {
  if (genderValue.value) {
    try {
      loading.value = true;
      const response = await axios.get(url_filter(genderValue.value));
      totalRecords.value = response.data.total;

      genderData.value = response.data;
      filteredData.value = response.data.users;
    } catch (error) {
      console.error("Error data");
    } finally {
      loading.value = false;
    }
  } else {
    fetchUsers(lazyParams.value);
  }
};
// const index = computed;
let timoutID;
const debouncedSearch = () => {
  clearTimeout(timoutID);
  timoutID = setTimeout(
    () =>
      fetchUsers(
        lazyParams.value,
        sortField.value,
        sortOrder.value,
        searchQuery.value
      ),
    300
  );
};
</script>

<style scoped>
.cart_panel {
  border-radius: 20px;
  border: 1px solid #000000de;
  height: 100px;
  padding: 20px;
}
form {
  display: block;
}
h2 {
  font-size: 32px;
  font-family: Georgia, serif;
  margin: 0 0 8px;
  color: #000000de;
}
.addEmployee {
  display: flex;
  justify-content: space-between;
  align-content: center;
  width: 1252px;
  margin: 10px;
}
/* .p-inputtext.p-component {
  width: 40%;
  height: 50px;
} */
/* .p-inputtext.p-component {
  width: 300px;
} */
/* .card.flex.flex-wrap.justify-center.gap-1 {
  justify-content: space-between;
} */
/* .card.flex.justify-center {
  margin: 20px;
} */
/* .p-selectbutton.p-button-group.p-component {
  display: flex;
} */
.profile {
  display: flex;
  justify-content: space-between;
  margin: 30px;
}
.profile-1,
.profile-2 {
  width: 45%;
}

/* .p-inputtext.p-component.p-inputtext-sm {
  margin: 0;
} */
.wrap_div {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding-bottom: 10px;
}
button {
  margin: 0;
}
.input_class {
  width: 100% !important;
}

.wrap_div_button {
  display: flex;
  justify-content: center;
  gap: 10px;
}
</style>
