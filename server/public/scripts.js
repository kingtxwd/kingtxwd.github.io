let word = '';
let c = 0;
let life = 7;
let guessedWords = {};
init();
function start(){
    word = document.getElementById('input-part1').value.toLowerCase();
    c = 0;
    life = 7;
    guessedWords = {};
    init();
    document.getElementsByClassName("part1")[0].style.display = 'none';
    document.getElementsByClassName("part2")[0].style.display = 'block';
}
function random(){
    fetch('http://localhost:3000/words')
        .then(function(data) { 
            data.text().then(function(text) {
                word = text.toLowerCase();      
                c = 0;
                life = 7;
                guessedWords = {};
                init();
                document.getElementsByClassName("part1")[0].style.display = 'none';
                document.getElementsByClassName("part2")[0].style.display = 'block';
            });                  
        })
        .catch(function(error) {
            alert(error);
        });

}
function init(){
    document.getElementsByClassName('container')[0].innerHTML = '';
    for(i = 0; i < word.length;i++){
        document.getElementsByClassName('container')[0].innerHTML += `<div class="character"><input type="text" maxlength="1" name="c${i+1}" id="input-${i+1}" disabled></div>`;
    }
    document.getElementById('input-c').value = '';
    document.getElementsByClassName('guessed-alpha')[0].innerText = '';
    document.getElementById('life').value = life;
}
function guess(){
    const guess = document.getElementById('input-c').value.toLowerCase();
    if (guessedWords[guess]){
        alert(`${guess} Already Used`);
        return false;
    } else {
        guessedWords[guess] = true;
        document.getElementsByClassName('guessed-alpha')[0].innerHTML += guess + ' ';
    }

    var url = '/guess';
    var data = {character: guess};

    fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(res =>  res.json())
    .then(response => {
        console.log(response);
        let f = 0;
        for (i = 0; i < response.length; i++){
            if (response[i])
            {
                document.getElementById('input-' + (i+1)).value = guess;
                c++;            
                f = 1;
            }
        }
        if (c === response.length) {alert('Success');}
        if (f === 0){ life--; document.getElementById('life').value = life; }
        if (life === 0) {alert('You are Dead');}
    })
    .catch(error => console.error('Error:', error));   
}
function restart(){
    document.getElementsByClassName("part2")[0].style.display = 'none';
    document.getElementsByClassName("part1")[0].style.display = 'block';
}
