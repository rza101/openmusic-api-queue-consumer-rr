/* eslint-disable no-underscore-dangle */
class Listener {
    constructor(playlistsService, playlistSongsService, mailSender) {
        this._playlistsService = playlistsService;
        this._playlistSongsService = playlistSongsService;
        this._mailSender = mailSender;

        this.listen = this.listen.bind(this);
    }

    async listen(message) {
        try {
            const { playlistId, targetEmail } = JSON.parse(message.content.toString());

            const playlist = await this._playlistsService.getPlaylistById(playlistId);
            const playlistSongs = await this._playlistSongsService.getPlaylistSongs(playlistId);

            const payload = {
                playlist,
            };
            payload.playlist.songs = playlistSongs.rows;

            const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(payload));
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = Listener;
