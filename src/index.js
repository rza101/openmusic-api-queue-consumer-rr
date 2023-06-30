require('dotenv').config();

const amqp = require('amqplib');
const PlaylistsService = require('./services/postgres/PlaylistsService');
const MailSender = require('./services/nodemailer/MailSender');
const Listener = require('./listener');
const PlaylistSongsService = require('./services/postgres/PlaylistSongsService');

const init = async () => {
    const mailSender = new MailSender();
    const playlistsService = new PlaylistsService();
    const playlistSongsService = new PlaylistSongsService();

    const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
    const channel = await connection.createChannel();
    const listener = new Listener(playlistsService, playlistSongsService, mailSender);

    // channel name boleh dijadikan env
    await channel.assertQueue('export:playlist', {
        durable: true,
    });

    channel.consume('export:playlist', listener.listen, { noAck: true });
};
init();
