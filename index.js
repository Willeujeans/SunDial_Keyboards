let sun = {
    container: document.createElement("div"),
    createWheels: (n) => { 
        let size = 600;
        let speed = 35;
        let color = {r:0,g:0,b:0};
        let z = n;
        for (let x = 0; x < n; x++){
            let wheel = document.createElement("div");
            wheel.classList.add("wheel");
            wheel.classList.add("circle");
            wheel.classList.add("shadow");
            wheel.style.animation = "roll linear infinite "+speed+"s";
            wheel.style.background = "rgb(" + color.r + "," + color.g + "," + color.b + ")";
            wheel.style.height = size+"px";
            wheel.style.width = size+"px";
            wheel.style.zIndex = z;
          z -= 1;
          if (x%2==0) {
            size += 2;
            color.r = 255;
            color.g = 120;
            color.b = 75;
          } else {
            speed *= 1.7;
            size *= 1.5;
            color.r = 3;
            color.g = 3;
            color.b = 3;
          }
            rotation = 0;
            spokeCount = 6;
            for (let k = 0; k < spokeCount; k++){
                let spokeHolder = document.createElement("div");
                spokeHolder.style.transform = "rotate("+rotation+"deg)";
                spokeHolder.classList.add("spokeHolder");
                wheel.appendChild(spokeHolder);
                rotation += (360 / (spokeCount * 2));
                // spokeHolder.classList.add("circle");
                // for (let y = 0; y < spokeCount; y++){
                //     let spoke = document.createElement("div");
                //     spoke.classList.add("spoke");
                //     spoke.classList.add("center");
                //     spoke.classList.add("circle");
                //     if(y == 0) {
                //         spoke.classList.add("L");
                //     }else if(y == 1){
                //         spoke.classList.add("R");
                //     }else if(y == 2){
                //         spoke.classList.add("T");
                //     }else{
                //         spoke.classList.add("B");
                //     }
                //     spokeHolder.appendChild(spoke);
                // }
            }
          sun.container.appendChild(wheel);
          // sun.container.appendChild(document.getElementById("keyboardRotate"));
        }
    },
    initilize: () => {
        sun.createWheels(5);
        sun.container.classList.add("sunContainer");
        document.getElementById("landing").appendChild(sun.container);
    },
}
sun.initilize();


function rand(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}
let keyboard = {
    board: document.getElementById("keyboard"),
    arrayOfKeys: [],
    spaceVisual: document.createElement("div"),
    inputs: ()=>{
      document.body.addEventListener("keydown",(event)=>{
        if(event.key == " "){
            keyboard.spaceVisual.classList.add("keyLight");
            setTimeout(() => {
                keyboard.spaceVisual.classList.remove("keyLight");
            },500);
        }else{
          let index = rand(0,keyboard.arrayOfKeys.length);
            keyboard.arrayOfKeys[index].classList.add("keyLight");
            setTimeout(() => {
                keyboard.arrayOfKeys[index].classList.remove("keyLight");
            },500);
        }
      })
    },
    buildBoard:()=>{
      for(let x=0;x<3;x++){
        let row = document.createElement("div");
        row.classList.add("keyRow");
        keyboard.board.appendChild(row);
        if(x>=2){
          keyboard.spaceVisual.classList.add("keyVisual");
          row.appendChild(keyboard.spaceVisual);
        }else{
          for(let y=0;y<8;y++){
          let keyVisual = document.createElement("div");
          keyboard.arrayOfKeys.push(keyVisual);
          keyVisual.classList.add("keyVisual");
          row.appendChild(keyVisual);
        }
        }
      }
    },
    initilize:()=>{
      keyboard.buildBoard();
      keyboard.inputs();
    },
}
keyboard.initilize();
  

let store={
  decrease: document.getElementById("decreaseButton"),
  increase: document.getElementById("increaseButton"),
  displayNumber: document.getElementById("purchaseNumber"),
  number: 1,
  events:()=>{
    store.decrease.addEventListener("click",()=>{
      if(store.number > 1){
        store.number-=1;
        store.displayNumber.innerHTML = store.number;
      }
    })
    store.increase.addEventListener("click",()=>{
      if(store.number <=99){
        store.number+=1;
        store.displayNumber.innerHTML = store.number;
      }
    })
  },
  initilize:()=>{
    store.events();
  }
}
store.initilize();
  

document.getElementById("spineo").playbackRate = 0;



const tiltEffectSettings = {
  max: 10, // max tiltElement rotation (degrees (deg))
  perspective: 4000, // transform perspective, the lower the more extreme the tiltElement gets (pixels (px))
  scale: 1.05, // transform scale - 2 = 200%, 1.5 = 150%, etc..
  speed: 500, // speed (transition-duration) of the enter/exit transition (milliseconds (ms))
  easing: "cubic-bezier(.03,.98,.52,.99)" // easing (transition-timing-function) of the enter/exit transition
};

const tiltElements = document.getElementsByClassName("tilt");
for (let key of tiltElements){
  key.addEventListener("mouseenter", tiltMouseEnter);
  key.addEventListener("mousemove", tiltMouseMove);
  key.addEventListener("mouseleave", tiltMouseLeave);
}

function tiltMouseEnter(event) {
  setTransition(event);
}

function tiltMouseMove(event) {
  const tiltElement = event.currentTarget;
  const tiltWidth = tiltElement.offsetWidth;
  const tiltHeight = tiltElement.offsetHeight;
  const centerX = tiltElement.getBoundingClientRect().left + tiltWidth/2;
  const centerY = tiltElement.getBoundingClientRect().top + tiltHeight/2;
  const mouseX = event.clientX - centerX;
  const mouseY = event.clientY - centerY;
  const rotateXUncapped = tiltEffectSettings.max*mouseY/(tiltHeight/2);
  const rotateYUncapped = (-1)*tiltEffectSettings.max*mouseX/(tiltWidth/2);
  const rotateX = rotateXUncapped < -tiltEffectSettings.max ? -tiltEffectSettings.max : 
                  (rotateXUncapped > tiltEffectSettings.max ? tiltEffectSettings.max : rotateXUncapped);
  const rotateY = rotateYUncapped < -tiltEffectSettings.max ? -tiltEffectSettings.max : 
                  (rotateYUncapped > tiltEffectSettings.max ? tiltEffectSettings.max : rotateYUncapped);

  tiltElement.style.transform = `perspective(${tiltEffectSettings.perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) 
                          scale3d(${tiltEffectSettings.scale}, ${tiltEffectSettings.scale}, ${tiltEffectSettings.scale})`;
}

function tiltMouseLeave(event) {
  event.currentTarget.style.transform = `perspective(${tiltEffectSettings.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  setTransition(event);
}

function setTransition(event) {
  const tiltElement = event.currentTarget;
  clearTimeout(tiltElement.transitionTimeoutId);
  tiltElement.style.transition = `transform ${tiltEffectSettings.speed}ms ${tiltEffectSettings.easing}`;
  tiltElement.transitionTimeoutId = setTimeout(() => {
      tiltElement.style.transition = "";
  }, tiltEffectSettings.speed);
}

//midpoint == 0