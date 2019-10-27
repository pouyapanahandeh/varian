<template>
  <v-container>

    <v-container align="center" justify-center>
      <v-row justify="center">
        <img src="/img/logo.jpeg" width="100%">
      </v-row>
      <v-row justify="center">
        <v-col class="text-center display-2">
          <v-btn class="my-2" to="/index" block>New game</v-btn>
          <v-btn class="my-2" to="/slides/realm/2/level/1" block>Continue</v-btn>
          <v-btn class="my-2" :to="{name: 'levels'}" block>Levels</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
export default {
	name: "Menu"
};
</script>

<style scoped>

</style>
