<template>
  <div id="varriar-scene-ctx">
    <div id="frontier" class="frontier">
      <div id="player" class="actor player pt-4">
        <img class="sprite" src="/img/radioboy.png" alt="radioboy"/>
      </div>
      <div id="enemie" class="actor enemie">
        <p id="enemie-hp" class="hp">{{ monsterHP }}</p>
        <img class="sprite" src="/img/pizduk.png" alt="pizdushan"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
	name: 'GameScene',
	props: {
		gameEvent: {
			type: String,
			required: true
		}
	},
	mounted: function () {
    this.monsterHP = 200;
    this.damageAmount = this.monsterHP / 2;
	},
  data: function () {
		return {
			monsterHP: 0,
      damageAmount: 0
    }
  },
	watch: {
		gameEvent: function (newValue) {
			switch (newValue) {
				case "playerGuessed":
					this.dealDamage();
					break;
				case "playerMissed":
					// this.removePoints();
					break;
			}
		}
	},
	methods: {
		dealDamage: function () {
			const monster = $('#enemie')[0];
			this.monsterHP -= this.damageAmount;

			monster.style.animation = 'take-damage 2s';
			setTimeout(() => monster.style.animation = '', 2000);
		}
	}
};
</script>

<style lang="scss">
  #varriar-scene-ctx {
    width: 100%;
    height: 300px;
    background: url('/img/background.jpg') no-repeat;
    background-size: 100% 100%;
  }

  .frontier {
    position: absolute;
    top: 15%;
    left: 0;
    transform: translate(0, -50%);
    animation: idle 2s ease-in-out infinite;
    animation-direction: alternate;
  }

  .actor {
    width: 49vw;
    height: 100px;
    float: left;
  }

  .sprite {
    width: 25vw;
    height: 100%;
    margin-left: 50%;
    transform: translate(-50%, 0);
  }

  .hp {
    height: 40px;
    width: 50vw;
    text-align: center;
    margin-top: -40px;
    color: #ffffff;
    font-family: sans-serif;
    font-weight: bold;
    font-size: 2em;
  }


  @keyframes idle {
    from {
      transform: translate(0, -20%);
    }
    to {
      transform: translate(0, -50%);
    }
  }

  @keyframes take-damage {
    0% {
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    20% {
      opacity: 0;
    }
    30% {
      opacity: 1;
    }
    40% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    60% {
      opacity: 0;
    }
    70% {
      opacity: 1;
    }
    80% {
      opacity: 0;
    }
    90% {
      opacity: 1;
    }
  }
</style>
