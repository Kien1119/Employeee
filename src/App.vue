<template>
  <component :is="layout">
    <router-view></router-view>
  </component>
  <!-- <div>
    <h1>Hello App!</h1>
    <p><strong>Current route path:</strong> {{ $route.fullPath }}</p>
    <nav>
      <RouterLink to="/">Go to Home</RouterLink>
      <RouterLink to="/login">Go to Login</RouterLink>
    </nav>
    <main>
      <RouterView />
    </main>
  </div> -->
</template>

<script>
export default {
  name: "App",
  components: {},
  computed: {
    layout() {
      return this.$route.meta.layout;
    },
  },

  methods: {},
};
</script>

<style></style>
