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
          <div class="text-center display-1 break">
            {{message.text}}
            <img v-if="message.image" :src="`/img/${message.image}`" alt="ImageView" height="600px">
            <div v-if="i === 0">
              <p>Your name!</p>
              <v-text-field v-model="playerName" label="Your hero name!" solo-inverted
                            class="mt-6 ml-4 mr-4 text--white"></v-text-field>

              <p>You are a...</p>
              <div class="d-flex justify-content-center">
                <v-radio-group v-model="playerGender" row>
                  <v-radio label="Boy" value="boy"></v-radio>
                  <v-radio label="Girl" value="girl"></v-radio>
                </v-radio-group>
              </div>

              <v-btn @click.stop.prevent="playerName && playerGender && ++currentSlide && setPlayer()" outlined>GO!
              </v-btn>
            </div>
            <v-btn v-if="i === messages.length - 1" class="pr-8 pl-8" outlined>PLAY!</v-btn>
          </div>
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'CarouselIndex',
	computed: {
		...mapGetters(['getName', 'getGender'])
	},
	data: () => ({
		messages: [
			{
				"color": "#186782",
				"text": ""
			},
			{
				"color": "#186782",
				"text": "Once upon a time, there was a xxxx called yyyy was not feeling well and doctor called Varian said that yyyy has tumor inside zzzz brain.\nTumor is a little group of unwanted monsters that harms yyyy’s brain."
			},
			{
				"color": "orange",
				"text": "yyyy decided to fight against this tumor and kill it with the help of zzzz doctor Varian.\nDoctor Varian took some pictures of yyyy’s brain to locate the tumor and put a plan in order to make it easy for yyyy to win zzzz battle against this tumor."
			},
			{
				"color": "green",
				"text": "During his mission, yyyy needed to get into a special machine designed by zzzz doctor to flight to the space for 25 days in order to find the monsters and destroy them."
			},
			{
				"color": "yellow",
				"image": "arrowed.png",
				"text": ""
			},
			{
				"color": "orange",
				"text": "Each day yyyy had to fight against different monster by completing different challenges.\n\nSo yyyy, do you want to fight these monsters? \nStart the game\n"
			}
		],
		currentSlide: 0,
		playerName: '',
		playerGender: ''
	}),
	methods: {
		goToNext: function () {
			if (this.currentSlide > 0 && this.currentSlide < this.messages.length - 1) {
				this.currentSlide++;
			} else if (this.currentSlide === this.messages.length - 1) {
				this.$router.push({ path: '/slides/realm/1/level/1' });
			}
		},
		setPlayer: function () {
			this.$store.dispatch('setPlayer', { name: this.playerName, gender: this.playerGender });

			this.messages = this.messages.map(msg => {
				msg.text = msg.text.replace(/yyyy/gi, this.getName);
				msg.text = msg.text.replace(/xxxx/gi, this.getGender);
				msg.text = msg.text.replace(/zzzz/gi, this.getGender === 'boy' ? 'his' : 'her');
				return msg;
			});
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

  .break {
    white-space: pre-line;
  }
</style>
