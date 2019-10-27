<template>
  <div id="wrapper">
    <div class="container">
      <div class="row mt-3">
        <div id="wordsearch_grid" class="col-auto mt-1 mb-4 pl-sm-5 pr-sm-3 px-md-0 mx-auto">
          <div class="row justify-content-center" v-for="(_, row) in sizeInt" :key="row">
            <div class="col border" v-for="(_, col) in sizeInt" :key="`${row}_${col}`">
              <div :class="letterTileClasses(col, row)"
                   :data-x="col" :data-y="row"
                   @mousedown.prevent="wordSelectStart"
                   @mouseup="wordSelectUpdate"
                   @mousemove="wordSelectUpdate"
                   @touchstart.prevent="wordSelectStart"
                   @touchend="wordSelectUpdate"
                   @touchmove="wordSelectUpdate"
              >
                <svg width="100%" height="100%" viewBox="0 0 18 18">
                  <text x="50%" y="13" text-anchor="middle">{{ gridVal(col, row) }}</text>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center w-100">
          <button v-if="isGameOver" :to="{name: 'levels'}" class="guessButton">Next Game!</button>
          <div v-if="isGameOver" class="message">
            <h1 class="title">
              Congratulations you won!
            </h1>
          </div>
        </div>


        <div class="col-12">
          <h2 class="text-center">Words</h2>
          <div class="words text-center">
            <span :class="wordListClasses(word)"
                  v-for="word in usedWords"
                  :key="word"
                  class="p-2"
            >{{word}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'Helper',
	data() {
		return {
			debugEnabled: false,
			size: 0,
			words: [],
			usedWords: [],
			foundWords: [],
			letterGrid: [[]],
			foundTiles: [],
			guess: [],
			selectedRange: {
				start: undefined,
				end: undefined,
			},
			isGameOver: false
		};
	},
	mounted() {
		this.words = this.getWordList(this.$route.params.realm_id, this.$route.params.level_id);
		this.size = Math.max(...this.words.map(word => word.length)) + 2;
		this.rebuildGrid();
	},
	computed: {
		...mapGetters(['getWordList']),
		sizeInt() {
			return parseInt(this.size, 10);
		},
		guessedWord() {
			return this.guess.map(l => this.gridVal(l.x, l.y)).join('');
		},
	},
	methods: {
		removeWord(index) {
			this.words.splice(index, 1);
		},
		addWord() {
			this.words.push('');
		},
		wordListClasses(word) {
			const classes = ['badge', 'badge-pill', 'badge-primary'];
			if (this.foundWords.indexOf(word) !== -1) {
				classes.push('badge-success');
			}
			return classes;
		},
		isTileActive(x, y) {
			for (let i = 0; i < this.guess.length; i += 1) {
				if (this.guess[i].x === x && this.guess[i].y === y) {
					return true;
				}
			}
			return false;
		},
		isTileHighlighted(x, y) {
			if (this.selectedRange.start && this.selectedRange.end) {
				const r = this.selectedRange;

				const minX = Math.min(r.start.x, r.end.x);
				const maxX = Math.max(r.start.x, r.end.x);
				const minY = Math.min(r.start.y, r.end.y);
				const maxY = Math.max(r.start.y, r.end.y);

				if (x >= minX && x <= maxX && y >= minY && y <= maxY) {
					// in range. If X or Y are equal then it's a straight line, otherwise
					// Work out diagonal logic.
					return (
						r.start.x === r.end.x ||
						r.start.y === r.end.y ||
						(Math.abs(r.start.x - x) === Math.abs(r.start.y - y))
					);
				}
			}
			return false;
		},
		isTileAFoundWordTile(x, y) {
			for (let i = 0; i < this.foundTiles.length; i += 1) {
				if (this.foundTiles[i].x === x && this.foundTiles[i].y === y) {
					return true;
				}
			}
			return false;
		},
		letterTileClasses(x, y) {
			const classes = ['letter-tile'];

			if (this.isTileActive(x, y)) {
				classes.push('letter-tile-selected');
			}

			if (this.isTileHighlighted(x, y)) {
				classes.push('letter-tile-highlighted');
			}

			if (this.isTileAFoundWordTile(x, y)) {
				classes.push('letter-tile-found');
			}

			return classes;
		},
		wordSelectStart(event) {
			const touchedElement = event.target.closest('div.letter-tile');
			if (touchedElement && touchedElement.dataset && touchedElement.dataset.x) {
				this.selectedRange.start = {
					x: parseInt(touchedElement.dataset.x, 10),
					y: parseInt(touchedElement.dataset.y, 10),
				};
				return true;
			}
			return false;
		},
		wordSelectUpdate(event) {
			// We never started selecting, bail early.
			if (this.selectedRange.start === undefined) {
				return false;
			}
			let touch = event;

			if (event.type.indexOf('touch') === 0) {
				touch = event.changedTouches.item(0);
			}

			const touchedElement = document.elementFromPoint(touch.clientX, touch.clientY).closest('div.letter-tile');

			if (touchedElement && touchedElement.dataset && touchedElement.dataset.x) {
				const x = parseInt(touchedElement.dataset.x, 10);
				const y = parseInt(touchedElement.dataset.y, 10);

				const dx = Math.abs(x - this.selectedRange.start.x);
				const dy = Math.abs(y - this.selectedRange.start.y);

				// Verify the end is valid.
				// If dy (change in y) or dx (change in x) is zero, then it is horizontal/vertcal == OK.
				// Or if dx === dy, then it is diagonal.
				if ((dy === 0 && dx > 0) ||
					(dx === 0 && dy > 0) ||
					(dx === dy)) {
					this.selectedRange.end = { x, y };

					// If it's mouseup, then we finished the dragging a range
					if (event.type === 'mouseup' || event.type === 'touchend') {
						this.guess = [];
						// Build guess!
						const sx = this.selectedRange.start.x;
						const sy = this.selectedRange.start.y;
						const ex = this.selectedRange.end.x;
						const ey = this.selectedRange.end.y;

						if (dx === 0) {
							// Vertical
							const step = ey > sy ? 1 : -1;
							for (let i = sy; step > 0 ? (i <= ey) : (i >= ey); i += step) {
								this.guess.push({ x: sx, y: i });
							}
						} else if (dy === 0) {
							// Horizontal
							const step = ex > sx ? 1 : -1;
							for (let i = sx; step > 0 ? (i <= ex) : (i >= ex); i += step) {
								this.guess.push({ x: i, y: sy });
							}
						} else {
							// Diagonal
							const stepX = ex > sx ? 1 : -1;
							const stepY = ey > sy ? 1 : -1;
							for (
								let iX = sx, iY = sy;
								(stepY > 0 ? (iY <= ey) : (iY >= ey)) || (stepX > 0 ? (iX <= ex) : (iX >= ex));
								iY += stepY, iX += stepX
							) {
								this.guess.push({ x: iX, y: iY });
							}
						}

						if (this.usedWords.indexOf(this.guessedWord) !== -1) {
							this.foundWords.push(this.guessedWord);
							this.$emit('updateEvent', { type: 'playerGuessed', multi: 1 });
							this.foundTiles.push(...this.guess);

							if (this.foundWords.length === this.words.length) {
								this.win();
							}
						}


						// Gesture complete, reset the range.
						this.resetSelectedRange();
					}
				} else if (event.type === 'mouseup' || event.type === 'touchend') {
					// Verify failed, reset range (only if at the end of a gesture)
					this.resetSelectedRange();
				} else {
					this.selectedRange.end = undefined;
				}
			} else if (event.type === 'mouseup' || event.type === 'touchend') {
				// End was "null" or had no x/y. Reset.
				this.resetSelectedRange();
			} else {
				this.selectedRange.end = undefined;
			}
			return true;
		},
		resetSelectedRange() {
			this.selectedRange = {
				start: undefined,
				end: undefined,
			};
		},
		gridVal(x, y) {
			if (typeof this.letterGrid[y] !== 'undefined') {
				if (typeof this.letterGrid[y][x] !== 'undefined') {
					return this.letterGrid[y][x];
				}
			}
			return '';
		},
		rebuildGrid() {
			// Init letterGrid...
			this.letterGrid = [...Array(this.sizeInt)].map(() => Array(this.sizeInt));
			this.usedWords = [];
			this.foundWords = [];
			this.foundTiles = [];
			this.guess = [];

			// Build letterGrid.
			this.words.forEach((word) => {
				if (word.length > this.sizeInt) {
					console.error('Word wont fit on board'); // eslint-disable-line no-console
					return;
				}
				let isValid = false;
				let x = 0;
				let y = 0;
				let dx = 0;
				let dy = 0;
				let itterationCount = 0;

				do {
					itterationCount += 1;
					if (itterationCount > 100) {
						console.error('Tried to write word 100 times and failed', word); // eslint-disable-line no-console
						return;
					}

					x = Math.floor(Math.random() * this.sizeInt);
					y = Math.floor(Math.random() * this.sizeInt);
					dx = 0;
					dy = 0;
					isValid = false; // Assume invalid until proven OK.

					const direction = Math.floor(Math.random() * 8);
					if (direction > 0 && direction < 4) {
						dx = 1;
					} else if (direction > 4 && direction < 8) {
						dx = -1;
					}
					if (direction < 2 || direction > 6) {
						dy = -1;
					} else if (direction > 2 && direction < 6) {
						dy = 1;
					}

					try {
						const endX = x + (dx * word.length);
						if (endX < 0 || endX > this.sizeInt) {
							throw new Error('Word exceeds width');
						}
						const endY = y + (dy * word.length);
						if (endY < 0 || endY > this.sizeInt) {
							throw new Error('Word exceeds height');
						}
						// If we have got here, then it fits on the grid!
						// Simulate laying it to check for overlap.
						for (let cIndex = 0; cIndex < word.length; cIndex += 1) {
							const xCord = x + (cIndex * dx);
							const yCord = y + (cIndex * dy);
							if (this.letterGrid[yCord][xCord] !== undefined) {
								if (this.letterGrid[yCord][xCord] !== word[cIndex]) {
									throw new Error('Letter Overlap');
								}
							}
						}

						isValid = true;
					} catch (err) {
						if (this.debugEnabled) {
							console.log(`DEBUG: ${err.message}`, word, x, y, dx, dy); // eslint-disable-line no-console
						}
						isValid = false;
					}
				} while (!isValid);

				// Has been found valid, so write it in.
				this.usedWords.push(word);
				for (let cIndex = 0; cIndex < word.length; cIndex += 1) {
					const xCord = x + (cIndex * dx);
					const yCord = y + (cIndex * dy);
					this.letterGrid[yCord][xCord] = word[cIndex];
				}
			});

			// Now fille in the rest of the grid.
			const alphabet = 'abcdefghijklmnopqrstuvwxyz';
			for (let y = 0; y < this.sizeInt; y += 1) {
				for (let x = 0; x < this.sizeInt; x += 1) {
					if (this.letterGrid[y][x] === undefined) {
						this.letterGrid[y][x] = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
					}
				}
			}
		},
		win: function () {
			this.isGameOver = true;
			this.showMsg();
		},
		showMsg: function () {
			const msg = $('.message');
			const msgTitle = $('.message .title');

			const soundWin = new Audio("https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/win.mp3");
			soundWin.volume = .8;
		  soundWin.play();

			msg.show("blind", function () {
				msgTitle.show("bounce");
			});
		}
	},
};
</script>
<style lang="scss" scoped>
  .settings-icon {
    fill: #ccc;
  }

  .letter-tile {
    padding: 100% 0 0;
    cursor: pointer;

    svg {
      position: absolute;
      left: 0;
      top: 0;
      line-height: 0;
      width: 100%;
      fill: #ccc;
    }

    transition: background ease-in 0.1s;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    &.letter-tile-selected {
      background: rgba(0, 255, 255, 0.2);
    }

    &.letter-tile-found {
      background: rgba(0, 255, 0, 0.2);
    }

    &.letter-tile-highlighted {
      background: rgba(255, 255, 0, 0.2);
    }
  }

  #wordsearch_grid {
    min-width: calc(90vw - 50px);

    @media screen and (min-width: 100vh) {
      min-width: calc(90vh - 50px);
    }

    .col {
      padding: 0;

      &:not(:last-child) {
        border-right-width: 0 !important;
      }
    }

    .row {
      &:not(:last-child) {
        .col {
          border-bottom-width: 0 !important;
        }
      }
    }
  }

  .words {
    .badge {
      margin: 0 0.5em 0.5em 0;
      font-size: 1.5rem;
    }
  }

  $blue: #53BDFF;
  $green: #2EB933;
  $drk-blue: darken($blue, 10%);

  .settings-icon {
    fill: #ccc;
  }

  .letter-tile {
    padding: 100% 0 0;
    cursor: pointer;

    svg {
      position: absolute;
      left: 0;
      top: 0;
      line-height: 0;
      width: 100%;
      fill: #ccc;
    }

    transition: background ease-in 0.1s;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    &.letter-tile-selected {
      background: rgba(0, 255, 255, 0.2);
    }

    &.letter-tile-found {
      background: rgba(0, 255, 0, 0.2);
    }

    &.letter-tile-highlighted {
      background: rgba(255, 255, 0, 0.2);
    }
  }

  #wordsearch_grid {
    min-width: calc(90vw - 50px);

    @media screen and (min-width: 100vh) {
      min-width: calc(90vh - 50px);
    }

    .col {
      padding: 0;

      &:not(:last-child) {
        border-right-width: 0 !important;
      }
    }

    .row {
      &:not(:last-child) {
        .col {
          border-bottom-width: 0 !important;
        }
      }
    }
  }

  .words {
    .badge {
      margin: 0 0.5em 0.5em 0;
      font-size: 1.5rem;
    }
  }

  $blue: #53BDFF;
  $green: #2EB933;
  $drk-blue: darken($blue, 10%);

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


</style>
