const actions = {
  enterFullscreen() {
    player.flowApi.fullscreen();
  },

  play() {
    player.api.play();
  },
  
  pause() {
    player.api.pause();
  },

  leaveFullscreen() {
    player.flowApi.fullscreen()
  },

  selectEpisode(ep) {
    document.querySelector(`.video-player-bar-series-item[data-episode="${ep}"]`).click();
  },

  selectQuality(res) {
    document.querySelector(`div[data-quality="${res}"]`).click();
  },

  //mute -> player.api.mute()
  //unmute -> player.api.unmute()
};

socketFactory('localhost:3000', actions);
