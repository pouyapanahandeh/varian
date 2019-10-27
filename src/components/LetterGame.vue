<template>
  <div class="hangman">
    <div class="guess">
      <ul class="word pa-0">
        <li v-for="(letter, i) in pickedWordLetters" class="letter"
            :class="{correct: indecesOfLettersGuessed.includes(i)}"
        >
          {{ letter }}
        </li>
      </ul>
    </div>
    <form class="guessForm">
      <label v-if="!isGameOver">
        <input type="text" v-model="inputLetter" class="guessLetter" maxlength="1" placeholder="Enter a letter . . ."
               :class="{disabled: isGameOver}"/>
      </label>
      <button v-if="!isGameOver" @click.prevent="makeGuess" type="submit" class="guessButton">Guess</button>
      <a v-else @click.prevent="$router.push({name: 'levels'})" class="guessButton d-block">Next Game!</a>
    </form>
    <div class="wrong">
      <ul class="wrongLetters">
        <li v-for="wrongGuess in wrongGuesses" class="mb-5">{{ wrongGuess }}</li>
      </ul>
    </div>
    <div class="message">
      <h1 class="title">
        {{ endMsgs.title }}
      </h1>
    </div>
  </div>

</template>

<script>
import $ from 'jquery';
import { mapGetters } from 'vuex';

export default {
	name: 'LetterGame',
	mounted: function () {
		const wordList = this.getWordList(this.$route.params.realm_id, this.$route.params.level_id);
		this.pickedWordLetters = wordList[Math.floor(Math.random() * this.getWordList.length)].split('');
		this._setupSounds();
	},
	computed: {
		...mapGetters(['getWordList'])
	},
	data: function () {
		return {
			wordList: [],
			pickedWordLetters: [],
			sounds: {
				good: null,
				bad: null,
				win: null,
				lose: null
			},
			soundPlayTimeout: null,
			inputLetter: '',
			isGameOver: false,
			correctGuesses: [],
			wrongGuesses: [],
			indecesOfLettersGuessed: [],

			endMsgs: {
				title: ''
			}
		};
	},
	methods: {
		win: function () {
			this.endMsgs.title = `Congratulations you did it!`;
			this.playSound('win');
			this.showMsg();
			this.isGameOver = true;
		},
		showMsg: function () {
			const msg = $('.message');
			const msgTitle = $('.message .title');
			const msgText = $('.message .text');
			const restart = $('.restart');

			msg.show("blind", function () {
				msgTitle.show("bounce");
				msgText.show("slide");
				restart.show("fade");
			});
		},
		makeGuess: function () {
			if (this.inputLetter.match(/[a-zA-Z]/) && this.inputLetter.length === 1) {
				if (this.wrongGuesses.includes(this.inputLetter) || this.correctGuesses.includes(this.inputLetter)) {
					this.inputLetter = '';
					this.playSound('bad');
					return;
				}

				if (this.inputLetter) {
					let indecesOfGuessed = [];

					if (this.pickedWordLetters.includes(this.inputLetter)) {
						this.pickedWordLetters.forEach((letter, i) => {
							if (letter === this.inputLetter.toLowerCase()) {
								indecesOfGuessed.push(i);
								this.correctGuesses.push(letter);
							}
						});
					}

					if (indecesOfGuessed.length) {
						this.indecesOfLettersGuessed.push(...indecesOfGuessed);
						this.playSound('good');
						this.$emit('updateEvent', { type: 'playerGuessed', multi: indecesOfGuessed.length });

						if (this.indecesOfLettersGuessed.length === this.pickedWordLetters.length)
							this.win();

					} else {
						this.wrongGuesses.push(this.inputLetter);
						this.playSound('bad');
					}
				}
			}

			this.inputLetter = '';
		},
		playSound: function (sound) {
			this.sounds[sound].play();
		},
		_setupSounds: function () {
			this.sounds.good = new Audio("https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/goodbell.mp3");
			this.sounds.bad = new Audio("https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/bad.mp3");
			this.sounds.win = new Audio("https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/win.mp3");
			this.sounds.lose = new Audio("https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/lose.mp3");

			this.sounds.good.volume = .6;
			this.sounds.bad.volume = .5;
			this.sounds.win.volume = .8;
			this.sounds.lose.volume = .5;
		}
	}
}
;
</script>

<style lang="scss" scoped>
  @import url(https://fonts.googleapis.com/css?family=Londrina+Solid|Nunito:400,300);

  $blue: #53BDFF;
  $green: #2EB933;
  $drk-blue: darken($blue, 10%);

  * {
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
  }

  body {
    background: rgb(50, 50, 50);

  }

  a {
    color: $blue;
    text-decoration: none;
    font-size: 14px;

    &:hover {
      color: lighten($blue, 10%);
    }
  }

  .hangman {
    font-family: "Londrina Solid", cursive;
    margin: 0 auto;
    text-align: center;
    padding: 10px;
  }

  h1 {
    font-size: 40px;
    margin-bottom: 20px;
    color: $blue;
    font-weight: 300;
  }

  p {
    margin-bottom: 20px;
    color: gray;
    line-height: 1.3;

  }

  @keyframes letteranim {
    50% {
      transform: translateY(-5px) scale(1.05);
    }
  }

  .letter {
    display: inline-block;
    color: transparent;
    border-bottom: 5px solid $blue;
    margin: 0 3px;
    font-size: 40px;
    padding: 10px;
    transition: .5s;
    text-transform: uppercase;


  }

  .word {
    display: block;
    white-space: nowrap;
  }

  .correct {
    color: $blue;
    text-shadow: 1px 2px 0 $drk-blue;
    animation: letteranim .3s ease;
  }

  .guessForm {
    margin: 20px auto 0;

    input, .guessButton {
      font-family: "Londrina Solid", cursive;
    }

    input[type="text"] {
      outline: none;
      padding: 10px;
      font-size: 30px;
      margin-bottom: 20px;
      margin-right: 5px;
      border: 1px solid #aaa;
      color: gray;
    }

    .guessButton {
      border: none;
      font-size: 30px;
      padding: 10px 20px;
      cursor: pointer;
      background: $blue;
      color: white;
      transition: .3s;
      margin: 10px 0;
      text-shadow: 1px 2px 0 $drk-blue;

      &:hover {
        background: $drk-blue;
      }
    }
  }

  .wrongLetters {
    font-size: 20px;

    p {
      margin-bottom: 10px;
    }

    li {
      display: inline-block;
      font-size: 40px;
      background: lighten(red, 15%);
      text-shadow: 1px 2px 0 red;
      padding: 10px;
      color: white;
      text-transform: uppercase;
      margin-right: 10px;
      animation: letteranim .3s ease;
    }
  }

  .message {
    display: none;
    padding: 20px;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    background: darken($drk-blue, 10%);
    z-index: 12402402;

    h1 {
      display: none;
      color: white;
      text-shadow: 1px 2px 0 #ccc;
    }

    .highlight {
      color: yellow;
      text-transform: capitalize;
    }

    .text {
      color: white;
      font-size: 30px;
      display: none;

      p {
        color: white;
      }

      .highlight {
        font-size: 40px;
      }
    }

    .muted {
      margin: 20px auto;
      color: lighten($blue, 10%);
    }
  }

  .button {
    display: none;
    margin: 10px 0;
    border: none;
    font-size: 30px;
    padding: 10px 20px;
    cursor: pointer;
    background: lighten($green, 5%);
    color: white;
    transition: .3s;
    text-shadow: 1px 2px 0 $green;
    font-family: "Londrina Solid", cursive;

    &:hover {
      background: lighten($green, 20%);

    }
  }
</style>
