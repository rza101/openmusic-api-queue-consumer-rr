/* eslint-disable no-underscore-dangle */
const { Pool } = require('pg');

class PlaylistsService {
    constructor() {
        this._pool = new Pool();
    }

    async getPlaylistById(playlistId) {
        const playlist = await this._pool.query({
            text: /* SQL */ `
                SELECT playlists.id, playlists.name
                FROM playlists
                WHERE playlists.id = $1`,
            values: [playlistId],
        });

        return playlist.rows[0];
    }
}

module.exports = PlaylistsService;
