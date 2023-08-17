const database = firebase.database().ref();


function red(){
    document.getElementById("message").style.color="red";
}

const allmessageDiv = document.getElementById("all-messages");

const messageInput = document.getElementById("message");
const sendButton = document.getElementById("send-btn");
sendButton.onclick = updateDB;


function updateDB(event) {
    // prevents the page from refreshing
event.preventDefault();
    // create an object with the data we want to add to our database
    
    const message = messageInput.value;

    const messageData = {
        MESSAGE: message
    }
    console.log(messageData);

    database.push(messageData);

    messageInput.value = "";
}

database.on('child_added', addMessage);

function addMessage(rowData) {
    // gets the value in the database row
    const row = rowData.val();

    
    const message =row.MESSAGE;

    console.log( 'Message :', message);

    const messageDiv = makeSingleMessageHTML("Anonymous", message);

    //Checks if string emepty if so it doesnt send nothing.
    if(message.length === 0){
        console.log("emepty string");

    }
    else{
        allmessageDiv.appendChild(messageDiv);
    }
   
}

function makeSingleMessageHTML(usernameTxt, messageTxt) {
    // creates a parent div to hold entire username + message line
    const parentDiv = document.createElement('div');

    const messageP = document.createElement('p')
    // update the inner HTML to include the username
    messageP.innerHTML = usernameTxt + ' : ' + messageTxt;
    
    // adds the message
    parentDiv.appendChild(messageP);
    
    return parentDiv
}