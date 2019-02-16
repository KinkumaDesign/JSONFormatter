// UI Controls
let formatButton, clearButton, copyButton;
let inputTextArea, outputTextArea;
let indentNumInput, toastLabel;
let numStepperUpButton, numStepperDownButton;
const DEFAULT_INDENT_SPACE_SIZE = 2;
const MIN_INDENT_SPACE_SIZE = 0;
const MAX_INDENT_SPACE_SIZE = 100;
const FormatError = {
    empty: "入力が空です",
    parseError: "JSONの形式が正しくありません",
    unknown: "不明なエラーです"
};


function setUIReferences() {
    formatButton = document.getElementById('format_button');
    clearButton = document.getElementById('clear_button');
    copyButton = document.getElementById('copy_button');
    inputTextArea = document.getElementById('input_json_textarea');
    outputTextArea = document.getElementById('output_json_textarea');
    indentNumInput = document.getElementById('indent_num_input');
    toastLabel = document.getElementById('toast_label');
    numStepperUpButton = document.getElementById('numstepper_up_button');
    numStepperDownButton = document.getElementById('numstepper_down_button');
}

function registerEvents() {
    formatButton.addEventListener('click', function(){
        onFormatButtonClick();
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

    indentNumInput.addEventListener('change', function(){
        //文字列などが入っておかしくなることがあるので入れ直す
        const currentNum = getIndentNumInputValue();
        setIndentNumInputValue(currentNum);
    });

    numStepperUpButton.addEventListener('click', function(){
        let num = getIndentNumInputValue();
        num++;
        setIndentNumInputValue(num);
    });

    numStepperDownButton.addEventListener('click', function(){
        let num = getIndentNumInputValue();
        num--;
        setIndentNumInputValue(num);
    });
}

function onFormatButtonClick() {
    const result = formatInputJSON();
    if(result.error){
        setOutputTextAreaStateToHasError();
        setOutputText(result.error);
        return;
    }else if(!result.text){
        setOutputTextAreaStateToHasError();
        setOutputText(FormatError.unknown);
        return;
    }
    setOutputTextAreaStateToDefault();
    setOutputText(result.text);
}

function formatInputJSON() {
    var result = {};
    const inputText = inputTextArea.value.trim();
    if(inputText === ""){
        result.error = FormatError.empty;
        return result;
    }
    const indent = getIndentNumInputValue();
    try{
        result.text = JSON.stringify(JSON.parse(inputText), null, indent);
    }catch(error){
        //console.log(error);
        result.error = FormatError.parseError;
        return result;
    }
    return result;
}

function setOutputText(text) {
    outputTextArea.value = text;
}

function showToastText(text){
    fadeIn(toastLabel);
    setToastLabelText(text);
    setTimeout(function(){
        fadeOut(toastLabel);
    }, 1500);
}

function setToastLabelText(text) {
    toastLabel.textContent = text;
}

function setIndentNumInputValue(num) {
    var validatedNum = parseInt(num, 10);
    if(isNaN(validatedNum)){
        validatedNum = DEFAULT_INDENT_SPACE_SIZE;
    }
    if(validatedNum < MIN_INDENT_SPACE_SIZE){
        validatedNum = MIN_INDENT_SPACE_SIZE;
    }else if(validatedNum > MAX_INDENT_SPACE_SIZE){
        validatedNum = MAX_INDENT_SPACE_SIZE;
    }
    indentNumInput.value = validatedNum;
}

function getIndentNumInputValue() {
    var validatedNum = parseInt(indentNumInput.value, 10);
    if(isNaN(validatedNum)){
        return DEFAULT_INDENT_SPACE_SIZE;
    }
    return validatedNum;
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

function setOutputTextAreaStateToHasError(){
    setClassName(outputTextArea, 'error');
}

function setOutputTextAreaStateToDefault(){
    setClassName(outputTextArea, '');
}

function setClassName(elem, className){
    elem.className = className;
}

window.onload = function() {
    setUIReferences();
    setIndentNumInputValue(DEFAULT_INDENT_SPACE_SIZE);
    registerEvents();
};
