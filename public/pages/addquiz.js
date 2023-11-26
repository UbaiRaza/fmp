import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";
import { getDatabase, ref,set,push } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCFFDzU5OwA_ncbctdQNGgJexvUGZ8NOwY",
  authDomain: "quizappp-27e5b.firebaseapp.com",
  databaseURL: "https://quizappp-27e5b-default-rtdb.firebaseio.com",
  projectId: "quizappp-27e5b",
  storageBucket: "quizappp-27e5b.appspot.com",
  messagingSenderId: "94535894428",
  appId: "1:94535894428:web:fe815b31660e7028a07459",
  measurementId: "G-YHVTZ5G4PW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
var db = getDatabase();

var question = document.getElementById("question");
var option = document.getElementById("option");
var optionsParent = document.getElementById("optionsParent");
var corectAnswerElm = document.getElementById("corectAnswer");
var options = [];
var corectAnswer

function renderOptions(){
  optionsParent.innerHTML=""
  for(var i =0; i<options.length;i++){
    optionsParent.innerHTML +=`<li onclick="setCorrectAnswer('${options[i]}')"class="p-2 bg-light fs-5 rounded shadow my-2">${options[i]}</li>`
  }
}
window.render = function () {
  options.push(option.value);
  console.log(options);
  renderOptions()
};

window.setCorrectAnswer =function(a){
  corectAnswer = a;
  corectAnswerElm.innerHTML = corectAnswer
}
window.submitQuestion = function(){
  var obj ={
      question:question.value,
      options:options,
      corectAnswer:corectAnswer  
      }
      obj.id= push(ref(db,'questions/')).key
    const referrance = ref(db,`questions/${obj.id}`)
    set(referrance,obj)
}