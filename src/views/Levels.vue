<template>
  <div>
    <div class="display-3 w-100 text-center bg-primary pt-3 pb-3 text-light">Levels</div>
    <div class="bg-success text-light p-4 d-flex flex-row justify-content-around">
      <p class="mb-0">Your rank: {{ getRank }}</p>
      <p class="mb-0">Your score: {{ getScore }}</p>
    </div>
    <div v-for="(realm, i) in groupedLevels" class="realm" :class="[+i === 1 ? 'beginner' : 'advanced']">
      <div class="display-1 w-100 text-center bg-white transp">Realm #{{i}}</div>

      <div class="d-flex flex-row flex-wrap">
        <div v-for="level in realm" class="p-4">
          <v-btn :to="`/slides/realm/${level.realm}/level/${level.level}`">{{level.level}}</v-btn>
        </div>
        <div class="p-4 custom-shadow">{{realm.length}}</div>
      </div>
    </div>
  </div>


</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'Levels',
	mounted: function () {
		const levels = this.getLevels;
		this.groupedLevels = this.groupByKey(levels, 'realm');
	},
	computed: {
		...mapGetters(['getLevels', 'getRank', 'getScore'])
	},
	data: function () {
		return {
			groupedLevels: []
		};
	},
	methods: {
		groupByKey: function (object, key) {
			return object.reduce((groupedObj, element) => {
				let group = element[key];
				groupedObj[group] = groupedObj[group] || [];
				groupedObj[group].push(element);

				return groupedObj;
			}, {});
		}
	}

};
</script>

<style lang="scss" scoped>
  .realm {
    .transp {
      opacity: 0.6;
    }

    &.beginner {
      background: url("/img/background.jpg") no-repeat;
      background-size: 100% 100%;
    }

    &.advanced {
      background: url("/img/background2.png") no-repeat;
      background-size: 100% 100%;
    }
  }
</style>
