const dictionary = ['hello','world','restaurant']
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
    word = dictionary[Math.floor(Math.random()*dictionary.length)];
    c = 0;
    life = 7;
    guessedWords = {};
    init();
    document.getElementsByClassName("part1")[0].style.display = 'none';
    document.getElementsByClassName("part2")[0].style.display = 'block';
}
function init(){
    // document.getElementById("demo").innerHTML = "Paragraph changed!";
    // var para = document.createElement("p");
    // var node = document.createTextNode("This is new.");
    // para.appendChild(node);
    document.getElementsByClassName('container')[0].innerHTML = '';
    for(i = 0; i < word.length;i++){
        document.getElementsByClassName('container')[0].innerHTML += `<div class="character"><input type="text" maxlength="1" name="c${i+1}" id="input-${i+1}" disabled></div>`;
    }
    document.getElementById('input-c').value = '';
    document.getElementsByClassName('guessed-alpha')[0].innerText = '';
    document.getElementById('life').value = life;
}
function guess(){
    const array = word.split('');
    const guess = document.getElementById('input-c').value.toLowerCase();
    if (guessedWords[guess]){
        alert(`${guess} Already Used`);
        return false;
    } else {
        guessedWords[guess] = true;
        document.getElementsByClassName('guessed-alpha')[0].innerHTML += guess + ' ';
    }
    let f = 0;
    for (i = 0; i < array.length; i++){
        if (guess === array[i])
        {
            document.getElementById('input-' + (i+1)).value = guess;
            c++;            
            f = 1;
        }
        if (c === array.length){
            alert('Correct');
            break;
        }
    }
    if (f === 0){ life--; document.getElementById('life').value = life; }
    if (life === 0) {alert('You are Dead');}
}
function restart(){
    document.getElementsByClassName("part2")[0].style.display = 'none';
    document.getElementsByClassName("part1")[0].style.display = 'block';
}
