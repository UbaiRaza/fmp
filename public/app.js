import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";
import {
  getDatabase,
  ref,
  onChildAdded,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";
//TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFFDzU5OwA_ncbctdQNGgJexvUGZ8NOwY",
  authDomain: "quizappp-27e5b.firebaseapp.com",
  databaseURL: "https://quizappp-27e5b-default-rtdb.firebaseio.com",
  projectId: "quizappp-27e5b",
  storageBucket: "quizappp-27e5b.appspot.com",
  messagingSenderId: "94535894428",
  appId: "1:94535894428:web:fe815b31660e7028a07459",
  measurementId: "G-YHVTZ5G4PW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

var db = getDatabase();

var loarder = document.getElementById("loader");
var showQuestion = document.getElementById("showQuestion");

function getDataFromDtabase() {
  loarder.style.display = "block";
  showQuestion.style.display = "none";
  const referrance = ref(db, "questions/");
  onChildAdded(referrance, function (data) {
    console.log(data.val());
    questions.push(data.val());
    loarder.style.display = "none";
    showQuestion.style.display = "block";
    renderQuestion();
  });
}
getDataFromDtabase();

var questions = [];

var cerrentQuestion = document.getElementById("cerrentQuestion");
var totalQuestion = document.getElementById("totalQuestion");
var question = document.getElementById("question");
var answerParent = document.getElementById("answerParent");
var indexNum = 0;
var score = 0;

window.nextQuestion = function () {
  if (indexNum + 1 == questions.length) {
    alert("your score" + score);
  } else {
    indexNum++;-
    renderQuestion();
  }
};
window.checkQustion = function (a, b) {
  if (a == b) {
    score++;
    console.log(score);
  }
  nextQuestion();
};

window.renderQuestion = function () {
  cerrentQuestion.innerHTML = indexNum + 1;
  totalQuestion.innerHTML = questions.length;
  var obj = questions[indexNum];
  question.innerHTML = obj.question;
  answerParent.innerHTML = "";
  for (var i = 0; i < obj.options.length; i++) {
    answerParent.innerHTML += `<div class="py-2">
        <button onclick="checkQustion('${obj.options[i]}','${obj.correctAnswer}')" class="btn btn-dark fs-4 rounded-pill w-100 hover">
            ${obj.options[i]}
        </button>
</div>`;
  }
};
renderQuestion();
window.nextQuestion = function () {
  indexNum++;
  renderQuestion();
};
window.checkQustion = function (a, b) {
  if (a == b) {
    score++;
    console.log(score);
  }
  nextQuestion();
};
