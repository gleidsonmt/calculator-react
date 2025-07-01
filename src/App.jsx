import { useState, useTransition } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("0");
  const [result, setResult] = useState();
  const [formula, setFormula] = useState("");
  const [hide, setHide] = useState(false);

  let primaryPattern = /(\d+(\.\d+)?)[/|*|x]+(\d+(\.\d+)?)/g;
  let secondryPattern = /(\d+(\.\d+)?)[+|-]+(\d+(\.\d+)?)/g;
  // let initial = "33*0.5";
  let initial = "33.5+0.5-2/4";
  // 2/4 = 0.5
  // 33.5+0.5-0.5
  // 34-0.5

  // console.log(primaryPattern.test(str)); // true
  // console.log(initial.match(primaryPattern)); // ["5*6"]
  // console.log("sec", initial.match(primaryPattern)[0]); // "3+0-2/4"
  // console.log("reg", createRegex("+-/*").test(initial)); // true

  ///// Agora testar com pattern duplo

  // console.log("30+3".match(secondryPattern)); // ["30+3"]
  // let math = "300+3".match(secondryPattern).join("").split(/[+|-]/g);
  // console.log("math", math); // ["30", "+", "3"]

  // let answer = recurse(initial); // "3+0-2/4"

  let numberOne = "2";
  let numberTwo = "4.5";
  let numberThree = "3.5000";
  let numberFour = "-2";
  let numberFive = "-2.45";
  let numberSix = "0.2";
  let numberSeven = "0";
  let numberEight = "0.0";

  let testPattern = /((-)?\d+(\.\d+)?)/g;
  // console.log("test", numberOne.match(testPattern)); // ["2"]
  // console.log("test", numberTwo.match(testPattern)); // ["2"]
  // console.log("test", numberThree.match(testPattern)); // ["2"]
  // console.log("test", numberFour.match(testPattern)); // ["2"]
  // console.log("test", numberFive.match(testPattern)); // ["2"]
  // console.log("test", numberSix.match(testPattern)); // ["2"]
  // console.log("test", numberSeven.match(testPattern)); // ["2"]
  // console.log("test", numberEight.match(testPattern)); // ["2"]

  let negativePattern = /^(\d|-)+(\.\d+)$.?/g;
  // console.log("test", "-2.45".match(negativePattern)); // ["-2.45"]
  // console.log("test", "2.45".match(negativePattern)); // ["2.45"]
  // console.log("test", "2".match(negativePattern)); // ["2.45"]
  // console.log("test", "-".match(negativePattern)); // ["2.45"]

  // console.log("lol", "2.5".match(negativePattern)); // null

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

  console.log("res", rec("-5.2/-3.5+-2-5"));
  // rec("5/2+4");

  function rec(str) {
    console.log("kkk", str);
    let primary = /(^-?\d+|^-?\d+\.\d+?)([/*])(-?\d+\.\d+|-?\d+)/;
    let secondary = /(^-?\d+|^-?\d+\.\d+?)([-+])(-?\d+\.\d+|-?\d+)/;
    let one = str.match(primary);
    let two = str.match(secondary);
    if (one) {
      console.log("how", one);

      let a = one[1];
      let s = one[2];
      let b = one[3];
      let r = doOperation(s, parseFloat(a), parseFloat(b)).toFixed(4);
      str = str.replace(one[0], r);
      console.log(typeof r);
      console.log("str", str);
      return rec(str);
    } else {
      if (two) {
        console.log("ra", two);
        let a = two[1];
        let s = two[2];
        let b = two[3];
        let r = doOperation(s, parseFloat(a), parseFloat(b)).toFixed(4);
        str = str.replace(two[0], r);
        console.log("str2", str);
        return rec(str);
      } else {
        console.log("s", str);
        console.log("lulu", parseFloat(str));
        return parseFloat(str);
      }
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

  function recurse(str) {
    let item = findEquation(str);
    console.log(item);
    if (item) {
      let equation = getEquation(item);
      let result = doEquation(equation);

      recurse(str.replace(item, result));
    } else {
      return parseFloat(str);
    }
  }

  const handleEvent = (e) => {
    let displayText = e.target.innerText.toLowerCase();
    console.log("input", input);
    // console.log("displayText", displayText);
    let newInput = input + displayText;
    console.log("newInput", newInput);
    // console.log("formula", input + displayText);

    console.log("input is", isNumber(newInput));
    if (displayText != "-") {
      console.log("olele");
    }

    if (input == "0" && displayText != ".") {
      setInput(displayText);
    } else if (isNumber(newInput)) {
      setInput(newInput);
    } else {
      setInput(displayText);
    }

    let lastFormNumber =
      formula[formula.length - 1] == undefined
        ? "0"
        : formula[formula.length - 1];
    console.log("isOperand", isOperation(displayText));
    console.log("lastFormNumber", lastFormNumber);
    console.log("lastFormNumber", !displayText.match(/[0-9-]/g));
    if (lastFormNumber != "-") {
    }
    if (!displayText.match(/[0-9-]/g) && !lastFormNumber.match(/[0-9+]/g)) {
      setFormula(formula.replace(formula[formula.length - 1], displayText));
      console.log(
        "form",
        formula.replace(formula[formula.length - 1], displayText)
      );
    } else {
      setFormula(formula + displayText);
    }

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

  return (
    <div className="wrapper">
      <div className={`formula ${hide && "hide"}`}>{formula}</div>
      <div id="display">
        <p>{input}</p>
      </div>
      <div id="pad">
        <button id="clear">AC</button>
        <button onClick={handleEvent}>/</button>
        <button onClick={handleEvent}>X</button>
        <button onClick={handleEvent} id="seven">
          7
        </button>
        <button onClick={handleEvent} id="eight">
          8
        </button>
        <button onClick={handleEvent} id="nine">
          9
        </button>
        <button onClick={handleEvent} id="minus">
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
        <button onClick={handleEvent} id="plus">
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
        <button onClick={handleEvent} id="equals">
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
