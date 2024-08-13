<template>
  <div>Logout</div>
</template>
<script>
// import mapping from '@/store/mapping';
export default {
  methods: {
    // logoutAction: mapping.auth.actions.logout,
  },
  mounted() {
    // this.logoutAction();
    localStorage.removeItem("userInfo");
    this.$router.push("/login");
  },
};
</script>
