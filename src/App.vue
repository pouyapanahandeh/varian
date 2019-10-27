<template>
  <v-app>
    <v-content height="100%">
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import IndexPage from './views/IndexPage';

export default {
  name: 'App',
  components: {
    IndexPage,
  },
  mounted: function () {
    this.$store.dispatch('parseLevels');
  },
  data: () => ({
    //
  }),
};
</script>
<style lang="scss">
  @import'~bootstrap/dist/css/bootstrap.css';
</style>
