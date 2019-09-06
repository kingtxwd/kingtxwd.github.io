let word = '';
let c = 0;
let life = 7;
let guessedWords = {};
let currentInput = null;
random();
function random(){
    fetch('/words')
        .then(function(data) { 
            data.text().then(function(text) {
                word = text.toLowerCase();      
                c = 0;
                life = 7;
                guessedWords = {};
                document.getElementsByClassName('container')[0].innerHTML = '';
                for(i = 0; i < word.length;i++){
                    document.getElementsByClassName('container')[0].innerHTML += `<div class="character" id="input-${i+1}"></div>`;
                }
                document.getElementsByClassName('alphabet')[0].innerHTML = '';
                fetch('/alphabet')
                    .then(function(data) {
                        data.json().then(function(alphabets){
                            alphabets.forEach(function(key){
                                document.getElementsByClassName('alphabet')[0].innerHTML += `<div class="alphabetkey"  onclick="keyClicked(this);"  data-key=${key}>${key.toUpperCase()}</div>`
                            });
                            currentInput = null;
                            document.getElementById('life').innerHTML = life;
                        });
                    })
                    .catch(function(error) {
                        alert(error);
                    });
            });                  
        })
        .catch(function(error) {
            alert(error);
        });

}
function guess(){
    document.getElementsByClassName('alphabet')[0].classList.add('non-click');
    const guess = currentInput.toLowerCase();
    if (guessedWords[guess]){
        alert(`${guess} Already Used`);
        document.getElementsByClassName('alphabet')[0].classList.remove('non-click');
        return false;
    } else {
        guessedWords[guess] = true;
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
        document.getElementsByClassName('alphabet')[0].classList.remove('non-click');
        let f = 0;
        for (i = 0; i < response.length; i++){
            if (response[i])
            {
                document.getElementById('input-' + (i+1)).innerHTML = guess;
                c++;            
                f = 1;
            }
        }
        if (c === response.length) {alert('Success');random();}
        if (f === 0){ life--; document.getElementById('life').innerHTML = life; }
        if (life === 0) {alert('You are Dead');random();}
    })
    .catch(error => console.error('Error:', error));   
}
function restart(){
    random();
}
function keyClicked(event) {
    currentInput = event.dataset.key;
    event.classList.add('alphabetkey-disable');
    guess();
}
