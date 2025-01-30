import React from "react";

const App = () => {
  return (
    <div
      style={{
        padding: 20,
        border: "2px solid #d3d3d3",
        borderRadius: 8,
        background: "cornsilk",
      }}
    >
      <h2>Remote Component</h2>
      <p>This component was loaded from parallel universe</p>
      <button onClick={() => alert("Good job")}>Click here !</button>
    </div>
  );
};

export default App;
