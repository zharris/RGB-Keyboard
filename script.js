const message = document.getElementById('message');
let shifted = false;

window.addEventListener('keydown', function(e) {
    console.log(e);
    keydownHandler(e);
});

window.addEventListener('keyup', function(e) {
    keyupHandler(e);
});

function keydownHandler(e) {
    const key = e.keyCode;
    const targetKey = document.querySelectorAll('.key[data-keycode="' + key + '"]')[(e.location !== 0 ? e.location - 1 : 0)];

    if(targetKey) {
        targetKey.classList.add('pressed');

        switch(key) {
            case 8:
                // backspace
                // if special character
                if(message.innerHTML.charAt(message.innerHTML.length - 1) === ';') {
                    message.innerHTML = message.innerHTML.substr(0, message.innerHTML.lastIndexOf('&'));
                } else {
                    message.innerHTML = message.innerHTML.substr(0, message.innerHTML.length - 1);
                }
                break;
            case 9:
                // tab
                break;
            case 13:
                // enter
                message.innerHTML += '<br />';
                break;
            case 16:
                // shift
                shifted = true;
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
                message.innerHTML += '&nbsp;';
                break;
            case 91:
            case 93:
                // left and right cmd
                break;
            default:
                message.innerHTML += (shifted ? targetKey.dataset.shifted : targetKey.innerHTML);
                break;
        }
    }
}

function keyupHandler(e) {
    key = e.keyCode;
    targetKey = document.querySelectorAll('.key[data-keycode="' + key + '"]')[(e.location !== 0 ? e.location - 1 : 0)];

    if(targetKey) {
        targetKey.classList.remove('pressed');

        if(key === 16) {
            shifted = false;
        }
    }
}