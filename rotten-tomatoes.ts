
import util = require('util');
import http = require('http');
import _ = require('underscore');

export interface CastMember {
    name: string;
    id: string;
    characters: string[];
}

export interface Movie {
    id: string;
    title: string;
    year: number;
    mpaa_rating: string;
    runtime: number;
    critics_consensus: string;
    release_dates: {};
    ratings: {};
    synopsis: string;
    posters: {};
    abridged_cast: CastMember[];
    alternate_ids: {};
    links: {};
}

export class RottenTomatoes {
    private get_request: {};
    constructor(public apikey: string) {
        this.get_request = {
            host: 'api.rottentomatoes.com',
            port: 80
        }
    }

    private setup(api: string, limit?: number, country?: string): {} {
        return _.extend(this.get_request, {
            limit: limit,
            country: country,
            path: util.format(
                '/api/public/v1.0/lists/movies/%s.json?limit=%s&country=%s&apikey=%s',
                api, limit, country, this.apikey),
        })
    }

    getBoxOfficeMovies(callback: (error: any, movies: Movie[]) => any, limit = 16, country = 'us') {
        var options = this.setup('box_office', limit, country);

        var req = http.get(options, result => {
            var data = '';
            result.on('data', d => data += d);
            result.on('end', () => callback(null, JSON.parse(data)["movies"]));
        });

        req.on('error', e => console.error(e));
    }
}
