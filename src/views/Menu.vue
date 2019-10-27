<template>
  <v-container class="menu-bg h-100">

    <v-container align="center" justify-center>
      <v-row justify="center" class="custom-m">
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
  .menu-bg {
    background-image: url("/img/menu.jpeg");
    background-size: 100% 100%;
  }
  .custom-m {
    margin-top: 10rem;
  }
</style>
