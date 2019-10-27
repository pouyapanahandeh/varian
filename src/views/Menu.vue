<template>
  <v-container>

    <v-container align="center" justify-center>
      <v-row justify="center">

      </v-row>
      <v-row justify="center">
        <v-col class="text-center display-2">
          <v-btn class="my-2" to="/" block>New Game</v-btn>
          <v-btn class="my-2" :to="{name: 'levels'}" block>Levels</v-btn>
          <v-btn class="my-2" block>Unlocked</v-btn>
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
