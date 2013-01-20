/// <reference path='./d/node.d.ts' />

import util = module('util');
import rt   = module('lib/rotten-tomatoes');

var rotten = new rt.RottenTomatoes(process.env.RT_API);
rotten.getBoxOfficeMovies(movies => {
    movies.forEach(m => {
        console.log(util.format("%s: %s", m.title, m.abridged_cast.map(c => [c.name, c.id])));
    }, 10);
});
