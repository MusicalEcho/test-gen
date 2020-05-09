import http from 'http';
import express from 'express';
import SocketIO from 'socket.io';
import bodyParser from 'body-parser';
import cors from 'cors';
import { patchToText } from './src/textDiffHelpers';

const PORT = parseInt(process.env.PORT || '8080');

const app: express.Application = express();
const server = http.createServer(app);
const io = SocketIO.listen(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use((req, res) => {
  res.status(404).send({ url: `${req.originalUrl} not found` });
});

let savedText = 'Awesome text that I don`t want to store in sqlite or redis';

io.on('connection', (socket) => {
  console.log('new user connected');

  socket.emit('last_saved_text', savedText);

  socket.on('text_changed', (data) => {
    savedText = patchToText(data, savedText);
    socket.broadcast.emit('text_changed', data);
  });
});

server.listen(PORT, () => {
  console.log(`App listening on the port ${PORT}\n`);
});
