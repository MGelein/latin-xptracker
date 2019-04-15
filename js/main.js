/**
 * MAIN.JS
 * This file contains the p5.js sketch, or at least the starting methods for it. At a later
 * stage some of the logic may be turned into its own file. 
 */
var SKETCH_WIDTH = 1280;
var SKETCH_HEIGHT = 720;

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
}

/**
 * Called every frame to update the canvas element
 */
function draw() {
    background(0);
}