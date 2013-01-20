/// <reference path='../d/node.d.ts' />
/// <reference path='../d/request.d.ts' />

import request = module('request');
import util = module('util');

export class TMDB {
    static URL = "http://private-1a29-themoviedb.apiary.io/3";

    thisYear: number;

    URL(method: String): string {
        return util.format("%s/%s", TMDB.URL, method);
    }
    constructor(public api_key: string) {
        this.thisYear = new Date().getFullYear();
    }

    getAge(name: String, callback: (age: number) => any) {
        this.getID(name, id => {
            request.get(
            { url: this.URL("person/" + id), json: true, qs: { api_key: this.api_key } },
            (error, response, body) => {
                var age = this.thisYear - new Date(body["birthday"]).getFullYear();
                callback(age);
            });
        });
    }

    getID(name: String, callback: (id: number) => any) {
        request.get(
            { url: this.URL("/search/person"), json: true, qs: { api_key: this.api_key, query: name }},
            (error, response, body) => {
                var id = body["results"][0]["id"];
                callback(id);
            });
    }
}
