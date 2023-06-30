/* eslint-disable no-underscore-dangle */
const { Pool } = require('pg');

class PlaylistSongsService {
    constructor() {
        this._pool = new Pool();
    }

    async getPlaylistSongs(playlistId) {
        const playlistSongs = await this._pool.query({
            text: /* SQL */ `
                SELECT songs.id, songs.title, songs.performer
                FROM songs
                LEFT JOIN playlist_songs
                ON playlist_songs.song_id = songs.id
                WHERE playlist_songs.playlist_id = $1`,
            values: [playlistId],
        });

        return playlistSongs;
    }
}

module.exports = PlaylistSongsService;
