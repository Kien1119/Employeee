<template>
  <div>
    <div v-if="data">
      <h1>Employee Detail ID: ({{ data.id }})</h1>
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
        <SubmitButton
          type="button"
          label="Cancel"
          severity="secondary"
          @click="oncancel"
        ></SubmitButton>
        <SubmitButton
          type="button"
          label="Save"
          @click="onSubmit"
        ></SubmitButton>
      </div>
    </div>
    <div v-else>
      <p>Không tìm thấy dữ liệu nhân viên.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const data = ref(null);
const oncancel = () => {
  if (confirm("Bạn chắc chắn cancel???")) {
    router.push({ path: "/employee" });
  }
};
onMounted(() => {
  const storedData = JSON.parse(localStorage.getItem("useData"));
  console.log({ storedData });
  if (storedData) {
    data.value = storedData;
    console.log({ data: data.value });
  }
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
.p-button.p-component {
  margin: 0 30px;
}
</style>
