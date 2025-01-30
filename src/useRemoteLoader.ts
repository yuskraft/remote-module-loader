import * as React from "react";

export interface RemoteConfig {
  url: string;
  scope: string;
  module: string;
}

export interface UseRemoteLoaderResult {
  Component: React.LazyExoticComponent<any> | null;
  ready: boolean;
  hasError: boolean;
}

declare global {
  interface Window {
    [key: string]: any;
    __webpack_init_sharing__: (scope: string) => Promise<void>;
    __webpack_share_scopes__: { default: any };
  }
}

function loadComponent(scope: string, module: string) {
  return async () => {
    await window.__webpack_init_sharing__("default");

    const container = window[scope];
    await container.init(window.__webpack_share_scopes__.default);

    const factory = await container.get(module);
    const Module = factory();
    return Module;
  };
}

const useLoadRemote = ({
  url,
  scope,
  module,
}: RemoteConfig): UseRemoteLoaderResult => {
  const [ready, setReady] = React.useState<boolean>(false);
  const [failed, setFailed] = React.useState<boolean>(false);
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
