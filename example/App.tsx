import { useEffect } from "react";
import "./App.css";
import { testError, testGet, testPost } from "../src/api";

function App() {
  useEffect(() => {
    setInterval(() => {
      testGet({ content: "testGet" }).then((res) => {
        // console.log("res", res);
        console.log(res);
      });
    }, 3000);
    // testError({ content: "testError" }).then((res) => {
    //   console.log("res", res);
    // });
    // testPost({ content: "testPost" }).then((res) => {
    //   // console.log("res", res);
    // });
  }, []);
  return <>test</>;
}

export default App;
