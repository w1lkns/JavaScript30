/* Get elements */

const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

/* build out functions */

const togglePlay = () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
};

const updatePlayButton = () => {
  const icon = video.paused ? "►" : "⏸";
  toggle.textContent = icon;
};

const skip = (e) => {
  const skipVal = parseFloat(e.currentTarget.dataset.skip);
  console.log(skipVal);
  video.currentTime += skipVal;
};

const handleRangeUpdate = (e) => {
  let newSpeed = e.currentTarget.value;
  video.playbackRate = newSpeed;
};

const handleProgress = (e) => {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
};

const scrub = (e) => {
  console.log("e.offsetX: ", e.offsetX);
  console.log("progress.offsetWidth: ", progress.offsetWidth);
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
};

/* Hook up the event listners */
video.addEventListener("click", togglePlay);
video.addEventListener("play", updatePlayButton);
video.addEventListener("pause", updatePlayButton);
video.addEventListener("timeupdate", handleProgress);
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));

let mousedown = false;

toggle.addEventListener("click", togglePlay);
skipButtons.forEach((button) => button.addEventListener("click", skip));
ranges.forEach((range) => range.addEventListener("change", handleRangeUpdate));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
