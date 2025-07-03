// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import { ReactDOM } from "react-dom/client";
// import App from "./App.jsx";

// // createRoot(document.getElementById('root')).render(
// //   <StrictMode>
// //     <App />
// //   </StrictMode>,
// // )

// ReactDOM.render(<App />, document.getElementById("root"));

import React from "react";
import { render } from "react-dom";
import "./index.css";
import App from "./App";
const root = document.getElementById("root");
render(<App />, root);
