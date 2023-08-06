img = "";
status = "";
objects = [];


function preload(){
  img = loadImage('Img1 (2).jpg');
}


function setup() {
  canvas = createCanvas(640, 420);
  canvas.position(800, 250);
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = " Detecting objects";
}

function modelLoaded() {
  console.log("Model Loaded!")
  status = true;
  objectDetector.detect(img, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}

function draw() {
    image(img, 0,0,600, 450)
    if(status != "") 
    { for (i = 0; i < objects.length; i++) { 
        document.getElementById("status").innerHTML = "Status : Object Detected"; 
        fill("#FF0000"); 
        percent = floor(objects[i].confidence * 100); 
        text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15); 
        noFill();
        stroke("#FF0000");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height); } 
    }
}