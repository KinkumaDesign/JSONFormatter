// UI Controls
let formatButton, clearButton, copyButton;
let inputTextArea, outputTextArea;
let indentNumInput, toastLabel;

function setUIReferences() {
    formatButton = document.getElementById('format_button');
    clearButton = document.getElementById('clear_button');
    copyButton = document.getElementById('copy_button');
    inputTextArea = document.getElementById('input_json_textarea');
    outputTextArea = document.getElementById('output_json_textarea');
    indentNumInput = document.getElementById('indent_num_input');
    toastLabel = document.getElementById('toast_label')
}

function registerEvents() {
    formatButton.addEventListener('click', function(){
        const text = formatInputJSON();
        if(text !== null){
            setOutputText(text);
        }
    });

    clearButton.addEventListener('click', function(){
        window.getSelection().removeAllRanges();
        inputTextArea.value  = '';
        outputTextArea.value = '';
        inputTextArea.focus();
    });

    copyButton.addEventListener('click', function(){
        outputTextArea.select();
        document.execCommand('copy');
        showToastText('コピーしました');
    });
}

function formatInputJSON() {
    const inputText = inputTextArea.value.trim();
    if(inputText === ""){
        return null;
    }
    const spaceNumRaw = parseInt(indentNumInput.value, 10);
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
    outputTextArea.value = text;
}

function showToastText(text){
    fadeIn(toastLabel);
    setToastLabelText(text);
    setTimeout(function(){
        fadeOut(toastLabel);
    }, 1000);
}

function setToastLabelText(text) {
    toastLabel.textContent = text;
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
    setUIReferences();
    registerEvents();
};
