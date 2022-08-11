let CODE = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

let index = 0;
let ran = false;

function run() {
  if( ran ) return alert('Enough is enough');
  ran = true;
  let style = document.createElement('style');
  style.innerHTML = CSS;
  document.head.appendChild(style);
  document.body.classList.add('animated');
  document.body.classList.add('hinge')
}

function main() {
  document.addEventListener('keyup', e => {
    if( e.which != CODE[index] ) {
      index = 0;
      return;
    }

    index++;
    if( CODE.length === index ) {
      index = 0;
      run();
    }
  });
}

const CSS = `.animated {
  -webkit-animation-duration: 5s;
  animation-duration: 5s;
}

@-webkit-keyframes hinge {
  0% {
     -webkit-transform: rotate(0);
     -webkit-transform-origin: top left; 
     -webkit-animation-timing-function: ease-in-out;
  }
  20%, 60% {
     -webkit-transform: rotate(80deg); 
     -webkit-transform-origin: top left; 
     -webkit-animation-timing-function: ease-in-out;
  }
  40% {
     -webkit-transform: rotate(60deg);
     -webkit-transform-origin: top left;
     -webkit-animation-timing-function: ease-in-out;
  }
  80% {
     -webkit-transform: rotate(60deg) translateY(0);
     opacity: 1; 
     -webkit-transform-origin: top left; 
     -webkit-animation-timing-function: ease-in-out;
  }
  100% {
     -webkit-transform: translateY(700px);
     opacity: 0;
  }
}

@keyframes hinge {
  0% { 
     transform: rotate(0); 
     transform-origin: top left; 
     animation-timing-function: ease-in-out; 
  }
  20%, 60% { 
     transform: rotate(80deg); 
     transform-origin: top left; 
     animation-timing-function: ease-in-out; 
  }
  40% { 
     transform: rotate(60deg); 
     transform-origin: top left; 
     animation-timing-function: ease-in-out;
  }
  80% { 
     transform: rotate(60deg) translateY(0); 
     opacity: 1; 
     transform-origin: top left; 
     animation-timing-function: ease-in-out; 
  }
  100% { 
     transform: translateY(700px); 
     opacity: 0; 
  }
}

.hinge {
  -webkit-animation-name: hinge;
  animation-name: hinge;
}`;

export default main;