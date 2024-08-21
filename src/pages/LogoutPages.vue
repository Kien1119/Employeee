<template>
  <div>Logout</div>
</template>

<script>
export default {
  mounted() {
    localStorage.removeItem("useInfo");
    this.$router.push("/login");
  },
};
</script>
