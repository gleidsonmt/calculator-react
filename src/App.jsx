import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  let primaryPattern = /(\d+(\.\d+)?)[/|*]+(\d+(\.\d+)?)/g;
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

  function recurse(str) {
    console.log("str", str); // "3+5*6-2/4"
    if (str.match(primaryPattern) || str.match(secondryPattern)) {
      //str = str.replace(str.match(pattern), "");
      //let math = str.replace(str.match(pattern), "").split("");
      let pattern = str.match(primaryPattern)
        ? primaryPattern
        : secondryPattern;

      let equation = str.match(pattern).join(" ").split(" ");
      console.log("equation", equation[0]); // ["5*6"]
      let operation = equation[0].match(/[-+*/]/g);
      console.log("operation", operation); // ["*"]
      let math = equation[0]
        .match(pattern)
        .join("")
        .split(/[-+*/]/g);
      console.log("math", math); // ["5", "*", "6"]

      // // console.log("math", math); // ["5", "*", "6"]
      let result = doOperation(
        operation[0],
        parseFloat(math[0]),
        parseFloat(math[1])
      );
      console.log("result", result); // 30
      console.log("op", operation);
      math[2] = math[1];
      math[1] = operation[0];
      console.log("math", math); // ["5", "*", "6"]
      // let r = str.replace(pattern, result);
      // console.log("str", r); // "3+30-2/4"
      console.log("recurse", str.replace(math.join(""), result)); // "3+0-2/4"
      let r = str.replace(math.join(""), result);
      return recurse(r);
    } else {
      return str;
    }
  }

  function doOperation(op, a, b) {
    console.log(a, op, b);
    switch (op) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "*":
        return a * b;
      case "/":
        return a / b;
      default:
        return 0;
    }
  }

  return (
    <div className="wrapper">
      <div id="display">
        <p>0</p>
      </div>
      <div id="pad">
        <button id="clear">AC</button>
        <button>/</button>
        <button>X</button>
        <button id="seven">7</button>
        <button id="eight">8</button>
        <button id="nine">9</button>
        <button id="minus">-</button>
        <button id="four">4</button>
        <button id="five">5</button>
        <button id="six">6</button>
        <button id="plus">+</button>
        <button id="one">1</button>
        <button id="two">2</button>
        <button id="three">3</button>
        <button id="equals">=</button>
        <button id="zero">0</button>
        <button id="decimal">.</button>
      </div>
    </div>
  );
}

export default App;
