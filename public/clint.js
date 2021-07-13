

const socket = io();

let textarea = document.querySelector("#textarea")
let meaasgeArea = document.querySelector('.message_area')


let name;
do {
  name =  prompt("please enter your name:") 
}while(!name)

textarea.addEventListener("keyup", (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

function sendMessage(message) {
    let msg = {
        user: name,
        message:message.trim(),
    }
    // append
    appendMessage(msg, 'outgoing');
    textarea.value = '';
    scrollToButtom();

    // send to server
    socket.emit('message',msg)
}



function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type;
    mainDiv.classList.add(className, 'message',);

    let markup = `
    <h4>${msg.user}</h4>
    <P>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    
    meaasgeArea.appendChild(mainDiv)
}


// receive message
socket.on('message', (msg) => {
    // console.log(msg)
    appendMessage(msg, 'incomming');
    scrollToButtom();
})


function scrollToButtom() {
    meaasgeArea.scrollTop = meaasgeArea.scrollHeight;

}