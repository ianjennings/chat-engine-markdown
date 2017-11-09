// In this example we are going to create a chat client
// That will render markdown in messages

// get some references to functions
let send = function () {};
let submit = function () {};

// create an instance of chat-engine
const ChatEngine = ChatEngineCore.create({
    publishKey: 'pub-c-2d798b67-5637-4429-baaa-f7a559763cd8',
    subscribeKey: 'sub-c-c12ea6c2-c4ee-11e7-b2fd-1e2f18d1069d'
});

// connect the guy that sings 'Down with the Sickness' to the network, and when it is successful, do some stuff
ChatEngine.connect('David-Draiman');

ChatEngine.on('$.ready', () => {

    // * * * * *  begin plugin specific code  * * * * *

    // attach the typing-indicator plugin to the global channel
    ChatEngine.global.plugin(ChatEngineCore.plugin['chat-engine-markdown']());

    // * * * * *  end plugin specific code  * * * * *

    // use the input box value as message payload and clear it when you hit send
    send = function () {

        ChatEngine.global.emit('message', {
            text: $('#input').val()
        });

        $('#input').val('');

        return false;

    };

    // when any message is emitted on the global channel add it to the chat log
    ChatEngine.global.on('message', (payload) => {

        $('#output').append($('<p><strong>' + payload.sender.uuid + ':</strong> ' + payload.data.text + '</p>'));

    });

});