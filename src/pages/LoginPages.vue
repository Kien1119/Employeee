<template>
  <div>
    <div class="slide"></div>
    <ValidationForm @submit="onSubmit">
      <div class="main">
        <div class="main-login">
          <div class="main-logo">
            <img src="../assets/Airdata_logo.b72ac479eff591919ddc.png" alt="" />
          </div>
          <div class="main-content">
            <h2 style="font-size: 20px">Airdata Company</h2>
            <h3 style="font-size: 16px; color: #d81221">
              Vui lòng đăng nhập vào tài khoản của bạn
            </h3>
          </div>
          <div class="main-user">
            <ValidationField name="username">
              <InputText
                class="inputText"
                type="text"
                name="username"
                v-model="username"
                v-bind="usernameAttrs"
                placeholder="Username"
              />
            </ValidationField>
            <span style="color: #d81221" name="username">{{
              errors.username
            }}</span>
            <ValidationField name="password">
              <!-- <PasswordInput
                variant="filled"
                v-model="password"
                v-bind="passwordAttrs"
                class="password"
                name="password"
                placeholder="Password"
                toggleMask
                :feedback="false"
              /> -->
              <!-- <div class="PasswordInput"> -->
              <PasswordInput
                variant="filled"
                v-model="password"
                v-bind="passwordAttrs"
                :fluid="true"
                class="password"
                inputStyle="width: 304px; border-radius: 10px;"
                name="password"
                placeholder="Password"
                toggleMask
                :feedback="false"
              />
              <!-- </div> -->
            </ValidationField>
            <span style="color: #d81221">{{ errors.password }}</span>

            <SubmitButton class="label" label="Đăng nhập" type="submit" />
          </div>
        </div>
      </div>
    </ValidationForm>
  </div>
</template>

<script setup>
import { useForm } from "vee-validate";
import * as yup from "yup";
import { useRouter } from "vue-router";
const { errors, handleSubmit, defineField } = useForm({
  validationSchema: yup.object({
    username: yup.string().required(),
    password: yup.string().min(6).required(),
  }),
});
const router = useRouter();
const onSubmit = handleSubmit((values) => {
  const username = values.username;
  const password = values.password;

  if (username === "admin" && password === "admin1") {
    localStorage.setItem("useInfo", JSON.stringify(username, password));
    router.push({ path: "/" });
  } else {
    alert("invalid username|password");
  }
});

const [username, usernameAttrs] = defineField("username");
const [password, passwordAttrs] = defineField("password");
</script>
<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  background: #0000000d;
  height: 100vh;
}
.PasswordInput {
  height: 30px !important;
  width: 304px !important;
}
.slide {
  width: calc(100% - 100px);
  height: calc(80% - 300px);
  background-image: url("../assets/Airdata_banner.982959089516ff93a40f.png");
  background-size: cover;
  background-position: center;
  position: absolute;
  top: 30px;
  left: 50px;
  border-radius: 20px;
}
.inputText {
  height: 40px;
  width: 304px;
  border-radius: 10px;
}
.label {
  height: 30px;
  width: 304px;
}
form {
  display: flex;
  justify-content: center;
  align-items: center;
}

.main {
  display: flex;
  height: 400px;
  width: 600px;
  background: #fff;
  position: absolute;
  border-radius: 20px;
  display: block;
  top: 200px;
}
.main {
  position: absolute;
}
.main-login {
  padding: 50px;
  height: 400px;
  width: 600px;
  border: 2px solid #0000000d;
  border-radius: 20px;
}
img {
  height: 50px;
}
.main-logo {
  width: 500px;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
.main-content {
  text-align: center;
  font-family: "Nunito sans";
  margin: 10px;
}
.main-user {
  margin-left: 100px;
  margin-top: 30px;
  width: 304px;
  height: 158px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;
}

/*
.p-inputtext.p-component {
  display: flex;
  margin: 20px;
  width: 90%;
  height: 40px;
  border: 1px solid #3333;
  border-radius: 10px;
}
.p-inputtext.p-component:hover {
  border: 2px solid #777;
}
.p-inputtext.p-component.p-password-input {
  width: 456px;
}
.p-button.p-component.label {
  border-radius: 10px;
  margin-left: 20px;
  width: 90%;
  background: #d81221;
  color: #fff;
  font-size: 22px;
  height: 40px;
} */
/* .p-button.p-component.label:hover {
  background: #880000;
  color: #fff;
}
.p-icon.p-password-toggle-mask-icon.p-password-unmask-icon {
  right: 30px;
  top: 30px;
}
.p-icon.p-password-toggle-mask-icon.p-password-mask-icon {
  right: 30px;
  top: 30px;
}
.p-icon.p-input-icon {
  right: 30px;
  top: 30px;
} */
</style>
