var spokenArray = [];
var output = document.getElementById('para');
var mainArray = JSON.parse(localStorage.getItem("names")) || [];


function storeName(e) {
  var selector = document.querySelector("#input");
  if(e.keyCode === 13 && e.target.value.trim()){
    var name = e.target.value;
    if(name.length > 0){
      mainArray.push(name);
      selector.value = "";
      selector.focus();
      localStorage.setItem("names", JSON.stringify(mainArray));
      if(mainArray.length > 0){
        listDisplay(mainArray, "toSpeak");
      }
    }else{
      alert("Say hi to the man with no name. If he's not there, enter a proper name, you garbage");
    }
  }
}

function displayName(){
  var randomName = mainArray[Math.floor(Math.random() * mainArray.length)];
  var nameIndex = mainArray.indexOf(randomName);
  var count = 0;
  var startTime = new Date().getTime();
  if(mainArray.length === 1){
    output.innerHTML = `<p class="randomUser">${mainArray[0]}</p>`;
    spokenArray.push(mainArray.pop());
    listDisplay(mainArray, "toSpeak");
    listDisplay(spokenArray,"spoken");
  }else if(mainArray.length > 0){
    var interval  = setInterval( () => {
    if(new Date().getTime()-startTime > 3000){
      clearInterval(interval);
      output.innerHTML = `<p class="randomUser">${randomName}</p>`;
      mainArray.splice(nameIndex,1);
      listDisplay(mainArray,"toSpeak");
      if(spokenArray.length > 0){
        listDisplay(spokenArray,"spoken");
      }
      spokenArray.push(randomName);
      listDisplay(spokenArray,"spoken");
      return null;
    }
    output.innerHTML = `<p class="randomUser">${mainArray[count]}</p>`;
     if(count < mainArray.length - 1){
        count++;
     }else {
      count = 0;
     }
    } , 200);
  }else{
    output.innerHTML = '<p class="randomUser">No names here</p>';
  }
}

function listDisplay(arr, id){
  var list = document.getElementById(id);
  list.innerHTML = "";
  for(i of arr){
    var html = `
      <li class="username">${i}</li>
    `
    list.innerHTML += html;
  }
  if(!arr.length){
    list.innerHTML = "No user!";
  }
}

listDisplay(mainArray, "toSpeak" );

document.addEventListener("click", (e) => {
  if(e.target.id === "para" || e.target.className === "randomUser") {
    e.target.innerHTML = `<input id="input" placeholder="enter a name">`;
  }
});

document.addEventListener("keydown",storeName);
