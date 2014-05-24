import _ = require('underscore');
import async = require('async');
import rt = require('./rotten-tomatoes');
import secret = require('./secret')
import tmdb = require('./tmdb');
import util = require('util');

export function testRottenTomatoes(n) {
    var rotten = new rt.RottenTomatoes(secret.ROTTENTOMATOES_KEY);
    rotten.getBoxOfficeMovies((err, movies) => {
        movies.forEach(m => {
            console.log(util.format("%s: %s", m.title, m.abridged_cast.map(c => c.name)));
        }, n);
    });
}

export function testTheMovieDB(name: string) {
    var t = new tmdb.TMDB(secret.TMDB_KEY);
    t.getAge(name, age => {
        console.log("%s is %d years old.", name, age);
    });
}

function getAge(_tmdb: tmdb.TMDB, name: string, callback: Function) {
    _tmdb.getAge(name, age => callback(null, { name: name, age: age }))
}

function getMovies(_rt: rt.RottenTomatoes, n: number, callback: (error: any, movies: rt.Movie[]) => any) {
    _rt.getBoxOfficeMovies(callback, n);
}

export function testEverything(n: number) {
    var _rt = new rt.RottenTomatoes(secret.ROTTENTOMATOES_KEY);
    var _tmdb = new tmdb.TMDB(secret.TMDB_KEY);

    async.parallel(
        [async.apply(getMovies, _rt, n)],
        (err, movies) => {
            async.parallel(
                _.flatten(movies).map(
                    movie => ignored => {
                        async.parallel(
                            movie.abridged_cast.map(c => async.apply(getAge, _tmdb, c.name)),
                            (error, results) => {
                                console.log("Results for " + movie.title + ":\n");
                                results.forEach(x => console.log("%s is %d years old.", x.name, x.age));
                                var ages = results.map(each => each.age);
                                console.log(util.format("The average age is %d.", (ages.reduce((a, b) => a + b) / ages.length)));
                                console.log();
                            });
                    }),
                (error, result) => { })
        });
};
