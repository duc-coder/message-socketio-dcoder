//Yeu cau server ket noi voi client
const socket = io('http://localhost:3002');
//Send connection event from client to server
socket.on('connect', () => {
  socket.emit('connection', (res) => {
    console.log(res);
  });
});

socket.on('newUser', () => {
  console.log('New user join');
});

let btnIncre = document.getElementById('btnIncre');
btnIncre.addEventListener('click', () => {
  socket.emit('increaseNum');
});

let btnDecre = document.getElementById('btnDecre');
btnDecre.addEventListener('click', () => {
  socket.emit('decreaseNum');
});

socket.on('msgToClient', (data) => {
  document.getElementById('txtCount').innerHTML = data;
});

socket.on('messageToClient', (data) => {
  const li = $('<li></li>');
  let date = moment(data.createAt).format('hh:mm');
  li.text(`${date} | ${data.userName}: ${data.message}`);
  $('#messages').append(li);
});

let inputMessage = document.getElementById('txtMessage');
let inputUserName = document.getElementById('txtUserName');
let form = document.getElementById('message-form');
$('#message-form').on('submit', (e) => {
  e.preventDefault();
  let data = {
    userName: inputUserName.value,
    message: inputMessage.value,
  };
  socket.emit('newMessage', data, (res) => {
    console.log(res);
  });
  inputMessage.value = '';
});
