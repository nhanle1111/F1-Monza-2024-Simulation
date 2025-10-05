//Nhan Le
//SDSU GEOG 581_Lab1
//Professor Skupin


//SETUP
//Creating an array of points representing the track path so that we can later move the car from point to point using the move function and redraw the car in the new position using position.
//Chat GPT was used in support for figuring out the car movement.After receiving the reference code, I learn the logic behind its code and did my own modification.


//SETUP
//You can get an array of points by loading the image first then used function mousePressed and print(mouseX,mouseY) to get the appropriate points.
let trackImg;
let cars=[];
let trackPath = [
{x: 768, y: 539},
{x: 718, y: 539},
{x: 698, y: 541},
{x: 668, y: 541},
{x: 637, y: 543},
{x: 633, y: 545},
{x: 615, y: 542},
{x: 586, y: 543},
{x: 567, y: 542},
{x: 532, y: 525},
{x: 478, y: 541},
{x: 412, y: 525},
{x: 372, y: 479},
{x: 350, y: 372},
{x: 341, y: 317},
{x: 336, y: 269},
{x: 334, y: 252},
{x: 323, y: 236},
{x: 296, y: 155},
{x: 288, y: 121},
{x: 291, y: 88},
{x: 329, y: 75},
{x: 376, y: 64},
{x: 405, y: 97},
{x: 424, y: 136},
{x: 463, y: 210},
{x: 509, y: 272},
{x: 550, y: 327},
{x: 589, y: 380},
{x: 603, y: 399},
{x: 629, y: 398},
{x: 655, y: 417},
{x: 730, y: 421},
{x: 809, y: 427},
{x: 900, y: 428},
{x: 940, y: 429},
{x: 960, y: 434},
{x: 973, y: 455},
{x: 971, y: 500},
{x: 951, y: 522},
{x: 910, y: 534},
{x: 874, y: 541},
{x: 840, y: 543},
{x: 768, y: 538}
];

//I like the idea of having a "cookie cutter" then push out the car one by one with my own modification. The reference code was using const and for loop.
class Car{
  constructor(id,name,color,speed,segStart=0,tStart=0){
    this.id=id;
    this.name=name;
    this.color=color;
    this.speed=speed;
    
//these are the elements AI adds in as index counter and flags to help move the car
    this.seg=segStart; //a counter and keep track of the position of the care
    this.t=tStart; //indicate where the car is at between two points
    this.hasStarted=false;//a flag, set to false initially for all car, so when you flip it to true later it indicates the car already run
    this.finished=false;//a flag, set to false initially, used to stop the car at full lap
  }
  
//Initially, I call another variable to use as index counter for trackPath but it was redundant.
//Getter for a property called position which is later defined. This is used to calculate the position of the car at each point in time, or more specifically after you move the car this get.position will get the new {x,y} of the car.
  get position(){
    let p1=trackPath[this.seg];
    let p2=trackPath[this.seg+1];
  return {
    x:lerp(p1.x,p2.x,this.t),
    y:lerp(p1.y,p2.y,this.t)}; //lerp calculate the point between two points. In other words, y is a point between y1 and y2 and it's this.t fraction of the distance from start to end.
  }

//this move() section was referenced from chatGPT, loop from top to bottom
  move(){
    if (this.finished) return; //if this.finished is true stop the car
    this.t+=this.speed;// how far along the car in the current segment this.t + how much the car should move each fram this.speed
    let segment = trackPath.length -1;// because the car move between points, segment, so if you have for example 44 point you will have 43 segments
    
    if (this.seg!=0){
      this.hasStarted=true;
    }// this is a condition for car to run

//this while loop helps the car stay within the array of points, the modulus % wrap the number back to zero
    while (this.t>=1){
      this.seg=(this.seg+1) % segment;
      this.t-=1;
    
//until the loop above run to this.seg===0, and since the this.hasStarted earlier was flipped to true, this.t will become zero, flip on the this.finished flag, and break the while loop
    if (this.hasStarted && this.seg===0){
      this.t=0;
      this.finished=true;
      break;}
    }  
}}

//DRAW
function preload() {
  trackImg = loadImage("monza_track.png");
}

