<template>
  <v-app>
    <v-main>
      <v-container fluid fill-height>
        <slot></slot>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "SingleLayout",
};
</script>
