import callbacks = require('./callbacks');
import readline = require('readline');

interface App {
    testTheMovieDB?(string): void
    testRottenTomatoes?(string): void
    testEverything?(number): void
}

var app: App = callbacks;

console.log("Hello World!");

app.testRottenTomatoes(1);
app.testTheMovieDB("Tom Cruise");

app.testEverything(3);

readline.createInterface({input: process.stdin, output: process.stdout}).prompt();
