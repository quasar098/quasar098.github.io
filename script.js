function vh(percent) {
  var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  return (percent * h) / 100;
}

function vw(percent) {
  var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  return (percent * w) / 100;
}

function vmin(percent) {
  return Math.min(vh(percent), vw(percent));
}

function vmax(percent) {
  return Math.max(vh(percent), vw(percent));
}

const inner = document.getElementById('inner');

let scrollAmt = localStorage.getItem("scrollAmt")*1 || 0;
let offsetAmt = 0;
let maxScroll = inner.children.length*vh(45);
let debug = 0;
let isHovering = false;

window.onresize = () => {
    let maxScroll = inner.children.length*vh(45);
}

for (var i = 0; i < inner.children.length; i++) {
    inner.children[i].style.transform = `translate(${(offsetAmt+scrollAmt)%maxScroll-415}px)`
    debug = (scrollAmt%maxScroll);
    offsetAmt += vh(45);
}

function getMax() {
    return maxScroll;
}

setInterval(() => {
    offsetAmt = 0;
    scrollAmt += 1;
    isHovering = false;

    for (var i = 0; i < inner.children.length; i++) {
        inner.children[i].style.transform = `translate(${(offsetAmt+scrollAmt)%getMax()-415}px)`
        debug = (scrollAmt%maxScroll);
        offsetAmt += vh(45);
    }
    localStorage.setItem("scrollAmt", scrollAmt);
}, 10)
