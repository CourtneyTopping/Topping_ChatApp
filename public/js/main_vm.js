// imports always go first - if we're importing anything
import ChatMessage from "./modules/ChatMessage.js";


const socket = io(); //loading from node_modules folder

//the packet is whatever data we send thru with the connect event from the server
//this is data destructuring. More research on this
function setUserId({sID}) {
    //debugger;
    console.log(sID);
    vm.socketID = sID;
}

function showDisconnect() {
    console.log('a user disconnected');
}

function appendMessage(messages) {
    vm.messages.push(messages);
}


const vm = new Vue({
    data: {
        // messages: [ //object we're reffering to
        //     // {
        //     //     name: "Yoooo",
        //     //     content: "hello sup"
        //     // },
        //     // {
        //     //     name: "hola",
        //     //     content: "HOOOOLA"
        //     // }

        //     //THIS POPS UP IN THE CHAT BOX
        // ]

        socketID: "",
        message: "",
        nickname: "",
        messages: []
    },

    methods: {
        //emit a message event to the server so that it can turn send this t anyone whp's connected 
        dispatchMessage() {
            console.log('handle emit message');
            
            //notice the sdouble pipe || is an "or" operator if the first value is set, use it. Else use whatever comes after the "or" operator
            socket.emit('chat_message', {
                content: this.message,
                name: this.nickname || "anonymous" //chosen nickname ORRRRR stay anonymous
            })

            this.message = "";
            this.nickname = ""; //refreshing the form after sending message
        }
    },

    mounted: function() {
        console.log('vue is done mounting');
    },
    components: {
        newmessage: ChatMessage 
    }
}).$mount("#app");


socket.addEventListener('connected', setUserId);
socket.addEventListener('disconnect',showDisconnect);
socket.addEventListener('new_message', appendMessage);