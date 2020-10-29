import { useState } from "react";
import "./assets/styles.css";
import axios from "axios";
function App() {
  const [input, setInput] = useState("");
  const calcBtns = [];
  [9, 8, 7, 6, 5, 4, 3, 2, 1, 0, "", "%"].forEach((item) => {
    calcBtns.push(
      <button
        onClick={(e) => {
          setInput(input + e.target.value);
        }}
        value={item}
        key={item}
      >
        {item}
      </button>
    );
  });
  return (
    <div className="wrapper">
      {" "}
      <div className="show-input">{input}</div>
      <div className="digits flex">{calcBtns}</div>
      <div className="modifiers subgrid">
        {/* clear button */}

        <button onClick={() => setInput(input.substr(0, input.length - 1))}>
          C
        </button>

        {/* clear all */}
        <button onClick={() => setInput("")} value="">
          AC
        </button>
      </div>
      <div className="operations subgrid">
        {/* add button */}
        <button onClick={(e) => setInput(input + e.target.value)} value="+">
          +
        </button>

        {/* minus btn */}
        <button onClick={(e) => setInput(input + e.target.value)} value="-">
          {" "}
          -{" "}
        </button>

        <button onClick={(e) => setInput(input + e.target.value)} value="*">
          {" "}
          *
        </button>

        <button onClick={(e) => setInput(input + e.target.value)} value="/">
          {" "}
          /
        </button>
        {/* "=" btn */}
        <button
          onClick={(e) => {
            try {
              /*setInput(
                String(eval(input)).length > 3 &&
                  String(eval(input)).includes(".")
                  ? String(eval(input).toFixed(4))
                  : String(eval(input))
              );*/
              const baseURL = "http://localhost:8080/calcular";
              var data = input.match(
                /([/-]?[0-9])+[+\-*/%][0-9]+(([+\-*/%][0-9]+)+)?/g
              );
              data = data[0].match(/[+\-*/%]?[0-9]+/g);
              console.log("aaaaaaaaaaaaaaaa:", data);
              var operation = data[1].match(/([+\-*/%])/g);
              operation = operation.length > 1 ? operation[1] : operation;
              console.log("operacion", operation);
              const op1 = data[0].match(/[-]?[0-9]+/g);
              const op2 = data[1].match(/[0-9]+/g);
              console.log("data", op1, op2);
              switch (operation[0]) {
                case "+":
                  axios(`${baseURL}/suma?op1=${op1}&op2=${op2}`, {
                    method: "GET",
                  }).then((res) => {
                    console.log(res);
                    data.status = 200 ? setInput(res.data.suma) : input;
                  });
                  break;
                case "-":
                  axios(`${baseURL}/resta?op1=${op1}&op2=${op2}`, {
                    method: "GET",
                  }).then((res) => {
                    data.status = 200 ? setInput(res.data.resta) : input;
                  });
                  break;
                case "*":
                  axios(`${baseURL}/multiplicar?op1=${op1}&op2=${op2}`, {
                    method: "GET",
                  }).then((res) => {
                    data.status = 200 ? setInput(res.data.multiplicar) : input;
                  });
                  break;
                case "/":
                  axios(`${baseURL}/dividir?op1=${op1}&op2=${op2}`, {
                    method: "GET",
                  }).then((res) => {
                    data.status = 200 ? setInput(res.data.dividir) : input;
                  });

                  break;
                case "%":
                  axios(`${baseURL}/modulo?op1=${op1}&op2=${op2}`, {
                    method: "GET",
                  }).then((res) => {
                    data.status = 200 ? setInput(res.data.modulo) : input;
                  });
                  break;
                default:
                  setInput("No se puede realizar");
                  break;
              }
            } catch (e) {
              console.log(e);
            }
          }}
          value="="
        >
          =
        </button>
      </div>
    </div>
  );
}

export default App;
