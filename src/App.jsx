import { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("0");
  const [formula, setFormula] = useState("");
  const [nothing, setNothing] = useState(true);

  function rec(str) {
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

  const handleResult = (e) => {
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
    /// novo digito displayText
    if (nothing) {
      setInput(displayText);
      setNothing(false);
      setFormula(displayText);
      return;
    }

    // console.log(displayText.match(/[*/+x]/));
    let operations = (formula + displayText).match(/[+/x*-]{3}/g);
    if (operations) {
      for (let operation of operations) {
        let re = operation.split("");
        re.pop();
        setFormula(formula.replace(re.join(""), displayText));
        setInput(displayText);
        return;
      }
    }
    operations = (formula + displayText).match(/[+/x*-]{2}/g);
    if (operations) {
      for (let operation of operations) {
        let re = operation.split("");
        if (re[1] != "-") {
          let last = formula[formula.length - 1];
          setFormula(formula.replace(last, re[1]));
          setInput(displayText);
          return;
        }
      }
    }

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
      setFormula(formula + displayText);
      setInput(displayText);
    }
  };

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
