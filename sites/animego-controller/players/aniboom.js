const actions = {
  enterFullscreen() {
    document.querySelector('video').requestFullscreen();
  },

  play() {
    document.querySelector('video').click();
  },

  leaveFullscreen() {
    document.exitFullscreen();
  },

  selectQuality(res) {
    const qualityRegex = /^\d{3,4}p$/;

    const resolutions = Array.from(document.querySelectorAll('.vjs-menu-item-text'))
      .filter(elem => qualityRegex.test(elem.innerText));

    const resolution = resolutions.find(({ innerText }) => innerText === `${res}p`);

    if (resolution) {
      resolution.click();
    }
  },
};

socketFactory('localhost:3000', actions);