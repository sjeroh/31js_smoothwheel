let gallery=document.querySelector('.hero_gallery');
let galleryWrapper=gallery.querySelector('.hero_gallery_wrapper');

let galleryImages=gallery.querySelectorAll('.hero_gallery_image');

let galleryWidth=galleryWrapper.getBoundingClientRect().width;

console.log(galleryWidth)

let scroll={
  current:0,
  target:0,
  ease:.05,
  speed:.25,
  limit:galleryWidth-window.innerWidth
}

let init=()=>{
  onResize();
};

let onResize=()=>{
  galleryImages=gallery.querySelectorAll('.hero_gallery_image');
  scroll.limit=galleryWidth-window.innerWidth
};

let onScroll=(e)=>{
  let speed=e.deltaY; //마우스휠을 올릴때와 내릴때 100,-100 이뜸.
  // console.log(speed)
  scroll.target += speed*scroll.speed;
  //0 += 델타스크롤값 100 or -100 * .25
  //+=하는 이유는 스크롤값이 들어갈때마다 계속계속 스피드에 속도를 추가하기 위함이다. 그래야 스무스하게 들어감.
  return speed;

};
function clamp(min,max,number){
  return Math.min(Math.max(number,min),max)
}

function lerp(p1,p2,p3){
  return p1+(p2 - p1)*p3
  // 스크롤이 움직일때 너무 많이 안움직이게 값을 줄여주는것
  
}

let update=()=>{
 scroll.target =clamp(0,scroll.limit,scroll.target)
//  console.log(scroll.target)
 scroll.current=lerp(scroll.current,scroll.target,scroll.ease)
 scroll.current = parseFloat(scroll.current.toFixed(2))
 console.log(scroll.current)

 galleryWrapper.style.transform=`translate3d(-${scroll.current}px,0,0)`

 window.requestAnimationFrame(update)

}
update();
window.addEventListener('resize',onResize);
window.addEventListener('wheel',onScroll);
//스크롤되면 온스크롤 함수를 불러서 써라.
window.addEventListener('load',()=>{
  init();
})