const actions = {
  selectEpisode(ep) {
    document.querySelector(`.video-player-bar-series-item[data-episode="${ep}"]`).click();
  },
};

socketFactory('localhost:3000', actions);
