const inner = document.getElementById('inner');

let scrollAmt = localStorage.getItem("scrollAmt")*1 || 0;
let offsetAmt = 0;
let maxScroll = inner.children.length*415;
let debug = 0;
let isHovering = false;

for (var i = 0; i < inner.children.length; i++) {
    inner.children[i].style.transform = `translate(${(offsetAmt+scrollAmt)%maxScroll-415}px)`
    debug = (scrollAmt%maxScroll);
    offsetAmt += 415;
}

setInterval(() => {
    offsetAmt = 0;
    scrollAmt += 0.5;
    isHovering = false;

    for (var i = 0; i < inner.children.length; i++) {
        inner.children[i].style.transform = `translate(${(offsetAmt+scrollAmt)%maxScroll-415}px)`
        debug = (scrollAmt%maxScroll);
        offsetAmt += 415;
    }
    localStorage.setItem("scrollAmt", scrollAmt);
}, 1)
