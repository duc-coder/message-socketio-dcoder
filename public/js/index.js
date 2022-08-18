/* eslint-disable prettier/prettier */
//Yeu cau server ket noi voi client
const socket = io('http://localhost:3002');

//Send connection event from client to server
socket.on('connect', () => {
  let userData = { userName, roomName };
  socket.emit('connection', userData, (data) => {
    let html = nunjucks.render(
      'html/pages/message/admin-welcome-template.html',
      {
        adminName: data.adminName,
        comment: data.message,
        createAt: moment(Date.now()).format('hh:mm a'),
      },
    );
    $('#messages').append(html);
  });
});

socket.on('newUser', (data) => {
  $('#messages').append(`<p id="txtComment">${data.userName} joined group chat</p>`);
});

let inputMessage = document.getElementById('txtMessage');
$('#message-form').on('submit', (e) => {
  e.preventDefault();
  let data = {
    userName: userName,
    message: inputMessage.value,
  };
  socket.emit('newMessage', data);
  inputMessage.value = '';
});

socket.on('messageToClient', (data) => {
  let html = nunjucks.render('html/pages/message/user-chat-template.html', {
    userName: data.userName,
    comment: data.message,
    createAt: moment(data.createAt).format('hh:mm a'),
  });
  $('#messages').append(html);
});
