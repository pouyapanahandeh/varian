<template>
  <CarouselLevel :slides="getSlidesForLevel(realmNumber, levelNumber)"></CarouselLevel>
</template>

<script>
import CarouselLevel from '../components/CarouselLevel';
import { mapGetters } from 'vuex';

export default {
	name: 'LevelSlides',
	components: { CarouselLevel },
  mounted: function () {
		this.setIds(+this.$route.params.realm_id, +this.$route.params.level_id);
	  this.levelSlides = this.getSlidesForLevel(this.realmNumber, this.levelNumber);
  },
  computed: {
		...mapGetters(['getSlidesForLevel'])
  },
  watch: {
	  '$route.params': {
		  handler(newParams) {
		  	this.setIds(+newParams.realm_id, +newParams.level_id);
		  },
		  immediate: true,
	  }
  },
  methods: {
		setIds: function (realmId, level_id) {
      this.realmNumber = realmId;
      this.levelNumber = level_id;
    }
  },
  data: function () {
		return {
			realmNumber: '',
      levelNumber: '',
      levelSlides: null
    }
  }
};
</script>

<style scoped>

</style>
