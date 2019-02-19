const message = document.getElementById('message');
let shifted = false;
let capsLock = false;

const preventDefaultOn = [9];

window.addEventListener('keydown', function(e) {
    if(preventDefaultOn.includes(e.keyCode)) {
        e.preventDefault();
    }

    // console.log(e);
    keydownHandler(e);
});

window.addEventListener('keyup', function(e) {
    keyupHandler(e);
});

function keydownHandler(e) {
    const key = e.keyCode;
    const targetKeys = document.querySelectorAll('#keyboard .key[data-keycode="' + key + '"]');
    const targetKey = (targetKeys.length > 1 ? targetKeys[(e.location !== 0 ? e.location - 1 : 0)] : targetKeys[0]);

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
                message.innerHTML += '&#09;';
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
                if(capsLock) {
                    targetKey.classList.remove('pressed');
                }

                capsLock = !capsLock;
                break;
            case 32:
                // spacebar
                message.innerHTML += '&nbsp;';
                break;
            case 91:
                // left cmd
                break;
            case 93:
                // right cmd
                targetKey.classList.add('pressed');
                break;
            default:
                if(shifted) {
                    message.innerHTML += targetKey.dataset.shifted;
                } else {
                    message.innerHTML += (capsLock && targetKey.classList.contains('letter') ? targetKey.dataset.shifted : targetKey.innerHTML);
                }

                break;
        }

        // HEATMAP
        const heatmapTargetKeys = document.querySelectorAll('#heatmap .key[data-keycode="' + key + '"]');
        const heatmapTargetKey = (heatmapTargetKeys.length > 1 ? heatmapTargetKeys[(e.location !== 0 ? e.location - 1 : 0)] : heatmapTargetKeys[0]);

        heat(heatmapTargetKey);
    }
}

function keyupHandler(e) {
    const key = e.keyCode;
    const targetKeys = document.querySelectorAll('#keyboard .key[data-keycode="' + key + '"]');
    const targetKey = (targetKeys.length > 1 ? targetKeys[(e.location !== 0 ? e.location - 1 : 0)] : targetKeys[0]);

    if(targetKey) {
        targetKey.classList.remove('pressed');

        switch(key) {
            case 16:
                shifted = false;
                break;
            case 20:
                if(capsLock) {
                    capsLock = !capsLock;
                } else {
                    capsLock = !capsLock;
                    targetKey.classList.add('pressed');
                }

                const heatmapTargetKey = document.querySelector('#heatmap .key[data-keycode="' + key + '"]');
                heat(heatmapTargetKey);

                break;
            default:
                break;
        }
    }
}

function heat(key) {
    if(!key.classList.contains('heated')) {
        key.classList.add('heated');
        key.setAttribute('style', 'background: rgba(255, 0, 0, 0.1)');
    } else {
        const bgSplit = key.style.backgroundColor.split(', ');
        const alpha = bgSplit[bgSplit.length - 1];
        const newAlpha = (parseFloat(alpha.substr(0, alpha.length - 1)) === 0.9 ? 0.9 : parseFloat(alpha.substr(0, alpha.length - 1)) + 0.1);
        
        key.setAttribute('style', 'background: rgba(255, 0, 0, ' + newAlpha + ');');
    }
}