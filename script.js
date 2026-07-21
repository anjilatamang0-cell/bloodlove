const terminal = document.getElementById("terminal");
const scene = document.getElementById("loveScene");
const button = document.getElementById("decrypt");
const text = document.getElementById("text");


const boot = [
"[ SYSTEM ] Booting Heart Core...",
"[ SYSTEM ] Searching encrypted emotions...",
"[ FOUND ] LOVE_MESSAGE.dat",
"[ SECURITY ] Blood encryption enabled...",
"[ READY ] Waiting for decryption..."
];


let a=0,b=0;


function bootAnimation(){

    if(a < boot.length){

        if(b < boot[a].length){

            text.innerHTML += boot[a][b];
            b++;

            setTimeout(bootAnimation,35);

        }else{

            text.innerHTML+="<br>";
            a++;
            b=0;

            setTimeout(bootAnimation,300);
        }
    }
}

bootAnimation();



button.onclick=()=>{

    terminal.style.opacity="0";

    setTimeout(()=>{

        terminal.style.display="none";
        scene.style.display="block";

        createHeart();

    },1000);

};




// HEART ENGINE


function createHeart(){

const canvas=document.getElementById("heartCanvas");
const ctx=canvas.getContext("2d");


let W=canvas.width=innerWidth;
let H=canvas.height=innerHeight;


window.onresize=()=>{

W=canvas.width=innerWidth;
H=canvas.height=innerHeight;

};



let particles=[];



function heartPoint(t){

let x =
16*Math.pow(Math.sin(t),3);


let y =
13*Math.cos(t)
-5*Math.cos(2*t)
-2*Math.cos(3*t)
-Math.cos(4*t);


return {
x:x*15,
y:-y*15
};

}



class LoveParticle{


constructor(){


let t=Math.random()*Math.PI*2;

let p=heartPoint(t);


this.tx=W/2+p.x;
this.ty=H/2+p.y;


this.x=Math.random()*W;
this.y=Math.random()*H;


this.z=Math.random()*2;


this.speed=Math.random()*0.025+0.015;


this.size=Math.random()*12+8;


this.word=[
"I love you",
"love",
"forever",
"❤️"
]
[
Math.floor(Math.random()*4)
];


this.angle=Math.random()*Math.PI*2;


}


update(){


this.x+=(this.tx-this.x)*this.speed;
this.y+=(this.ty-this.y)*this.speed;


this.angle+=0.01;


}



draw(scale){


ctx.save();


ctx.translate(
this.x,
this.y
);


ctx.rotate(
Math.sin(this.angle)*0.2
);



ctx.font=
`${this.size}px Courier New`;



ctx.fillStyle="#8b1028";


ctx.shadowColor="#c81d3a";

ctx.shadowBlur=20;



ctx.fillText(
this.word,
0,
0
);


ctx.restore();


}



}




for(let i=0;i<1200;i++){

particles.push(
new LoveParticle()
);

}




// floating blood dust


let dust=[];


for(let i=0;i<150;i++){

dust.push({

x:Math.random()*W,
y:Math.random()*H,
s:Math.random()*3+1

});

}



let beat=0;



function animate(){


ctx.fillStyle="rgba(0,0,0,0.18)";

ctx.fillRect(0,0,W,H);



beat+=0.05;


let heartBeat =
1+
Math.sin(beat)*0.04;



particles.forEach(p=>{

p.update();

p.draw(
heartBeat
);

});



// dust animation


dust.forEach(d=>{


d.y-=0.3;


if(d.y<0)
d.y=H;



ctx.beginPath();

ctx.arc(
d.x,
d.y,
d.s,
0,
Math.PI*2
);


ctx.fillStyle=
"rgba(200,29,58,.5)";


ctx.shadowBlur=15;

ctx.shadowColor="#c81d3a";


ctx.fill();


});



requestAnimationFrame(animate);


}



animate();

}
