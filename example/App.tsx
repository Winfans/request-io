import { useEffect } from "react";
import "./App.css";
import { testError, testGet, testPost } from "../src/api";

function App() {
  useEffect(() => {
    // setInterval(() => {
    testGet({ content: "testGet" }).then((res) => {
      // console.log("res", res);
      console.log(res);
    });
    // }, 3000);
    // testError({ content: "testError" }).then((res) => {
    //   console.log("res", res);
    // });
  }, []);
  const abortHandler = () => {
    testGet({ content: "testGet" }).then((res) => {
      // console.log("res", res);
      console.log(res);
    });
  };
  return (
    <>
      test
      <button onClick={abortHandler}>abort</button>
    </>
  );
}

export default App;
