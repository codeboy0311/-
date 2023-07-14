
var result = new Array();
var ops = "+-*/";

function arrToStr(arr) {
    var strResult = "";
    for (var i = 0; i < arr.length; i++) {
        strResult += arr[i];
    }
    return strResult;
}


function showResult() {
    document.getElementById("showExpress").value = arrToStr(result);

}


function showNum(id) {
   var express= document.getElementById('showExpress').value
   if(express.indexOf('=')!=-1){
    //    document.getElementById('showExpress').value=id.innerHTML
       result=[]
   }
    var val = id.innerHTML;
    if (ops.includes(val)) {
        if (ops.includes(result[result.length - 1])) {
            result.pop()
        }
    }
    document.getElementById('result').value = val
    result.push(val);
    showResult();
}


function showAnswer() {

    var answer = "";
    var str = arrToStr(result);
    var midExpre = strToExpress(str);
    var suffixExpre = midToSuffix(midExpre);
    answer = suffixValue(suffixExpre);

    //console.log(midExpre);
    //console.log(suffixExpre);
    result.unshift(answer.toString())
    console.log(result)
    result = [result[0], ...result.slice(-2)]
    console.log(result)
    document.getElementById("showExpress").value = str + "=" + answer;
    document.getElementById('result').value = answer

}


function clearResult() {
    result = [];
    document.getElementById('result').value = 0
    showResult();
}


function clearOneResult() {
    result.pop();
    showResult();
    document.getElementById('result').value = ''
}



function strToExpress(str) {

    var textArr = str.split('');
    var newTextArr = [];
    var calTextArr = [];

    for (var i = 0; i < str.length; i++) {
        if (ops.indexOf(str[i]) != -1) {

            newTextArr.push("|", str[i], "|");
        }
        else {
            newTextArr.push(textArr[i]);
        }
    }

    calTextArr = newTextArr.join('').split('|');//将生成的数组转换为字符串的形式，然后根据分隔符转换为数组
    console.log(calTextArr)
    return calTextArr;
}


function midToSuffix(midExpre) {

    var opStack = [];
    var suffixExpre = [];

    for (var i = 0; i < midExpre.length; i++) { // 遍历整个表达式数组

        if (ops.indexOf(midExpre[i]) != -1) { //判断有没有符号，没有的话直接将原数组，赋值给新数组

            if (opStack.length == 0 || Priority(midExpre[i]) > Priority(opStack[opStack.length - 1])) {
                opStack.push(midExpre[i]);
            }
            else {
                do {
                    suffixExpre.push(opStack.pop());
                } while (opStack.length > 0 && Priority(midExpre[i]) <= Priority(opStack[opStack.length - 1]));

                opStack.push(midExpre[i]);
            }
        } else {
            suffixExpre.push(midExpre[i]);
        }
    }

    while (opStack.length > 0) {
        suffixExpre.push(opStack.pop());
    }
    console.log(suffixExpre)
    return suffixExpre;

}

function Priority(op) {
    var opPri = 0;
    switch (op) {
        case "+":
            opPri = 1;
            break;
        case "-":
            opPri = 1;
            break;
        case "*":
            opPri = 2;
            break;
        case "/":
            opPri = 2;
            break;

    }
    return opPri;
}

function suffixValue(suffixExpre) {
    var calStack = [];

    console.log(suffixExpre);
    for (var i = 0; i < suffixExpre.length; i++) {
        if (ops.indexOf(suffixExpre[i]) != -1) {
            var opRight = Number(calStack.pop());
            var opLeft = Number(calStack.pop());
            var tmpResult = 0;
            switch (suffixExpre[i]) {
                case '+':
                    tmpResult = opLeft + opRight;
                    break;
                case '-':
                    tmpResult = opLeft - opRight;
                    break;
                case '*':
                    tmpResult = opLeft * opRight;
                    break;
                case '/':
                    tmpResult = opLeft / opRight;
                    break;
            }
            calStack.push(tmpResult);
        }
        else {
            calStack.push(suffixExpre[i]);
        }

        console.log(calStack);
    }

    return calStack.pop();
}