//Setting up the canvas and pushing out car one by one
function setup() {
  createCanvas(1100,600);
  cars.push(new Car(1, "Ver",[7,59,143], 0.03,3, 0.7)); 
  cars.push(new Car(44, "Ham",[158,217,177], 0.035,3, 0.7));
  cars.push(new Car(16, "Lec",[186, 57, 15], 0.045,4, 0.20));
  cars.push(new Car(81,"Pia",[189, 129,49],0.043,4,0.15));
  cars.push(new Car(16, "Sai", [186, 57, 15], 0.04,4,0.39));
  cars.push(new Car(4,"Nor",[189, 129, 49],0.041,4,0.05));
  cars.push(new Car(63,"Rus",[158,217,177],0.03,2,0.8));
  cars.push(new Car(11,"Per",[7,59,143],0.03,2,0.1));
  cars.push(new Car(20,"Mag",[200,200,200],0.027,2,0.05));
  cars.push(new Car(23,"Alb",[103, 157, 245],0.025,2,0.045));
  cars.push(new Car(14,"Alo",[10, 143, 53],0.023,2,0.043));
  cars.push(new Car(3,"Ric",[255,255,255],0.021,2,0.039));
  cars.push(new Car(43,"Col",[103, 157, 245],0.020,2,0.035));
  cars.push(new Car(31,"Oco",[235, 199, 237],0.019,1,0.7));
  cars.push(new Car(18,"Str",[10, 143, 53],0.016,1,0.7));
  cars.push(new Car(10,"Gas",[235, 199, 237],0.0185,0,0.8));
  cars.push(new Car(77,"Bot",[95, 207, 131],0.0179,0,0.7));
  cars.push(new Car(24,"Zhou",[95, 207, 131],0.0175,0,0.79));
  cars.push(new Car(27,"Hul",[200,200,200],0.0178,0,0.75));

  
  } 

function draw(){

  background(200);

  image(trackImg,280,50,700,500);
  
  
  //draw finish line
  fill(0);
  rect(762,514,10,50);
  fill(255);
  textSize(16);
  text("Finish",752,504);
  
   //Legend box
  noStroke();
  fill(0,100);
  rect(10,10,140,320);
  fill(255);
  text("Ferrari",40,34);
  fill(186,57,15);
  ellipse(30,34,12,12);
  fill(255);
  text("Red Bull",40,64);
  fill(7,59,143);
  ellipse(30,64,12,12);
  fill(255);
  text("McLaren",40,94);
  fill(189, 129, 49);
  ellipse(30,94,12,12);
  fill(255);
  text("Mercedes",40,124);
  fill(158,217,177);
  ellipse(30,124,12,12);
  fill(255);
  text("Williams",40,154);
  fill(103, 157, 245);
  ellipse(30,154,12,12);
  fill(255);
  text("Aston Martin",40,184);
  fill(10, 143, 53);
  ellipse(30,184,12,12);
  fill(255);
  text("Haas",40,214);
  fill(200,200,200);
  ellipse(30,214,12,12);
  fill(255);
  text("Alpha Tauri",40,244);
  fill(255,255,255);
  ellipse(30,244,12,12);
  fill(255);
  text("Kick Sauber",40,274);
  fill(95, 207, 131);
  ellipse(30,274,12,12);
  fill(255);
  text("Alpine",40,304);
  fill(235, 199, 237);
  ellipse(30,304,12,12);
  
  
//Earlier when will push out the cars, we will have an array of cars. So, c=cars[i] will let us manipulate the car being drawn.
//The car position is update with move function.Then the get position wil calculate the new {x,y}. Then at that new position the car will be drawn.Each frame as the car position is update the new car is drawn.
//This loop will draw the car until it reach the car.length. 
  for (let i = 0; i < cars.length;i++) {
  let c = cars[i]; 
  c.move();
  let pos = c.position; 
  noStroke(); 
  fill(0,100);
  ellipse(pos.x+1.5, pos.y+1.5, 14,14);
  fill(c.color[0],c.color[1],c.color[2]);
  ellipse(pos.x, pos.y, 12, 12);
 
    
  fill(255);
  textSize(12);
  stroke(0,180); 
  strokeWeight(2);
  textAlign(LEFT, CENTER);
  text(c.name +" "+ c.id, pos.x + 10, pos.y);
    
  }
  
}
//If you want to print the mouse position, use this. Make sure it stays OUTSIDE of the draw function.
function mousePressed(){
  print(mouseX,mouseY)};

  
  