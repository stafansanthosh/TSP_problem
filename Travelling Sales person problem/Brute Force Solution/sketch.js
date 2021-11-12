var cities = [];
var totalCities = 10;

var order = [];

var totalPermutations;
var count = 0;
var count_cities = 0;
var turn = 0;

var recordDistance;
var bestEver;

function setup() {
  var canvas = createCanvas(800, 800);
  canvas.parent('sketch-holder');
  noLoop();
}

function draw() {
  if(turn == 1)
  {
    // cities = [];
    // order = [];
    // for (var i = 0; i < totalCities; i++) {
    //   var v = createVector(random(width), random(height / 2));
    //   cities[i] = v;
    //   order[i] = i;
    // }

    count = 0;
  
    var d = calcDistance(cities, order);
    recordDistance = d;
    console.log('This');
    //bestEver = order.slice();
    
    totalPermutations = factorial(totalCities);
    console.log(totalPermutations);
    turn = 0;
  }
  background(0);
  //frameRate(5);
  noFill(255);
  for (var i = 0; i < cities.length; i++) {
    ellipse(cities[i].x, cities[i].y, 16, 16);
  }

  stroke(255);
  strokeWeight(4);
  noFill();
  beginShape();
  bestEver = order.slice();
  for (var i = 0; i < order.length; i++) {
    
    var n = bestEver[i];
    vertex(cities[n].x, cities[n].y);
    ellipse(cities[n].x, cities[n].y, 16, 16);
  }
  endShape();

  translate(0, height / 2);
  stroke(255);
  strokeWeight(2);
  noFill();
  beginShape();
  for (var i = 0; i < order.length; i++) {
    var n = order[i];
    vertex(cities[n].x, cities[n].y);
    ellipse(cities[n].x, cities[n].y, 16, 16);
  }
  endShape();

  var d = calcDistance(cities, order);
  if (d < recordDistance) {
    recordDistance = d;
    bestEver = order.slice();
  }

  // textSize(32);
  // // var s = '';
  // // for (var i = 0; i < order.length; i++) {
  // //   s += order[i];
  // // }
  // fill(255);
  // var percent = 100 * (count / totalPermutations);
  // text(nf(percent, 0, 2) + '% completed', 20, height / 2 - 50);

  nextOrder();
}

function swap(a, i, j) {
  var temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

function calcDistance(points, order) {
  var sum = 0;
  for (var i = 0; i < order.length - 1; i++) {
    var cityAIndex = order[i];
    var cityA = points[cityAIndex];
    var cityBIndex = order[i + 1];
    var cityB = points[cityBIndex];
    var d = dist(cityA.x, cityA.y, cityB.x, cityB.y);
    sum += d;
  }
  return sum;
}

// This is my lexical order algorithm

function nextOrder() {
  count++;
  var largestI = -1;
  for (var i = 0; i < order.length - 1; i++) {
    if (order[i] < order[i + 1]) {
      largestI = i;
    }
  }
  if (largestI == -1) {
    noLoop();
    console.log('finished');
  }

  // STEP 2
  var largestJ = -1;
  for (var j = 0; j < order.length; j++) {
    if (order[largestI] < order[j]) {
      largestJ = j;
    }
  }

  // STEP 3
  swap(order, largestI, largestJ);

  // STEP 4: reverse from largestI + 1 to the end
  var endArray = order.splice(largestI + 1);
  endArray.reverse();
  order = order.concat(endArray);
}

function factorial(n) {
  if (n == 1) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}

function startloop() {
  totalCities = document.querySelector(".form-control").value;
  turn++;
  loop();
}

function mousePressed() {
  // ellipse(mouseX, mouseY, 16, 16);
  totalCities++;
  recordDistance = Infinity;
  var v = createVector(mouseX, mouseY);
  
  cities[count_cities] = v;
  order[count_cities] = count_cities;
  count_cities++;

  loop();
}