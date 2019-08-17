let word = '';
let c = 0;
let life = 7;
let guessedWords = {};
let alphabet = {
    a:true,
    b:true,
    c:true,
    d:true,
    e:true,
    f:true,
    g:true,
    h:true,
    i:true,
    j:true,
    k:true,
    l:true,
    m:true,
    n:true,
    o:true,
    p:true,
    q:true,
    r:true,
    s:true,
    t:true,
    u:true,
    v:true,
    w:true,
    x:true,
    y:true,
    z:true,
}

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
        document.getElementsByClassName('container')[0].innerHTML += `<div class="character" id="input-${i+1}"></div>`;
    }
    document.getElementsByClassName('alphabet')[0].innerHTML = '';
    Object.keys(alphabet).forEach(function(key){
        document.getElementsByClassName('alphabet')[0].innerHTML += `<div class="alphabetkey"  onclick="keyClicked(this);"  data-key=${key}>${key.toUpperCase()}</div>`
    });
    
    document.getElementById('input-c').value = '';
    document.getElementsByClassName('guessed-alpha')[0].innerText = '';
    document.getElementById('life').innerHTML = life;
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
                document.getElementById('input-' + (i+1)).innerHTML = guess;
                c++;            
                f = 1;
            }
        }
        if (c === response.length) {alert('Success');}
        if (f === 0){ life--; document.getElementById('life').innerHTML = life; }
        if (life === 0) {alert('You are Dead');}
    })
    .catch(error => console.error('Error:', error));   
}
function restart(){
    document.getElementsByClassName("part2")[0].style.display = 'none';
    document.getElementsByClassName("part1")[0].style.display = 'block';
}
function keyClicked(event) {
    document.getElementById('input-c').value = event.dataset.key;
    event.classList.add('alphabetkey-disable');
    guess();
}
