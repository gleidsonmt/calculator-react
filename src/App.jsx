import { useState, useTransition } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("0");
  const [formula, setFormula] = useState("");
  const [nothing, setNothing] = useState(true);
  const [hide, setHide] = useState(false);

  let primaryPattern = /(\d+(\.\d+)?)[/|*|x]+(\d+(\.\d+)?)/g;
  let secondryPattern = /(\d+(\.\d+)?)[+|-]+(\d+(\.\d+)?)/g;
  // let initial = "33*0.5";
  let initial = "33.5+0.5-2/4";

  ///// Agora testar com pattern duplo

  // console.log("30+3".match(secondryPattern)); // ["30+3"]
  // let math = "300+3".match(secondryPattern).join("").split(/[+|-]/g);
  // console.log("math", math); // ["30", "+", "3"]

  // let answer = recurse(initial); // "3+0-2/4"

  let t = "5+-6";
  // let r = recurse(initial);

  // let equation = /((-)?\d+([-*/+x])(\.\d+)?)/g;
  let equation = /(\-?\d+(.\d+?))([*])?(-?\d+(.\d?)+$)/g;
  let numbers = /(-?\d+\.\d+)/g;
  let eqTst = "-5.2-5.2".match(equation);

  // (?<!\d): Um lookbehind que assegura que não há um dígito antes do número.

  // let backup
  // e um numero ((-)?\d+(\.\d+)?) pode ou nao comecar com - e pode ser um numero quebrado
  // (((?<![+])-)? nao comeca com um operador e pode conter -
  // let test =
  // console.log(
  //   "-3+30+-0.5".match(/((-)?\d+(\.\d+)?)([/*+-])+((-)?\d+(\.\d+)?)/g)
  // );

  // let f = "-2+20";
  // let f = "-5+7+2+-5";
  // let f = "-5.2/-3.5+2-5";
  // let match = f.match(/(^-?\d+|^-?\d+\.\d+?)([/])(-?\d+\.\d+|-?\d+)/);

  // console.log(match);
  // console.log(match[0]);

  // let a = match[1];
  // let s = match[2];
  // let b = match[3];
  // let r = doOperation(s, parseFloat(a), parseFloat(b));

  // console.log("res", rec("5/2+4"));
  // console.log("res", rec("5-9+5"));
  // let str = "3+5+52*60-2/4";
  // console.log(str.match(/(-?[\d]+)([*])([\d]+)/));
  // let te = rec("5++5+6");
  // console.log("rec", te);

  // console.log("r", !isNaN("-2.0"));

  function rec(str) {
    console.log("resulting", str);
    // let operations = str.match(/[+/x*-]{2}/g);
    // if (operations) {
    //   for (let operation of operations) {
    //     let arr = operation.split("");
    //     console.log("op", arr);

    //     //     if (arr[1] != "-") {
    //     //       // exclui o ultimo
    //     //       let temp = arr.pop();
    //     //       arr[1] = temp;
    //     //       console.log(temp);
    //     //       console.log(arr);
    //     //       str = str.replace(operation, arr.join(""));
    //     //       console.log(str);
    //     //     } else {
    //     //       str = str.replace(arr[2], "");
    //     //       console.log(str);
    //     //     }
    //     //     // let temp = arr[2];
    //     //     // arr[2] = arr[1];
    //     //     // arr[1] = temp;
    //     //     // console.log(str);
    //     //     // console.log(arr);
    //     //     // console.log(str.replace(operation, arr.join("")));
    //     //     // console.log(str.replace(operation.join(""), arr.join("")));
    //   }
    // }

    let pOperation = /(-?\d+|^-?\d+\.\d+?)([/*x])(-?\d+\.\d+|-?\d+)/; // primary operations like * ou /
    let sOperation = /(-?\d+|^-?\d+\.\d+?)([-+])(-?\d+\.\d+|-?\d+)/; // secondary operations like + ou -
    let verOne = str.match(pOperation); // First verification if have a * ou / operation
    let verTwo = str.match(sOperation); // Second verification if have a + ou - operation
    let result = str.match(pOperation) ? verOne : verTwo;
    if (result) {
      let r = doOperation(
        result[2],
        parseFloat(result[1]),
        parseFloat(result[3])
      ).toFixed(4);
      str = str.replace(result[0], r);
      return rec(str);
    } else {
      return parseFloat(str);
    }
  }

  //8-6+5+8+9
  const handleResult = (e) => {
    // if (calculated) return;

    let result = rec(formula.replace(" ", ""));

    setFormula(String(result));
    setInput(String(result));
  };

  const handleClear = (e) => {
    setFormula("0");
    setInput("0");
    setNothing(true);
  };

  const handleEvent = (e) => {
    let displayText = e.target.innerText.toLowerCase();
    // digito anterior
    let newText = input + displayText;
    let aText = formula.substring(formula.length - 1, formula.length);
    /// novo digito displayText
    let combine = aText + displayText;
    if (nothing) {
      setInput(displayText);
      setNothing(false);
      setFormula(displayText);
      return;
    }

    // console.log(displayText.match(/[*/+x]/));
    let operations = (formula + displayText).match(/[+/x*-]{3}/g);
    console.log(input + displayText);
    console.log(operations);
    if (operations) {
      for (let operation of operations) {
        let re = operation.split("");
        re.pop();
        console.log(re.join(""));
        console.log("formula", formula.replace(re.join(""), displayText));
        setFormula(formula.replace(re.join(""), displayText));
        setInput(displayText);
        return;
      }
    }
    operations = (formula + displayText).match(/[+/x*-]{2}/g);
    if (operations) {
      for (let operation of operations) {
        let re = operation.split("");
        console.log(re);
        if (re[1] != "-") {
          let last = formula[formula.length - 1];
          console.log("l", last);
          setFormula(formula.replace(last, re[1]));
          setInput(displayText);
          return;
        }
      }
    }

    // if (operations) {
    //   console.log(operations[0]);
    //   setFormula(formula + displayText);
    //   console.log(", ", formula);
    //   setFormula(formula.replace(operations[0], displayText));
    //   return;
    // }

    // if (combine.match(/[*/x+][*/x+]/)) {
    //   console.log(input.substring(input.length - 1));
    //   setInput(displayText);
    //   console.log("chala", formula.substring(formula.length - 1));
    //   setFormula(formula + displayText);
    //   setFormula(formula.replace(formula.substring(formula.length - 2)));
    //   return;
    // }

    // se numero valido
    let dots = (input + displayText).match(/[\.]/g);
    if (dots && dots.length > 1) return;
    if (input + displayText == "00") return;
    // if (input.length == 1 && displayText.match(/\d[*/+x]/g)) return;
    // if (combine.match(/\d[*/+x]/g)) return;
    let ver = (input + displayText).match(/^-?\d+(\.?\d+)$|^-?\d+(\.?)$/g);
    // let ver = "5+".match(/^-?\d+$(\.?\d+)?/g);
    if (ver) {
      if (displayText.match(/\d[*/+x]/g)) {
        setInput(displayText);
      } else {
        setInput(input + displayText);
      }
      setFormula(formula + displayText);
    } else {
      // console.log(displayText);
      // if (isNaN(input) && isNaN(displayText)) {
      //   console.log("-------------------");
      //   setFormula(replaceLast(formula, displayText));
      // } else {

      // }

      // console.log("r", replaceLast(formula + displayText));

      setFormula(formula + displayText);

      setInput(displayText);
    }
  };

  function replaceLast(str, last) {
    console.log(str);
    let a = str.substring(str.length - 1, str.length);
    str = str.replace(a, last);
    // str += last;
    return str;
    // str = str.substring(str.length -1);
    // str +=
  }

  function doOperation(op, a, b) {
    switch (op) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "*":
      case "x":
        return a * b;
      case "/":
        return a / b;
      default:
        return 0;
    }
  }

  //3 + 5 * 6 - 2 / 4
  return (
    <div className="wrapper">
      <div id="display">{formula}</div>
      <div className={`formula`}>{input}</div>

      <div id="pad">
        <button id="clear" onClick={handleClear}>
          AC
        </button>
        <button id="divide" onClick={handleEvent}>
          /
        </button>
        <button id="multiply" onClick={handleEvent}>
          *
        </button>
        <button onClick={handleEvent} id="seven">
          7
        </button>
        <button onClick={handleEvent} id="eight">
          8
        </button>
        <button onClick={handleEvent} id="nine">
          9
        </button>
        <button id="subtract" onClick={handleEvent}>
          -
        </button>
        <button onClick={handleEvent} id="four">
          4
        </button>
        <button onClick={handleEvent} id="five">
          5
        </button>
        <button onClick={handleEvent} id="six">
          6
        </button>
        <button id="add" onClick={handleEvent}>
          +
        </button>
        <button onClick={handleEvent} id="one">
          1
        </button>
        <button onClick={handleEvent} id="two">
          2
        </button>
        <button onClick={handleEvent} id="three">
          3
        </button>
        <button onClick={handleResult} id="equals">
          =
        </button>
        <button onClick={handleEvent} id="zero">
          0
        </button>
        <button onClick={handleEvent} id="decimal">
          .
        </button>
      </div>
    </div>
  );
}

export default App;
