<template>
  <div v-if="getTypeForLevel(this.realmNumber, this.levelNumber)">
    <GameScene :game-event="gameEvent"></GameScene>

    <WordGame @updateEvent="updateEvent" v-if="getTypeForLevel(this.realmNumber, this.levelNumber) === 'word'"></WordGame>
    <LetterGame @updateEvent="updateEvent" v-else-if="getTypeForLevel(this.realmNumber, this.levelNumber) === 'letter'"></LetterGame>
  </div>
</template>

<script>
import WordGame from '../components/WordGame';
import LetterGame from '../components/LetterGame';
import GameScene from '../components/GameScene';

import { mapGetters } from 'vuex';

export default {
	name: 'Game',
	components: { LetterGame, WordGame, GameScene },
	mounted: function () {
		this.setIds(+this.$route.params.realm_id, +this.$route.params.level_id);
	},
	computed: {
		...mapGetters(['getTypeForLevel'])
	},
	data: function () {
		return {
			realmNumber: '',
			letterNumber: '',
			type: '',
      gameEvent: ''
		};
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
		updateEvent: function (eventTypePayload) {
			this.gameEvent = eventTypePayload;
			setTimeout(() => this.gameEvent = '', 200)
    },
		setIds: function (realmId, levelId) {
			this.realmNumber = realmId;
			this.levelNumber = levelId;
		}
	},
};
</script>

<style scoped>

</style>
