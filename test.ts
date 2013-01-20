/// <reference path='./d/node.d.ts' />

import _      = module('underscore');
import rt     = module('lib/rotten-tomatoes');
import secret = module('secret')
import tmdb   = module('lib/tmdb');
import util   = module('util');

function testRottenTomatoes(n) {
    var rotten = new rt.RottenTomatoes(secret.ROTTENTOMATOES_KEY);
    rotten.getBoxOfficeMovies(movies => {
        movies.forEach(m => {
            console.log(util.format("%s: %s", m.title, m.abridged_cast.map(c => c.name)));
        }, n);
    });
}

function testTheMovieDB(name: string) {
    var tmdb = new tmdb.TMDB(secret.TMDB_KEY);
    tmdb.getAge(name, age => {
        console.log("%s is %d years old.", name, age);
    });
}

function testEverything(n: number) {
    var rottenTomatoes = new rt.RottenTomatoes(secret.ROTTENTOMATOES_KEY);
    var tmdb = new tmdb.TMDB(secret.TMDB_KEY);

    rottenTomatoes.getBoxOfficeMovies(movies => {
        movies.forEach(m => {
            var cast = m.abridged_cast;
            var names = cast.map(c => c.name);
            var ages = [];
            cast.map(c => {
                var name = c.name;
                tmdb.getAge(name, age => ages.push (age))
            });

            var results = _.zip(names, ages);

            results.forEach(x => console.log("%s is %d years old.", x[0], x[1]));
            console.log("The average age is " + (ages.reduce((a, b) => a + b) / ages.length));
        });
    }, n);
}

// testRottenTomatoes(1);
// testTheMovieDB("Tom Cruise");

testEverything(1);