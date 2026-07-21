const terminalText = document.getElementById("text");
const decrypt = document.getElementById("decrypt");

const messages = [
    "[ SYSTEM ] Initializing Heart_PROTOCOL_v2.0...",
    "[ STATUS ] Searching encrypted love file...",
    "[ FOUND ] LOVE_MESSAGE.dat",
    "[ SECURITY ] Blood encryption activated...",
    "[ STATUS ] Ready to decrypt..."
];


let line = 0;
let char = 0;


function typeEffect(){

    if(line < messages.length){

        if(char < messages[line].length){

            terminalText.innerHTML += messages[line][char];

            char++;

            setTimeout(typeEffect,45);

        }else{

            terminalText.innerHTML += "<br>";

            line++;
            char=0;

            setTimeout(typeEffect,500);
        }

    }

}

typeEffect();



decrypt.onclick = ()=>{

    document.getElementById("terminal").style.opacity="0";

    setTimeout(()=>{

        document.getElementById("terminal").style.display="none";
        document.getElementById("loveScene").style.display="block";

        startHeart();

    },1200);

};




// HEART ANIMATION


function startHeart(){


const canvas=document.getElementById("heartCanvas");
const ctx=canvas.getContext("2d");


canvas.width=window.innerWidth;
canvas.height=window.innerHeight;


let W=canvas.width;
let H=canvas.height;



window.addEventListener("resize",()=>{

W=canvas.width=innerWidth;
H=canvas.height=innerHeight;

});



let particles=[];



function heartShape(t){

return {

x:16*Math.pow(Math.sin(t),3),

y:
-(13*Math.cos(t)
-5*Math.cos(2*t)
-2*Math.cos(3*t)
-Math.cos(4*t))

};

}




class LoveParticle{


constructor(){


let angle=Math.random()*Math.PI*2;


let point=heartShape(angle);



this.targetX =
W/2 + point.x*18;



this.targetY =
H/2 + point.y*18;




// start far away

this.x=Math.random()*W;

this.y=Math.random()*H;



this.size=
Math.random()*7+8;



this.speed=
Math.random()*0.004+0.002;



this.word=[
"I love you",
"I love you",
"love you forever",
"forever"
]
[Math.floor(Math.random()*4)];



this.offset=Math.random()*20;



}



update(){

this.x +=
(this.targetX-this.x)
*this.speed;


this.y +=
(this.targetY-this.y)
*this.speed;


}



draw(){


let time=Date.now()*0.001;



// blur in and out

let blur =
12 + Math.sin(time+this.offset)*10;



let alpha =
0.35+
Math.sin(time+this.offset)*0.35;



ctx.save();


ctx.font=
`${this.size}px Courier New`;



ctx.fillStyle=
`rgba(150,15,45,${alpha})`;



ctx.shadowColor=
"#c81d3a";



ctx.shadowBlur=
blur;



ctx.fillText(
this.word,
this.x,
this.y
);



ctx.restore();



}



}




// more particles = softer heart

for(let i=0;i<3000;i++){

particles.push(
new LoveParticle()
);

}




let beat=0;



function animate(){


ctx.fillStyle=
"rgba(0,0,0,0.12)";


ctx.fillRect(
0,
0,
W,
H
);



beat+=0.025;



let pulse =
1+
Math.sin(beat)*0.035;



ctx.save();



ctx.translate(
W/2,
H/2
);



ctx.scale(
pulse,
pulse
);



ctx.translate(
-W/2,
-H/2
);



particles.forEach(p=>{

p.update();

p.draw();

});



ctx.restore();



requestAnimationFrame(animate);



}



animate();


}
