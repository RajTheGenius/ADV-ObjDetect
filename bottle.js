// Define an empty array to store the results
let objectResults = [];

function preload() {
  // Load the image
  img = loadImage("Img1 (1).jpg");
}

function setup() {
    canvas = createCanvas(420, 640);
    canvas.position(800, 250);
  cocoSsd = ml5.objectDetector('cocossd', modelLoaded);
}

function modelLoaded() {
  console.log('Model loaded');
  // Detect objects in the image
  cocoSsd.detect(img, gotResults);
}

function gotResults(err, results) {
  if (err) {
    console.error(err);
    return;
  }
  // Store the results in the objectResults array
  objectResults = results;
}

function draw() {
  image(img, 0, 0, 420, 640);

  // Check if the model has finished detecting objects
  if (objectResults.length > 0) {
    for (let i = 0; i < objectResults.length; i++) {
      let object = objectResults[i];
      let confidence = floor(object.confidence * 100); // Convert confidence to percentage
      let label = object.label;
      let x = object.x;
      let y = object.y;
      let w = object.width;
      let h = object.height;

      // Draw the rectangle around the object
      stroke(0, 255, 0);
      strokeWeight(2);
      noFill();
      rect(x, y, w, h);

      // Display label and confidence near the object
      noStroke();
      fill(0, 255, 0);
      textSize(18);
      text(label + ': ' + confidence + '%', x, y - 5);
    }
  }
}
