
//ADD YOUR FIREBASE LINKS HERE

const firebaseConfig = {
      apiKey: "AIzaSyAkvkSGF7Mjztu31klE4I1JPBsGRh0hehw",
      authDomain: "kwitter-1371c.firebaseapp.com",
      projectId: "kwitter-1371c",
      storageBucket: "kwitter-1371c.appspot.com",
      messagingSenderId: "808085509004",
      appId: "1:808085509004:web:247c32615c4262457e7ca9"
    };
    
    // Initialize Firebase
const app = initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");

document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!";

function addRoom()
{
  room_name = document.getElementById("room_name").value;

  firebase.database().ref("/").child(room_name).update({
    purpose : "adding room name"
  });

    localStorage.setItem("room_name", room_name);
    
    window.location = "kwitter_page.html";
}

function send(){

  msg = document.getElementById("msg").value;

  firebase.database().ref("room_name").push({
    name: user_name,
    message: msg,
    like: 0
  })
  document.getElementById("msg").value = "";
}

function getData() 
{ 
  
  firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if (childKey != purpose) {
    firebase_message_id = childKey;
    message_data = childData;
    
    console.log(firebase_message_id);
    console.log(message_data);
    name = message_data['name'];
    message = message_data['message'];
    like = message_data['like'];
    
    name_with_tag = "<h4>" + name + "<img class='user_tick' src='https://www.pngitem.com/pimgs/m/3-38867_twitter-verified-badge-twitter-verified-icon-svg-hd.png'> </h4>";
    message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
    like_button = "<button class='btn btn-warning' id=" + firebase_message_id + "value=" + like + "onclick = 'updateLike(this.id)'>";
    span_with_tag = "<span class= 'glyphicon glyphicon-thumbs-up'> Like: " + like + "</span></button><hr>";
    
    row = name_with_tag + message_with_tag + like_button + span_with_tag;
    document.getElementById("output").innerHTML += row;

   } }); }); }

getData();

function updateLike(message_id){

  console.log("Clicked like button " + message_id);
  button_id = message_id;
  likes = document.getElementById("button_id").value;
  updatedLikes = Number(likes) + 1;
  console.log(updatedLikes);

  firebase.database().ref(room_name).child(message_id).update({
     like : updated_likes
     });
}

function redirectToRoomName(name)
{
  console.log(name);
  localStorage.setItem("room_name", name);
    window.location = "kwitter_page.html";
}

function logout() {
localStorage.removeItem("user_name");
localStorage.removeItem("room_name");
    window.location = "index.html";
}

