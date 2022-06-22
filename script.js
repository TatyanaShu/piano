window.onload = function () {
	const changeBtn = document.querySelector(".btn-container");
	const btnN = document.querySelector(".btn-notes");
	const btnL = document.querySelector(".btn-letters");
  
	//переключение режимов пианино
	btnL.addEventListener("click", () => {
	  if (btnN.classList.contains("btn-active")) {
		btnN.classList.remove("btn-active");
		btnL.classList.add("btn-active");
		keys.forEach((elem) => {
		  elem.classList.toggle("piano-key-letter");
		  elem.classList.toggle("letter");
		});
	  }});
	  btnN.addEventListener("click", () => {
	  if (btnL.classList.contains("btn-active")) {
		btnL.classList.remove("btn-active"); 
		btnN.classList.add("btn-active");
		keys.forEach((elem) => {
		  elem.classList.toggle("piano-key-letter");
		  elem.classList.toggle("letter");
		});
	  }
	});
  
	// полноэкранный режим
	const screen = document.querySelector(".fullscreen");
	screen.addEventListener("click", toggleScreen);
	function toggleScreen() {
	  if (!document.fullscreenElement) {
		document.documentElement.requestFullscreen();
	  } else {
		if (document.fullscreenEnabled) {
		  document.exitFullscreen();
		}
	  }
	}
  
	// реализация проигрывания клавиш
  
	const piano = document.querySelector(".piano");
	const keys = document.querySelectorAll(".piano-key");
  
	// события мыши
  
	function keyAddClass(event) {
	  event.target.classList.add("piano-key-active");
	  const note = event.target.dataset.note;
	  const src = `assets/audio/${note}.mp3`;
	  playMouse(src);
	}
	function keyRemoveClass(event) {
	  event.target.classList.remove("piano-key-active");
	}
  
	function startCorrespond(event) {
	  if (event.target.classList.contains("piano-key")) {
		keyAddClass(event)
	  }
	  keys.forEach((elem) => {
		elem.addEventListener("mouseover", keyAddClass);
		elem.addEventListener("mouseout", keyRemoveClass);
	  });
	}
	function stopCorrespond() {
	  keys.forEach((elem) => {
		elem.classList.remove("piano-key-active");
		elem.removeEventListener("mouseover", keyAddClass);
		elem.removeEventListener("mouseout", keyRemoveClass);
	  });
	}
	function playMouse(src) {
	  const audioMouse = new Audio();
	  audioMouse.src = src;
	  audioMouse.currentTime = 0;
	  audioMouse.play();
	}
  
	piano.addEventListener("mousedown", startCorrespond);
	piano.addEventListener("mouseleave", stopCorrespond);
	piano.addEventListener("mouseup", stopCorrespond);
  
	// события клавиатуры
	window.addEventListener("keydown", playKeybord);
	window.addEventListener("keyup", ()=>{
	  event.target.classList.remove("piano-key-active");
	});
	function playKeybord(event) {
	  const audio = document.querySelector(`audio[data-key="${event.code}"]`);
	  const letters = document.querySelector(
		`.piano-key[data-key="${event.code}"]`
	  );
	  if(event.repeat==false){
		play(audio);
	  } else (
		event.repeat == true
	  )
	  
	  letters.classList.add("piano-key-active");
	}
	
	function play(audio) {
	  if (!audio) return;
	  // audio.currentTime = 0;
	  audio.play();
	}
	function removeTransform(e) {
	  if (e.propertyName !== "transform") return;
	  this.classList.remove("piano-key-active");
	}
	keys.forEach((letters) => {
	  letters.addEventListener("transitionend", removeTransform);
	});
  };