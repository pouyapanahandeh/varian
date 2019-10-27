<template>
  <div class="h-100">
    <div class="display-3 w-100 text-center bg-primary pt-3 pb-3 text-light">Levels</div>
    <div class="bg-success text-light p-4 d-flex flex-row justify-content-around">
      <p class="mb-0">Your rank: {{ getRank }}</p>
      <p class="mb-0">Your score: {{ getScore }}</p>
    </div>
    <div class="d-flex flex-column justify-content-between">
      <div v-for="(realm, counter) in groupedLevels" class="realm" :class="[+counter === 1 ? 'beginner' : 'advanced', {'bg-white transp no-pointer': +counter === 3}]">}}

        <div class="display-1 w-100 text-center bg-white transp">Realm #{{counter + (+counter === 3  ? ` (${timeLeft || ''})` : '')}}</div>

        <div class="d-flex flex-row flex-wrap">
          <div v-for="level in realm" class="p-4">
            <v-btn :to="`/slides/realm/${level.realm}/level/${level.level}`">{{level.level}}</v-btn>
          </div>
          <div class="p-4">
            <v-btn class="custom-shadow">{{realm.length + 1}}</v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
import { mapGetters } from 'vuex';
import moment from 'moment';

export default {
	name: 'Levels',
	mounted: function () {
		const levels = this.getLevels;
		this.groupedLevels = this.groupByKey(levels, 'realm');
    let time = moment().add(8,'hours');

		setInterval(() => {
			this.timeLeft = moment(time.diff(moment())).format('HH:MM:ss');
    }, 1000);
	},
	computed: {
		...mapGetters(['getLevels', 'getRank', 'getScore']),
	},
	data: function () {
		return {
			groupedLevels: [],
      timeLeft: null
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
		},

	}

};
</script>

<style lang="scss" scoped>
  .realm {
    &.beginner {
      background: url("/img/background.jpg") no-repeat;
      background-size: 100% 100%;
    }

    &.advanced {
      background: url("/img/background2.png") no-repeat;
      background-size: 100% 100%;
    }
  }

  .transp {
    opacity: 0.6;
  }

  .custom-shadow {
    box-shadow: cyan 0 0 30px 15px;
  }

  .no-pointer {
    pointer-events: none;
  }
</style>
