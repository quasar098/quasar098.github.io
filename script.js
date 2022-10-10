const inner = document.getElementById('inner');
const left = document.getElementById('sleft');
const right = document.getElementById('sright');

setInterval(() => {
    left.style.display = inner.scrollLeft != 0 ? "flex" : 'none';
    right.style.display = inner.scrollWidth-inner.getBoundingClientRect().width != inner.scrollLeft ? 'flex' : 'none';
    inner.scrollLeft = inner.scrollLeft*0.95+goalScroll*0.05;
}, 5)

goalScroll = 0;

right.addEventListener("click", (e) => {
    goalScroll += 100;
});
left.addEventListener("click", (e) => {
    goalScroll -= 100;
});
