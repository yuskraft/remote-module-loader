import React, { Suspense } from "react";
import { useLoadRemote } from "@yuskraft/remote-module-loader";

export const DynamicRemote = () => {
  const { Component, ready, hasError } = useLoadRemote({
    url: "http://localhost:3001/remoteEntry.js",
    scope: "remote",
    module: "./App",
  });

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        Status: {hasError ? "❌ Error" : ready ? "✅ Ready" : "⏳ Loading..."}
      </div>

      {hasError && (
        <div style={{ color: "red" }}>
          Failed to load remote component. Make sure the remote app is running!
        </div>
      )}

      {Component && (
        <Suspense fallback={<div>Loading remote...</div>}>
          <Component />
        </Suspense>
      )}
    </div>
  );
};
