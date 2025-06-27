import { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("0");
  const [result, setResult] = useState();
  const [formula, setFormula] = useState("0");
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

  function recurse(str) {
    if (str.match(primaryPattern) || str.match(secondryPattern)) {
      //str = str.replace(str.match(pattern), "");
      //let math = str.replace(str.match(pattern), "").split("");
      let pattern = str.match(primaryPattern)
        ? primaryPattern
        : secondryPattern;

      let equation = str.match(pattern).join(" ").split(" ");
      let operation = equation[0].match(/[-+*x/]/g);
      let math = equation[0]
        .match(pattern)
        .join("")
        .split(/[-+*/]/g);

      // // console.log("math", math); // ["5", "*", "6"]
      let result = doOperation(
        operation[0],
        parseFloat(math[0]),
        parseFloat(math[1])
      );
      math[2] = math[1];
      math[1] = operation[0];
      let r = str.replace(math.join(""), result);
      return recurse(r);
    } else {
      return str;
    }
  }

  const handleEvent = (e) => {
    let displayText = e.target.innerText.toLowerCase();

    if (isOperation(displayText)) {
      setInput(displayText);
    } else {
      if (isOperation(input)) {
        setInput(displayText);
      } else {
        setInput(input + displayText);
      }
    }
    setFormula(formula + displayText);
    // console.log("formula", formula);
    // // if (displayText.match(/[0-9]/)) {
    // console.log("display", displayText);

    // if (formula.match(/./g)) {
    //   console.log("ah", formula);
    //   setFormula(input + displayText);
    //   setHide(false);
    // } else if (formula === "0") {
    //   setFormula(displayText);
    //   setHide(false);
    // } else {
    //   setFormula(formula + displayText);
    // }

    // console.log("input", displayText.match(/[1-9]/));
    // if (input.match(/[1-9]/)) {
    //   setInput(input + displayText);
    // } else if (displayText.includes(".")) {
    //   setInput(input + displayText);
    // } else {
    //   setInput(displayText);
    // }
  };

  function isOperation(str) {
    return str.match(/[-+*x/]/g) ? true : false;
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
