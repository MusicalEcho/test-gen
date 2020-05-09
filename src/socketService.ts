import io from 'socket.io-client';

const socket = io(process.env.API_URL);

export function connect(onConnect: Function, onChange: Function) {
  socket.on('last_saved_text', onConnect);

  socket.on('text_changed', (d) => {
    onChange(d);
  });
}

export function broadcast(data) {
  socket.emit('text_changed', data);
}
