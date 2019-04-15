/**
 * Creates a new Student entity from the provided line of a CSV file.
 * This entity can then later be updated
 * @param {String} line 
 */
function Student(line){
    //Split into parts
    let parts = line.split(",");
    //Parse the name
    this.name = parts[0].trim();
    //The nickname
    this.nick = parts[1].trim();
    //And the score
    this.score = parseInt(parts[2].trim());
    //See if the nickname was valid
    if(this.nick.length < 1) this.nick = this.name;
}