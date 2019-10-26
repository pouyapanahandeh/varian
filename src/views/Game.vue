<template>
  <div v-if="getTypeForLevel(this.realmNumber, this.levelNumber)">
    <WordGame v-if="getTypeForLevel(this.realmNumber, this.levelNumber) === 'word'"></WordGame>
    <LetterGame v-else-if="getTypeForLevel(this.realmNumber, this.levelNumber) === 'letter'"></LetterGame>
  </div>
</template>

<script>
import WordGame from '../components/WordGame';
import LetterGame from '../components/LetterGame';
import { mapGetters } from 'vuex';

export default {
	name: 'Game',
	components: { LetterGame, WordGame },
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
			type: ''
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
		setIds: function (realmId, levelId) {
			this.realmNumber = realmId;
			this.levelNumber = levelId;
		}
	},
};
</script>

<style scoped>

</style>
