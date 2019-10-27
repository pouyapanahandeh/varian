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
  .settings-icon {
    fill: #ccc;
  }
  .letter-tile {
    padding: 100% 0 0;
    cursor: pointer;
    svg {
      position: absolute;
      left: 0;
      top: 0;
      line-height: 0;
      width: 100%;
      fill: #ccc;
    }

    transition: background ease-in 0.1s;
    &:hover {
      background: rgba(255,255,255, 0.1);
    }
    &.letter-tile-selected {
      background: rgba(0, 255, 255, 0.2);
    }
    &.letter-tile-found {
      background: rgba(0, 255, 0, 0.2);
    }
    &.letter-tile-highlighted {
      background: rgba(255, 255, 0, 0.2);
    }
  }
  #wordsearch_grid {
    min-width: calc(90vw - 50px);

    @media screen and (min-width: 100vh) {
      min-width: calc(90vh - 50px);
    }
    .col {
      padding: 0;

      &:not(:last-child) {
        border-right-width: 0 !important;
      }
    }
    .row {
      &:not(:last-child) {
        .col {
          border-bottom-width: 0 !important;
        }
      }
    }
  }
  .words {
    .badge {
      margin: 0 0.5em 0.5em 0;
    }
  }
</style>
