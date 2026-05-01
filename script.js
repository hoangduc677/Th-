window.onload = function(){

/* INTRO */
const lines = [
"Chúng ta đã từng nghĩ...",
"Những ngày này sẽ kéo dài mãi mãi...",
"Rồi một ngày...",
"mọi thứ trở thành ký ức...",
"Chuyến Tàu Thanh Xuân 💙"
];

let i = 0;
const text = document.getElementById("text");

function show(){
  if(i >= lines.length){
    document.getElementById("intro").style.display="none";
    return;
  }

  text.classList.remove("show");

  setTimeout(()=>{
    text.innerHTML = lines[i];
    text.classList.add("show");
    i++;
  },300);

  setTimeout(show,2000);
}

show();

/* chống đen */
setTimeout(()=>{
  document.getElementById("intro").style.display="none";
},8000);

/* skip */
document.getElementById("skip").onclick = ()=>{
  document.getElementById("intro").style.display="none";
};

/* LOGIN */
window.login = function(){
  let n = document.getElementById("nick").value;
  if(!n) return;

  localStorage.setItem("nick",n);
  document.getElementById("login").style.display="none";
  document.getElementById("userTag").innerText="👤 "+n;
}

if(localStorage.getItem("nick")){
  document.getElementById("login").style.display="none";
  document.getElementById("userTag").innerText="👤 "+localStorage.getItem("nick");
}

/* MUSIC */
const music = document.getElementById("music");
const btn = document.getElementById("btn");

let play = false;

btn.onclick = ()=>{
  if(!play){
    music.play();
    btn.innerText="⏸";
  }else{
    music.pause();
    btn.innerText="▶";
  }
  play = !play;
}

/* LIGHTBOX */
const imgs = document.querySelectorAll(".gallery img");
const lightbox = document.getElementById("lightbox");
const lightImg = document.getElementById("lightboxImg");

imgs.forEach(img=>{
  img.onclick = ()=>{
    lightbox.style.display="flex";
    lightImg.src = img.src;
  }
});

lightbox.onclick = ()=>{
  lightbox.style.display="none";
}

}
