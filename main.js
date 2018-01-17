  var quizNum = 0;
  var replies = [];

  var questions = [
        ['What is the correct JavaScript syntax to write "Hello World"?', '("Hello World")', 'echo "Hello World"', '+document.write("Hello World")', 'response.write("Hello World")'],
        ['JavaScript is the same as Java', 'True', '+False'],
        ['Where is the correct place to insert a JavaScript?', 'The [head] section', 'The [body] sectiond', '+Both the [head] section and the [body] section are correct'],
        ['How do you call a function named "myFunction"?', 'call myFunction()', 'call function myFunction()', '+myFunction()', 'get myFunction()'],
        ['How to insert a comment that has more than one line?', '//This comment hasmore than one line//', '{{This comment has more than one line}', '+/*This comment has more than one line*/'],
        ['Inside which HTML element do we put the JavaScript?', 'js tag', 'javascript tag', '+script tag', 'scripting tag', 'code tag'],
        ['What is the correct way to write a JavaScript array?', 'var colors = (l:"red", 2:"green", 3:"blue")', '+var colors = ["red", "green", "blue"]', 'var colors = "red", "green", "blue"', 'var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")'],
        ['How do you write "Hello World" in an alert box?', 'msg("Hello World");', '+alert("Hello World");', 'alarm("Hello World");', 'msgBox("Hello World");', 'alertBox("Hello World");'],
        ['How do you round the number 7.25, to the nearest integer?', '+Math.round(7.25)', 'Math.md(7.25)', 'round(7.25)', 'round(7.25)'],
        ['What is JavaScript syntax for opening a new window called "w2"?', '+w2 = window.open("http://www.javascript.com");', 'w2 = window.new("http://www.javascript.com");']
      ];

  function timer(direct) {
    timerID = setInterval(opacity, 1, direct);
  };

  function align() {
    var main_field = document.getElementById('main-field'),
        window_height = document.documentElement.clientHeight,
        window_width = document.documentElement.clientWidth,
        main_height = document.getElementById('main-field').clientHeight,
        main_width = document.getElementById('main-field').clientWidth,
        X = (window_width - main_width)*0.5,
        Y = (window_height - main_height)*0.5;
    document.getElementById('main-field').style.left = X + 'px';
      document.getElementById('main-field').style.top = Y + 'px';
  };

  function opacity(direct) {
    var opacity = Number(document.getElementById('main-field').style.opacity);    
    if (direct == 'down') {
      document.getElementById('main-field').style.opacity = opacity - 0.02;
      if (opacity < 0.1) {
        clearInterval(timerID);
          if (replies.length == questions.length) getResultWindow();
          else getQuiz();
      };
    } else {
      document.getElementById('main-field').style.opacity = opacity + 0.02;
      if (opacity > 0.9) clearInterval(timerID);
    };
  };

  function getMainField() {
    if ( document.getElementById('main-field') ) document.body.removeChild( document.getElementById('main-field') );
    var main_field = document.createElement('div');
      main_field.id = 'main-field';
        main_field.style.opacity = 0.9;
      document.body.appendChild(main_field);
    return main_field;
  };

  function getQuiz() {
    var main_field = getMainField();
    
    var quiz_timeline = document.createElement('div');
      quiz_timeline.className = 'quiz-timeline';
    main_field.appendChild(quiz_timeline);

    for (var i = 1; i <= questions.length; i++) {
      var span = document.createElement('span');
        span.className = 'quiz-timeline';
          if (quizNum == i - 1) span.id = 'current';
            span.innerHTML = i;
              if (i < quizNum+1) span.style.color = '#f9a085';
    quiz_timeline.appendChild(span);
    }

    var question = document.createElement('div');
      question.innerHTML = questions[quizNum][0];
        question.className = 'question';
          question.id = 'question';
    main_field.appendChild(question);
    
    for (var i = 1; i < questions[quizNum].length; i++) {
      var radio = document.createElement('input');
        if (i == 1) radio.checked = true;
          radio.type = 'radio';
            radio.name = 'radio';
              radio.className = 'radio';
                radio.value = questions[quizNum][i];
      var label = document.createElement('div');
        if (questions[quizNum][i][0] == '+') {
          label.innerHTML = questions[quizNum][i].substring(1);
            radio.id = 'correct';
        } else label.innerHTML = questions[quizNum][i];
          label.className = 'label';
      main_field.appendChild(radio);
        main_field.appendChild(label);
          main_field.appendChild(document.createElement('br'));
    };

    if (quizNum < questions.length - 1) quizNum++;
    
    var footer = document.createElement('div');
      footer.className = 'footer';
    main_field.appendChild(footer);
    
    var button_text = document.createElement('span');
      button_text.innerHTML = 'NEXT';
    var button = document.createElement('button');
      button.type = 'submit';
        button.className = 'button animated';
          button.id = 'button';
            button.onclick = function() {
              if (document.querySelector('input[name = "radio"]:checked').id == 'correct') replies.push('true');
              else replies.push('false');
              timer('down');
            };
    button.appendChild(button_text);
      footer.appendChild(button);
    align();
    timer('up');
  };

  function getResultWindow() {
    var corr = 0, percent;
    for (var i in replies) {
      if (replies[i] == 'true') corr++;
    };
    percent = corr/replies.length * 100;

    var main_field = getMainField();

    var final_title = document.createElement('div');
          final_title.innerHTML = 'You answered ' + percent + '% (' + corr + ' of the 10) of the questions on the quiz correctly!';
            final_title.style.color = '#606060';
    main_field.appendChild(final_title); 
    align();
  };

  function getStartWindow() {
    var button_text = document.createElement('span');
      button_text.innerHTML = 'START TESTING';
    var button = document.createElement('button');
      button.type = 'submit';
        button.className = 'button start';
          button.id = 'button';
    var main_field = getMainField();
      button.appendChild(button_text);
  	    main_field.appendChild(button);
    align();
    button.onclick = function() {
      timer('down');
    };
  };

window.onload = getStartWindow; 