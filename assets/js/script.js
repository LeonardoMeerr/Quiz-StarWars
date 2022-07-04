// ---INITIAL DATA---
const qs = (el)=>document.querySelector(el);
const qsA = (el)=>document.querySelectorAll(el);

let currentQuestion = 0;
let correctAnswer = 0;

showQuestion();
// ---EVENTS---
qs('.scoreArea button').addEventListener('click', resetEvent);

// ---FUNCTIONS---
function showQuestion(){
    if(questions[currentQuestion]){
        let q = questions[currentQuestion];

        //barrinha de progresso
        let pct = Math.floor((currentQuestion / questions.length) * 100); //porcentagem que cada questão vai fazer a barra preencher
        qs('.progress--bar').style.width = `${pct}%`;

        qs('.scoreArea').style.display = 'none';
        qs('.questionArea').style.display = 'block';
        qs('.question').innerHTML = q.question;

        let optionsHtml = '';
        //cria uma div pra cada pergunta
        for(let i in q.options){
            optionsHtml += `<div data-op="${i}" class="option"><img class="qImage image${i}" src="" />${q.options[i]}</div>`;
        }

        qs('.options').innerHTML = optionsHtml;

        qsA('.options .option').forEach(item=>{
            item.addEventListener('click', optionClickEvent);
        });

        qs('.image0').src = 'assets/images/luke.png';
        qs('.image1').src = 'assets/images/chewie.png';

        if(qs('.image2') === null){
        } else {
            qs('.image2').src = 'assets/images/yoda.png';
        }

        if(qs('.image3') === null){
        } else {
            qs('.image3').src = 'assets/images/vader.png';
        }

    } else {
        finishQuiz();
    }
}

function optionClickEvent(e){
    let clickedOption = parseInt(e.target.getAttribute('data-op'));

    if(questions[currentQuestion].answer === clickedOption){
        correctAnswer++; //quando acerta a pergunta, ele soma +1 na soma pra mostrar no final
    }

    //pula pra próxima questão
    currentQuestion++;
    showQuestion();
}

function finishQuiz(){
    let points = Math.floor((correctAnswer / questions.length) * 100); //checa quantas respostas corretas

    //dependendo da nota(points) alteram-se as frases e cores
    if(points < 30){
        qs('h1').innerHTML = `"Lembre-se sempre: seu foco determina a sua realidade"<p>Qui-Gon Jinn</p>`;
        qs('.prizeImage').src = 'assets/images/imperio.png';
        qs('.scoreText1').innerHTML = 'Tá ruim hem?<p>Não é assim que a Força funciona!</p>';
        qs('.scorePct').style.color = '#F00';
    } else if(points >= 30 && points < 70){
        qs('h1').innerHTML = `"Com o tempo, aprenderá a confiar em seus instintos… Então, será invencível!"<p>Obi-Wan Kenobi</p>`;
        qs('.prizeImage').src = 'assets/images/jedi.png';
        qs('.scoreText1').innerHTML = 'Muito bom!<p>Jovem Padawan</p>';
        qs('.scorePct').style.color = '#FF0';
    } else if(points >= 70){
        qs('h1').innerHTML = `"Eu estou com a Força e a Força está comigo"<p>Chirrut Îmwe</p>`;
        qs('.prizeImage').src = 'assets/images/jedi.png';
        qs('.scoreText1').innerHTML = 'Parabéns!<p>Um verdadeiro Mestre Jedi!</p>';
        qs('.scorePct').style.color = '#0D630D';
    }

    qs('.scorePct').innerHTML = `Acertou ${points}%`;
    qs('.scoreText2').innerHTML = `Acertou ${correctAnswer} de ${questions.length} questões`;

    qs('.scoreArea').style.display = 'block';
    qs('.questionArea').style.display = 'none';
    qs('.progress--bar').style.width = `100%`;
}

function resetEvent(){
    qs('h1').innerHTML = `"Faça ou não faça... tentativa não há"<p>Yoda, Mestre</p>`;
    correctAnswer = 0;
    currentQuestion = 0;
    showQuestion();
}