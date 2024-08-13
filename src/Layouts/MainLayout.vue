<template>
  <div class="main-body">
    <SideBar class="sidebar" />

    <div class="right_side" style="width: 100%">
      <AppBar />
      <div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import AppBar from "../components/AppBar.vue";

export default {
  name: "MainLayout",
  components: {
    SideBar,
    AppBar,
  },
};
</script>
<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  display: flex;
}

.main-body {
  display: flex;
}

.main-body .sidebar {
  width: 20vw;
}

.main-body .right_side {
  flex-direction: column;
  width: 70vw;
}
</style>
