<template>
  <component :is="layout">
    <router-view></router-view>
  </component>
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
