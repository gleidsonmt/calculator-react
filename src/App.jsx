import { useState, useTransition } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("0");
  const [result, setResult] = useState();
  const [formula, setFormula] = useState("");
  const [calculated, setCalculated] = useState(false);
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
  // let str = "3+5+52*60-2/4";
  // console.log(str.match(/(-?[\d]+)([*])([\d]+)/));

  function rec(str) {
    let pOperation = /(-?\d+|^-?\d+\.\d+?)([/*x])(-?\d+\.\d+|-?\d+)/; // primary operations like * ou /
    let sOperation = /(-?\d+|^-?\d+\.\d+?)([-+])(-?\d+\.\d+|-?\d+)/; // secondary operations like + ou -
    let verOne = str.match(pOperation); // First verification if have a * ou / operation
    let verTwo = str.match(sOperation); // Second verification if have a + ou - operation
    let result = str.match(pOperation) ? verOne : verTwo;
    console.log("ver", str.match(pOperation));

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

  function findEquation(str) {
    // let primary = /((-)?\d+(\.\d+)?)([/|*|x])((-)?\d+(\.\d+)?)/g;
    // let primary = /(((?<![+])-)?\d+(\.\d+)?)([/|*|x])((-)?\d+(\.\d+)?)/g; // ao contrario do q eu queria
    let primary = /((-)?\d+(\.\d+)?)([/*]){1,2}((-)?\d+(\.\d+)?)/g;
    let secondary = /((-)?\d+(\.\d+)?)([+|-]){1,2}((-)?\d+(\.\d+)?)/g;
    let one = str.match(primary);
    if (one) {
      return one.join("");
    } else {
      return str.match(secondary) ? str.match(secondary).join("") : null;
    }
  }

  function getEquation(str) {
    let numbers = str.match(/(\d)/g);
    let signal = str.match(/[-+/*]/g).join("");
    return {
      a: parseFloat(numbers[0]),
      b: parseFloat(numbers[1]),
      op: signal,
    };
  }

  function getEquationOld(str) {
    let ultimate = str.match(/([+|-])?([+|-])((-)?\d+(\.\d+)?)$/g);
    let signals = ultimate
      .join("")
      .match(/[+]?[-]/g)
      .join("")
      .split("");
    let numbers = str.match(/((-)?\d+(\.\d+)?)/g);
    if (signals.length < 2) {
      signals[0] = numbers[1].substring(0, 1);
      numbers[1] = numbers[1].substring(1);
    }
    return {
      a: parseFloat(numbers[0]),
      b: parseFloat(numbers[1]),
      op: signals[0],
    };
  }

  function doEquation(eq) {
    switch (eq.op) {
      case "+":
        return eq.a + eq.b;
      case "*":
      case "x":
        return eq.a * eq.b;
      case "-":
        return eq.a - eq.b;
      case "/":
        return eq.a / eq.b;
    }
  }
  //8-6+5+8+9
  const handleResult = (e) => {
    if (calculated) return;

    let result = rec(formula.replace(" ", ""));
    setFormula(formula + e.target.innerText + result);
    setInput(result);
    setCalculated(true);
  };

  const handleClear = (e) => {
    setFormula("0");
    setInput("0");
    setCalculated(false);
  };

  const handleEvent = (e) => {
    let displayText = e.target.innerText.toLowerCase();
    // digito anterior
    let newText = formula + displayText;
    let aText = formula.substring(formula.length - 1, formula.length);
    /// novo digito displayText
    let combine = aText + displayText;
    setInput(displayText);
    console.log(combine);
    console.log(newText.match(/[*/+x][*/x+]|[-*/+x][-*/x+][-*/x+]/));

    if (newText.match(/[*/+x][*/x+]/)) {
      setFormula(
        formula.replace(formula.substring(formula.length - 1), displayText)
      );
      return;
    }
    if (combine.match(/[-][+/*x]/)) {
      setFormula(
        formula.replace(formula.substring(formula.length - 1), displayText)
      );
      return;
    }

    if (newText.match(/[-+/*/][-+/*x][-/*x]/)) {
      setFormula(
        formula.replace(formula.substring(formula.length - 1), displayText)
      );
      return;
    }

    if (input === "0" && displayText != ".") {
      setFormula(displayText);
    } else {
      setFormula(formula + displayText);
    }
    // console.log("formula", input + displayText);
    console.log("input", input);

    // if (!isNumber(newInput)) {
    //   setInput(displayText);
    // } else if (isNumber(displayText)) {
    //   setInput(input + displayText);
    // }
  };

  function isOperation(str) {
    return str.match(/[-+*x/]/g)
      ? !str.match(/(-)?\d+(\.\d+)?/g)
        ? true
        : false
      : false;
  }

  function isNumber(str) {
    return str.match(/^(\d|-)+(\.)?(\d+)$/g) ? true : false;
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
      <div className={`formula}`}>{formula}</div>
      <div id="display">{input}</div>
      <div id="pad">
        <button id="clear" onClick={handleClear}>
          AC
        </button>
        <button id="divide" onClick={handleEvent}>
          /
        </button>
        <button id="multiply" onClick={handleEvent}>
          X
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
