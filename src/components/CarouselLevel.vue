<template>
  <v-carousel
      :show-arrows="false"
      height="100%"
      v-model="currentSlide"
  >
    <v-carousel-item
        v-for="(slide, i) in slides"
        :key="i"
        @click.stop="goToNext()"
    >
      <v-sheet
          :color="slide.color"
          height="100%"
          tile
          class="pl-4 pr-4"
      >
        <v-row
            class="fill-height"
            align="center"
            justify="center"
        >
          <div class="text-center slide-font-size pa-4 cloud">
            <img v-if="slide.image" :src="`/img/${slide.image}`" alt="ImageView" width="100%">
            <div class="break">{{slide.text}}</div>
            <div v-if="slides.length - 1 === i">
              <v-btn class="pr-8 pl-8 mt-6" :to="`/realm/${$route.params.realm_id}/level/${$route.params.level_id}`" outlined>Start Level!</v-btn>
            </div>
          </div>
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
	name: 'CarouselLevel',
  props: {
		slides: {
      required: true
    }
  },
  watch: {
		slides: function () {
			this.currentSlide = 0;
    }
  },
  data: function () {
		return {
			currentSlide: 0
    }
  },
  methods: {
		goToNext: function () {
			(this.currentSlide < this.slides.length - 1) && this.currentSlide++;
    }
  }
};
</script>

<style scoped>
  .break {
    white-space: pre-line;
  }

  .slide-font-size {
    font-size: 1.9rem;
  }
</style>
