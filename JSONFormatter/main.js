function registerEvents() {
    const formatButton = document.getElementById('format_button');
    formatButton.addEventListener('click', function(){
        const text = formatInputJSON();
        if(text !== null){
            setOutputText(text);
        }
    });

    const clearButton = document.getElementById('clear_button');
    clearButton.addEventListener('click', function(){
        window.getSelection().removeAllRanges();
        document.getElementById('input_json_textarea').value  = '';
    });

    const copyButton = document.getElementById('copy_button');
    copyButton.addEventListener('click', function(){
        const outputTextArea = document.getElementById('output_json_textarea');
        outputTextArea.select();
        document.execCommand('copy');
        toastState('Copied!');
    });
}

function formatInputJSON() {
    const inputText = document.getElementById('input_json_textarea').value.trim();
    if(inputText === ""){
        return null;
    }
    const spaceNumRaw = parseInt(document.getElementById('space_num').value, 10);
    const spaceNum = isNaN(spaceNumRaw) ? 4 : spaceNumRaw;
    let formattedText;
    try{
        formattedText = JSON.stringify(JSON.parse(inputText), null, spaceNum);
    }catch(error){
        console.error(error);
        return null;
    }
    return formattedText;
}

function setOutputText(text) {
    document.getElementById('output_json_textarea').value = text;
}

function toastState(text){
    const label = document.getElementById('state_change_label');
    fadeIn(label);
    setStateLabelText(text);
    setTimeout(function(){
        fadeOut(label);
    }, 1000);
}

function setStateLabelText(text) {
    const label = document.getElementById('state_change_label');
    label.textContent = text;
}

function clearStateChangeLabel() {
    setStateLabelText('');
}

function fadeIn(elem){
    elem.setAttribute('style', 'opacity:1;');
}

function fadeOut(elem, callback){
    elem.setAttribute('style', 'opacity:0;');
    setTimeout(function(){
        if(callback){
            callback();
        }
    }, 0.5 * 1000);
}

window.onload = function() {
    registerEvents();
}