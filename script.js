var pomodoro = {
  started: false,
  minutes: 0,
  seconds: 0,
  fillerIncrement: 0,
  interval: null,
  minutesDom: null,
  secondsDom: null,
  init: function () {
    var self = this;
    this.minutesDom = document.querySelector("#min");
    this.secondsDom = document.querySelector("#sec");
    this.interval = setInterval(function () {
      self.intervalCallback.apply(self);
    }, 1000);
    document.querySelector("#start").onclick = function () {
      self.startWork.apply(self);
    };
    document.querySelector("#shortBreak").onclick = function () {
      self.startShortBreak.apply(self);
    };
    document.querySelector("#longBreak").onclick = function () {
      self.startLongBreak.apply(self);
    };
    document.querySelector("#stop").onclick = function () {
      self.stopTimer.apply(self);
    };
  },
  resetVariables: function (mins, secs, started) {
    this.minutes = mins;
    this.seconds = secs;
    this.started = started;
    this.fillerIncrement = 200 / (this.minutes * 60);
  },
  startWork: function () {
    this.resetVariables(25, 0, true);
  },
  startShortBreak: function () {
    this.resetVariables(5, 0, true);
  },
  startLongBreak: function () {
    this.resetVariables(15, 0, true);
  },
  stopTimer: function () {
    this.resetVariables(25, 0, false);
    this.updateDom();
  },
  toDoubleDigit: function (num) {
    if (num < 10) {
      return "0" + parseInt(num, 10);
    }
    return num;
  },
  updateDom: function () {
    this.minutesDom.innerHTML = this.toDoubleDigit(this.minutes);
    this.secondsDom.innerHTML = this.toDoubleDigit(this.seconds);
  },
  intervalCallback: function () {
    if (!this.started) return false;
    if (this.seconds == 0) {
      if (this.minutes == 0) {
        this.timerComplete();

        const music = new Audio("audio.mp3");
        music.play();
        music.loop = true;
        music.playbackRate = 2;

        return;
      }
      this.seconds = 59;
      this.minutes--;
    } else {
      this.seconds--;
    }
    this.updateDom();
  },
  timerComplete: function () {
    this.started = false;
    this.fillerHeight = 0;
  },
};

window.onload = function () {
  pomodoro.init();
};

const boxs = document.querySelectorAll(".box");
boxs.forEach((box) => {
  box.addEventListener("click", function () {
    document.body.style.backgroundColor = box.textContent;
  });
});
