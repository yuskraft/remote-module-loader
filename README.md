# Remote Module Loader

A badass React hook for loading remote modules dynamically.
This package allows you to dynamically load remote components in your React application using Webpack's Module Federation.

[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-blue.svg)](https://github.com/yuskraft/remote-module-loader)

## Table of Contents

- [Remote Module Loader](#remote-module-loader)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
    - [`useLoadRemote(config: RemoteConfig): UseRemoteLoaderResult`](#useloadremoteconfig-remoteconfig-useremoteloaderresult)
  - [Contributing](#contributing)

## Installation

To install the package, use npm or yarn:
```bash
npm install @yuskraft/remote-module-loader
```

or

```bash
yarn add @yuskraft/remote-module-loader
```

## Usage

Import the `useLoadRemote` hook and use it in your React component to load remote modules.

```typescript
import { useLoadRemote } from '@yuskraft/remote-module-loader';

const MyComponent = () => {
  const { Component, ready, hasError } = useLoadRemote({
    url: 'https://example.com/remoteEntry.js',
    scope: 'myRemote',
    module: './MyRemoteComponent',
  });

  if (hasError) {
    return <div>Error loading component</div>;
  }

  if (!ready) {
    return <div>Loading...</div>;
  }

  return Component ? <Component /> : null;
};
```

### `useLoadRemote(config: RemoteConfig): UseRemoteLoaderResult`

- **Parameters:**
  - `config`: An object with the following properties:
    - `url`: The URL of the remote entry file.
    - `scope`: The scope name of the remote module.
    - `module`: The module name to load.

- **Returns:**
  - An object with the following properties:
    - `Component`: The loaded remote component, or `null` if not yet loaded.
    - `ready`: A boolean indicating if the component is ready to be used.
    - `hasError`: A boolean indicating if there was an error loading the component.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request!
