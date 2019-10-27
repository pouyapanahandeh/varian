<template>
  <v-carousel
      :show-arrows="false"
      height="100%"
      v-model="currentSlide"
  >
    <v-carousel-item
        v-for="(message, i) in messages"
        :key="i"
        @click.stop="goToNext"
        :class="{'no-pointer' : i === messages.length - 1}"
    >
      <v-sheet
          :color="message.color"
          height="100%"
          tile
          class="pl-4 pr-4"
      >
        <v-row
            class="fill-height"
            align="center"
            justify="center"
        >
          <div class="text-center display-2">
            {{message.text}}
            <div v-if="messages.length - 1 === i">
              <v-text-field v-model="playerName" label="Your hero name!" solo-inverted class="mt-6 ml-4 mr-4 text--white"></v-text-field>
              <v-btn class="pr-8 pl-8" outlined>PLAY!</v-btn>
            </div>
          </div>
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
	name: 'CarouselIndex',
	data: () => ({
		messages: [
			{ color: 'red', text: 'Hello there! Welcome to the Varian app!' },
			{ color: 'green', text: 'Today, we\'re going to tell you a story.' },
			{ color: 'orange', text: 'Once upon a time...' },
			{ color: 'blue', text: 'Please enter your name:' },
		],
    currentSlide: 0,
    playerName: ''
	}),
	methods: {
		goToNext: function () {
			if (this.currentSlide < this.messages.length - 1)
		    this.currentSlide++;
		  else
		    this.playerName && this.$router.push({name: 'menu'});
		}
	}
};
</script>

<style lang="scss" scoped>
  .no-pointer {
    pointer-events: none;

    .v-input, .v-btn {
      pointer-events: auto;
    }
  }
</style>
