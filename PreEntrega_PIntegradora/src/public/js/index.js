const socket = io(); //Conexion con Websockets

let user;

const chatBox = document.getElementById('chatBox');
const messagesLogs = document.getElementById('messageLogs');


Swal.fire({
    title: 'Identificate',
    input: 'text',
    text: 'Ingresa el usuaio para identificarte en el chat',
    inputValidator: (value) => {
        return !value && 'Necesitar escribir un nombre de usuario para comenzar el chat'
    },
    allowOutsideClick: false,
    allowEscapeKey: false
}).then(result =>{
    user = result.value;
    socket.emit('authenticated', user);
});

chatBox.addEventListener('keyup', evt => {
    if(evt.key === 'Enter'){
        if(chatBox.value.trim().length > 0){
            socket.emit('message', { user, message: chatBox.value});
            chatBox.value = '';
        }
    }
});

//Recibir todos los mensajes
socket.on('messageLogs', data =>{
    console.log(data);
    let messages = '';
    data.forEach(message => {
        messages += `${message.user} dice: ${message.message}<br>`
    });

    messagesLogs.innerHTML = messages;
}); 


