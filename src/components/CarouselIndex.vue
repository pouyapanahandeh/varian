<template>
  <v-carousel
      :show-arrows="false"
      height="100%"
  >
    <v-carousel-item
        v-for="(message, i) in messages"
        :key="i"
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
              <v-text-field label="Your hero name!" solo-inverted class="mt-6 ml-4 mr-4 text--white"></v-text-field>

              <v-btn :to="{name: 'menu'}" class="pr-8 pl-8" outlined>PLAY!</v-btn>
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
		]
	})
};
</script>

<style scoped>

</style>
