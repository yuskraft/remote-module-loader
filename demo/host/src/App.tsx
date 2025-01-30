import React from "react";
import { DynamicRemote } from "./DynamicRemote";

const App = () => {
  let [loadRemote, setLoadRemote] = React.useState(false);

  return (
    <div style={{ padding: 20 }}>
      <h1>Host Application</h1>
      {!loadRemote && (
        <div>
          <button
            style={{
              border: "none",
              borderRadius: "4px",
              backgroundColor: "mediumspringgreen",
              boxShadow:
                "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
              padding: "10px 20px",
              fontWeight: "600",
            }}
            onClick={() => setLoadRemote(true)}
          >
            Load Remote App
          </button>
        </div>
      )}

      {loadRemote && <DynamicRemote />}
    </div>
  );
};

export default App;
