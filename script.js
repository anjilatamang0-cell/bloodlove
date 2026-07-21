class LoveParticle {

constructor(){

    let angle = Math.random()*Math.PI*2;

    let point = heartShape(angle);


    this.targetX = W/2 + point.x*18;
    this.targetY = H/2 + point.y*18;


    // start hidden
    this.x = this.targetX;
    this.y = this.targetY;


    this.size = Math.random()*8+8;


    this.word = [
        "I love you",
        "I love you",
        "love you forever",
        "forever ❤️"
    ][Math.floor(Math.random()*4)];


    // slow pop timing
    this.delay = Math.random()*6000;


    this.birth = Date.now();


    this.scale = 0;

    this.opacity = 0;


    this.float = Math.random()*Math.PI*2;

}



update(){

    let age = Date.now()-this.birth;


    if(age > this.delay){

        this.scale += 0.015;

        if(this.scale > 1)
            this.scale=1;


        this.opacity +=0.01;

        if(this.opacity>1)
            this.opacity=1;

    }



}



draw(){


let time = Date.now()*0.001;



let breathe =
1+
Math.sin(time+this.float)*0.08;



ctx.save();



ctx.translate(
this.x,
this.y
);



ctx.scale(
this.scale*breathe,
this.scale*breathe
);



let blur =
20-this.opacity*18;



ctx.font =
`${this.size}px Courier New`;



ctx.fillStyle =
`rgba(160,20,45,${this.opacity})`;



ctx.shadowColor =
"#c81d3a";



ctx.shadowBlur =
blur;



ctx.fillText(
this.word,
0,
0
);



ctx.restore();



}

}
