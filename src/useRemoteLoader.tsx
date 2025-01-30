import * as React from "react";

export interface IRemoteModuleProps {
  url: string;
  scope: string;
  module: string;
}

declare global {
  interface Window {
    [key: string]: any;
    __webpack_init_sharing__: (scope: string) => Promise<void>;
    __webpack_share_scopes__: { default: unknown };
  }
}

function loadComponent(scope: string, module: string) {
  return async () => {
    // @ts-ignore
    __webpack_init_sharing__("default");

    // @ts-ignore
    console.log("Webpack share scopes:", __webpack_share_scopes__);
    console.log("Remote container:", window[scope]);

    const container = window[scope];
    // @ts-ignore
    await container.init(__webpack_share_scopes__.default);
    const factory = await window[scope].get(module);
    const Module = factory();
    return Module;
  };
}

const useLoadRemote = ({ url, scope, module }: IRemoteModuleProps) => {
  const [ready, setReady] = React.useState(false);
  const [failed, setFailed] = React.useState(false);
  const [Component, setComponent] =
    React.useState<React.LazyExoticComponent<any> | null>(null);

  React.useEffect(() => {
    if (!url) return;

    let isMounted = true;
    const element = document.createElement("script");

    element.src = url;
    element.type = "text/javascript";
    element.async = true;

    setReady(false);
    setFailed(false);

    element.onload = async () => {
      try {
        if (!isMounted) return;

        if (!window[scope]) {
          throw new Error(
            `Remote entry for ${scope} is not available after loading script.`
          );
        }

        setReady(true);
        const load = loadComponent(scope, module);
        const LazyComponent = React.lazy(load);

        setComponent(() => LazyComponent);
      } catch (error) {
        console.error(`Failed to load remote component: ${error}`);
        setFailed(true);
      }
    };

    element.onerror = () => {
      console.error(`Failed to load script: ${url}`);
      setReady(false);
      setFailed(true);
    };

    document.head.appendChild(element);

    return () => {
      isMounted = false;
      document.head.removeChild(element);
    };
  }, [url, scope, module]);

  return {
    Component,
    ready,
    hasError: failed,
  };
};

export default useLoadRemote;
