const terminalText = document.getElementById("text");
const decrypt = document.getElementById("decrypt");

const terminalLines = [
    "[ SYSTEM ] Initializing Heart_PROTOCOL_v2.0...",
    "[ STATUS ] Searching encrypted message...",
    "[ STATUS ] Love package found.",
    "[ SECURITY ] Encryption level: RED",
    "[ STATUS ] Ready to decrypt..."
];


let line = 0;
let char = 0;


function typing(){

    if(line < terminalLines.length){

        if(char < terminalLines[line].length){

            terminalText.innerHTML += terminalLines[line][char];

            char++;

            setTimeout(typing,40);

        }else{

            terminalText.innerHTML += "<br>";

            line++;

            char=0;

            setTimeout(typing,400);
        }

    }

}


typing();



decrypt.onclick = ()=>{

    document.getElementById("terminal").style.display="none";

    document.getElementById("loveScene").style.display="block";

    startHeart();

};




// HEART CANVAS


function startHeart(){

const canvas=document.getElementById("heartCanvas");

const ctx=canvas.getContext("2d");


canvas.width=window.innerWidth;
canvas.height=window.innerHeight;


let particles=[];


const words=[
    "I love you",
    "love",
    "forever",
    "❤️"
];



class Particle{


constructor(){

    let t=Math.random()*Math.PI*2;


    let scale=15;


    this.x=
    canvas.width/2+
    scale*
    16*
    Math.pow(Math.sin(t),3);



    this.y=
    canvas.height/2
    -
    scale*
    (
        13*Math.cos(t)
        -
        5*Math.cos(2*t)
        -
        2*Math.cos(3*t)
        -
        Math.cos(4*t)
    );


    this.targetX=this.x;

    this.targetY=this.y;



    this.x=Math.random()*canvas.width;

    this.y=Math.random()*canvas.height;



    this.speed=Math.random()*0.02+0.01;


    this.size=Math.random()*14+8;


    this.text=
    words[
        Math.floor(Math.random()*words.length)
    ];


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

    ctx.font=
    `${this.size}px Courier New`;


    ctx.fillStyle=
    "#8b1028";


    ctx.shadowColor=
    "#c81d3a";


    ctx.shadowBlur=15;


    ctx.fillText(
        this.text,
        this.x,
        this.y
    );

}


}




for(let i=0;i<700;i++){

    particles.push(new Particle());

}



let pulse=0;


function animate(){

ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
);



pulse+=0.03;


particles.forEach(p=>{


    let beat =
    1+
    Math.sin(pulse)*0.03;


    p.update();


    ctx.save();


    ctx.translate(
        canvas.width/2,
        canvas.height/2
    );


    ctx.scale(
        beat,
        beat
    );


    ctx.translate(
        -canvas.width/2,
        -canvas.height/2
    );


    p.draw();


    ctx.restore();



});



requestAnimationFrame(animate);


}



animate();



window.onresize=()=>{

canvas.width=window.innerWidth;

canvas.height=window.innerHeight;

};


}
