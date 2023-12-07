const startGame = getById("startGame");

startGame.addEventListener("click", () => {
  screenSelect.gameScreen.classList.toggle("disabled-screen");
  screenSelect.mainScreen.classList.toggle("disabled-screen");
  startGame.disabled = true;
  main();
});

function main() {
  const state = {
    view: {
      squares: document.querySelectorAll(".row__square"),
      enemy: document.querySelectorAll(".enemy"),
      timeLeft: getById("time-left"),
      score: getById("score"),
      lives: getById("lives"),
      audioPlay: getById("audio"),
      countStart: getById("countStart"),
    },
    values: {
      timerId: null,
      hitPosition: 0,
      result: 0,
      livesPlayer: controll.values.lives,
      currentTime: 60,
      prevSquare: -1,
    },
    actions: {
      timerId: setInterval(randomSquare, 1000 / controll.values.difficult),
      countDownTimerId: setInterval(countDown, 1000),
      isClick: false,
    },
  };
  function playSoundBg(audioName = "", audioVolume = 100) {
    state.view.audioPlay.src = `./src/audio/${audioName}.m4a`;
    state.view.audioPlay.volume = audioVolume / 100;
    state.view.audioPlay.play();
  }

  function playSoundHit(nameAudio = "", volume = 100){
    const audio = new Audio(`./src/audio/${nameAudio}.m4a`);
    audio.volume = volume / 100;  
    audio.play();
  }

  function randomSquare() {
    state.view.squares.forEach((square) => {
      square.classList.remove("enemy");
    });
    let randomNumber = Math.floor(Math.random() * 9);
    state.values.prevSquare !== randomNumber
      ? (state.values.prevSquare = randomNumber)
      : (randomNumber = Math.floor(Math.random() * 9));

    let setSquare = state.view.squares[randomNumber];
    setSquare.classList.add("enemy");
    state.values.hitPosition = setSquare.id;
  }

  function countDown() {
    state.view.timeLeft.textContent = state.values.currentTime;
    state.values.currentTime--;
    // let target = document.querySelectorAll(".target");
    // target.forEach((target) => (target.style.display = "none"));
    state.actions.isClick = false;
    if (state.values.currentTime <= 0) {
      clearInterval(state.actions.countDownTimerId);
      clearInterval(state.actions.timerId);
      alert(`Game Over! O seu resultado foi: ${state.values.result}`);
      screenSelect.gameScreen.classList.toggle("disabled-screen");
      screenSelect.mainScreen.classList.toggle("disabled-screen");  
      startGame.disabled = false;
      state.view.countStart.classList.toggle("anim-count-start");

    }
  }
  function addListenerHitBox() {
    if (!state.actions.isClick) {
      state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
          if (square.id === state.values.hitPosition) {
            state.values.result++;
            state.view.score.textContent = state.values.result;
            state.values.hitPosition = null;
            playSoundHit("hit",25); //procentagem do volume
            square.children[0].style.display = "block";
            state.actions.isClick = true;
          }
          if (!state.actions.isClick) {
            state.values.livesPlayer--;
            playSoundHit("failHit", 100)
            if (state.values.livesPlayer === 0) {
              state.values.currentTime = 0;
              playSoundBg("endG", 50, false);
            }
          }
          state.view.lives.textContent = state.values.livesPlayer;
        });
      });
    }
  }

  function animStartGameCount() {
      state.view.countStart.classList.toggle("anim-count-start");
  }
  
  function initialize() {
    playSoundBg("bgG", 80, true); //nome do audio e procentagem do volume
    addListenerHitBox();
    state.view.lives.textContent = controll.values.lives;
  }
  setTimeout(animStartGameCount(), 1500);
  initialize();
}