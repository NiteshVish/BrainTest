
    let currentQuiz = [], currentQuestion = 0, score = 0, timerInterval;

    let questions = {
      html: [
        { q: "What does HTML stand for?", o: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"], a: 0 },
        { q: "Who is making the Web standards?", o: ["Mozilla", "Google", "W3C"], a: 2 }
      ],
      css: [
        { q: "What does CSS stand for?", o: ["Colorful Style Sheets", "Creative Style Sheets", "Cascading Style Sheets"], a: 2 },
        { q: "Which HTML tag is used to define an internal style sheet?", o: ["<script>", "<style>", "<css>"], a: 1 }
      ],
      javascript: [
        { q: "Inside which HTML element do we put the JavaScript?", o: ["<script>", "<js>", "<javascript>"], a: 0 },
        { q: "How do you write \"Hello World\" in an alert box?", o: ["alert('Hello World');", "msg('Hello World');", "alertBox('Hello World');"], a: 0 }
      ],
      react: [
        { q: "What is the command to create a new React app?", o: ["npx create-react-app myApp", "npm install react", "react-new-app myApp"], a: 0 },
        { q: "What is JSX?", o: ["JavaScript XML", "Java Syntax Extension", "JSON Extension"], a: 0 }
      ],
      node: [
        { q: "Which command is used to initialize a Node.js project?", o: ["node init", "npm init", "npm start"], a: 1 },
        { q: "Which module is used to create a web server in Node.js?", o: ["http", "fs", "url"], a: 0 }
      ]
    };

    function signup() {
      let  u = document.getElementById('signup-username').value;
      let p = document.getElementById('signup-password').value;
      if (u && p) {
        localStorage.setItem(u, p);
        alert('Signup successful! Please login.');
        showLogin();
      } else alert('Please fill all fields');
    }

    function login() {
      let u = document.getElementById('login-username').value;
      let p = document.getElementById('login-password').value;
      if (localStorage.getItem(u) === p) {
        document.getElementById('auth-container').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
      } else alert('Invalid credentials');
    }

    function showLogin() {
      document.getElementById('signup-box').style.display = 'none';
      document.getElementById('login-box').style.display = 'block';
    }

    function showSignup() {
      document.getElementById('login-box').style.display = 'none';
      document.getElementById('signup-box').style.display = 'block';
    }

    function startQuiz(topic) {
      currentQuiz = questions[topic];
      currentQuestion = 0;
      score = 0;
      document.getElementById('dashboard').style.display = 'none';
      document.getElementById('quiz-box').style.display = 'block';
      showQuestion();
    }

    function showQuestion() {
      let q = currentQuiz[currentQuestion];
      document.getElementById('question-text').innerText = `Q${currentQuestion + 1}: ${q.q}`;
      let optionsDiv = document.getElementById('options');
      optionsDiv.innerHTML = '';
      q.o.forEach((opt, idx) => {
        let btn = document.createElement('button');
        btn.innerText = opt;
        btn.classList.add('option-button');
        btn.onclick = () => handleAnswer(idx);
        optionsDiv.appendChild(btn);
      });
      startTimer();
      updateProgressBar();
    }

    function handleAnswer(selected) {
      clearInterval(timerInterval);
      let correct = currentQuiz[currentQuestion].a;
      let btns = document.querySelectorAll('.option-button');
      btns.forEach((btn, i) => {
        btn.disabled = true;
        btn.style.backgroundColor = (i === correct) ? 'green' : (i === selected) ? 'red' : '#2196F3';
      });
      if (selected === correct) score++;
    }

    function startTimer() {
      let timeLeft = 15;
      let timer = document.getElementById('timer');
      timer.innerText = `Time left: ${timeLeft}s`;
      timerInterval = setInterval(() => {
        timeLeft--;
        timer.innerText = `Time left: ${timeLeft}s`;
        if (timeLeft <= 0) {
          clearInterval(timerInterval);
          nextQuestion();
        }
      }, 1000);
    }

    function nextQuestion() {
      clearInterval(timerInterval);
      currentQuestion++;
      if (currentQuestion < currentQuiz.length) {
        showQuestion();
      } else {
        document.getElementById('quiz-box').style.display = 'none';
        document.getElementById('result-box').style.display = 'block';
        document.getElementById('score').innerText = `Your score: ${score} / ${currentQuiz.length}`;
      }
    }

    function updateProgressBar() {
      let percent = ((currentQuestion + 1) / currentQuiz.length) * 100;
      document.getElementById('progress').style.width = percent + '%';
    }

    function backToDashboard() {
      document.getElementById('result-box').style.display = 'none';
      document.getElementById('dashboard').style.display = 'block';
    }
