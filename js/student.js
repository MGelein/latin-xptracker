/**
 * Creates a new Student entity from the provided line of a CSV file.
 * This entity can then later be updated
 * @param {String} line 
 */
function Student(line) {
    //Split into parts
    let parts = line.split(",");
    while(parts.length < 3){
        parts.push("0");
    }
    //Parse the name
    this.name = parts[0].trim();
    //The nickname
    this.nick = parts[1].trim();
    //And the score, set it to the target
    if(parts[2]) this.targetScore = parseInt(parts[2].trim());
    else this.targetScore = 0;
    //For the actual score, this is eased
    this.score = 0;
    //See if the nickname was valid
    if (this.nick.length < 1) this.nick = this.name;

    /**
     * Render this specific student
     */
    this.render = function () {
        //Ease towards the correct score
        this.score += (this.targetScore - this.score) * 0.05;

        if(abs(this.score - this.targetScore) < 1) this.score = this.targetScore;

        //Draw the bar
        fill(180);
        stroke(0, 80);
        rect(10, 35, width - 55, 20, 10);
        //Nameholder
        stroke(200);
        fill(245);
        rect(20, 15, 110, 50, 10);
        //Draw the nickname
        fill(0);
        textFont(fontCaesar);
        textSize(22);
        let tw = textWidth(this.nick) / 2;
        text(this.nick, 75 - tw, 50);

        //Draw outer bar
        stroke(200);
        strokeWeight(2);
        fill(220);
        rect(140, 15, BAR_W, 50, 10);
        fill(0, 30);
        rect(140, 15, BAR_W, 5, 10);

        //Now draw the inner bar
        stroke(120);
        let w = max(30, min(BAR_W, map(this.score, 0, MAX_SCORE, 30, BAR_W)));
        colorMode(HSB);
        let h = map(this.score, 0, MAX_SCORE, 0, 85);
        fill(h, 255, 200);
        rect(140, 15, w, 50, 10);
        colorMode(RGB, 255);
        //Draw the white glow  
        fill(255, 60);
        noStroke();
        rect(140, 15, w, 20, 10);
        //Draw the dark glow
        fill(0, 30);
        rect(140, 55, w, 10, 10);

        //Draw the score text
        textFont(fontRomanica);
        textSize(16);
        fill(120);
        text(parseInt(this.score), max(80 + w, 145), 48);
        fill(255);
        text(parseInt(this.score), max(80 + w, 145), 50);

        //Star holder
        stroke(200);
        fill(245);
        rect(BAR_W + 150, 15, 90, 50, 10);

        //Draw the fucking star
        let drawShadow = true;
        let fColor = false;
        if (this.score >= MAX_SCORE) fColor = GOLD;
        else if (this.score >= SCORE10) fColor = SILVER;
        else if (this.score >= SCORE5_5) fColor = BRONZE;
        else {
            drawShadow = false;
        }
        if(drawShadow){
            fill(0, 120)
            star(BAR_W + 197, 42);
            fill(fColor);
        }
        stroke(0, 120);
        star(BAR_W + 195, 40);
    }
}