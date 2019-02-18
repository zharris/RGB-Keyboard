const message = document.getElementById('message');

window.addEventListener('keydown', function(e) {
    keydownHandler(e.keyCode);
});

window.addEventListener('keyup', function(e) {
    keyupHandler(e.keyCode);
});

function keydownHandler(key) {
    const targetKey = document.querySelector('.key[data-keycode="' + key + '"]');
    targetKey.classList.add('pressed');

    console.log(targetKey.innerHTML);

    switch(key) {
        case 8:
            // backspace
            message.innerHTML = message.innerHTML.substr(0, message.innerHTML.length - 1);
            break;
        case 9:
            // tab
            break;
        case 13:
            // enter
            break;
        case 16:
            // shift
            break;
        case 17:
            // ctrl
            break;
        case 18:
            // opt
            break;
        case 20:
            // caps lock
            break;
        case 32:
            // spacebar
            break;
        case 91:
        case 93:
            // left and right cmd
            break;
        default:
            message.innerHTML += targetKey.innerHTML;
            break;
    }
}

function keyupHandler(key) {
    const targetKey = document.querySelector('.key[data-keycode="' + key + '"]');
    targetKey.classList.remove('pressed');
}