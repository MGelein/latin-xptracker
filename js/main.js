/**
 * MAIN.JS
 * This file contains the p5.js sketch, or at least the starting methods for it. At a later
 * stage some of the logic may be turned into its own file. 
 */
const SKETCH_WIDTH = 1280;
const SKETCH_HEIGHT = 720;
const BAR_W = SKETCH_WIDTH - 300;
const MAX_SCORE = 1100;
const SCORE10 = 1000;
const SCORE5_5 = 550;
//The different colors of the star
var GOLD, BRONZE, SILVER;
//The lines of the file as it was last loaded
var lines = [];
//The array of students
const students = [];

/**
 * Load the data file before we continue
 */
function preload() {
    $.ajaxSetup({cache:false});
    loadFile(true);
}

/**
 * Load the file
 */
function loadFile(skipDelay) {
    //Load the lines
    console.log("Loading data file...");
    $.get('https://raw.githubusercontent.com/MGelein/latin-xptracker/master/data/scores.csv', function(data){
        //Later parse the students
        lines = data.split('\n');
        parseStudents();
    });
}

/**
 * Entry point of the P5 code, separate from
 * the JQuery entry point
 */
function setup() {
    //Create a 1280 x 720 pixel canvas. We might need to increase this to improve resolution
    createCanvas(SKETCH_WIDTH, SKETCH_HEIGHT);
    $('canvas').attr('style', '');
    //Set the framerate to 60fps
    frameRate(60);
    //Nice thick lines
    strokeWeight(2);
    //Set the color mode to HSB
    colorMode(HSB);
    //Set the colors
    GOLD = color(32, 255, 255);
    BRONZE = color(20, 255, 190);
    SILVER = color(36, 0, 190);
    //Reset the colormode
    colorMode(RGB, 255);
    //Parse the students
    parseStudents();
    //Set the textsize
    textSize(24);
}

/**
 * Called every frame to update the canvas element
 */
function draw() {
    //Draw a white background
    background(255);
    //Draw every student
    push();
    translate(0, 80);
    students.forEach(student => {
        student.render();
        translate(0, 60);
    });
    pop();

    //Draw the 10 mark
    let x = 140 + map(1000, 0, MAX_SCORE, 30, BAR_W);
    stroke(120);
    line(x, 40, x, height - 20);
    //Draw the 5,5 mark
    x = 140 + map(550, 0, MAX_SCORE, 30, BAR_W);
    stroke(120);
    line(x, 40, x, height - 20);

    //Sort all the students
    students.sort(function (a, b) {
        return b.score - a.score;
    });
}

/**
 * Creates a star using this function
 * @param {Number} x the center point x of the star
 * @param {Number} y the center point y of the star
 */
function star(x, y) {
    let r1 = 20;
    let r2 = 10;
    push();
    stroke(0, 80);
    //Translate to the position
    translate(x, y);
    //Calculate angle and halfangle
    let angle = TWO_PI / 5;
    let halfAngle = angle / 2;
    //Turn the halfangle even a little less
    rotate(halfAngle / 2);
    //Begin drawing a shape
    beginShape();
    //Draw all the points
    for (let a = 0; a < TWO_PI; a += angle) {
        let sx = cos(a) * r2;
        let sy = sin(a) * r2;
        vertex(sx, sy);
        sx = cos(a + halfAngle) * r1;
        sy = sin(a + halfAngle) * r1;
        vertex(sx, sy);
    }
    //Close the shape
    endShape(CLOSE);
    pop();
}

/**
 * Parses the lines file into a studnets file
 */
function parseStudents() {
    console.log("Parse the students...");
    //For each of the lines, parse them
    lines.forEach(line => {
        //Ignore if the line starts with 'name', this means it's a header line
        if (line.indexOf('name') == 0) return;
        //Create a new student instance
        let student = new Student(line);
        //Add a student if it didn't exist yet
        if (!studentExists(student)) students.push(student);
        
    });
    //Reload the file after a couple of seconds
    setTimeout(loadFile, 10000);//Every 10 seconds
}

/**
 * Sees if a student with the provided name already exists
 * @param {Student} s 
 */
function studentExists(s) {
    //For all students, check if the provided one matches
    let found = false;
    students.forEach(student => {
        if(found) return;
        if (student.name == s.name) found = true;
    });
    //If no match found, set to false
    return found;
}