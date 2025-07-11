# nuqs-hash-router &middot; ![NPM Version](https://img.shields.io/npm/v/%40offlegacy%2Fnuqs-hash-router) ![MIT License](https://img.shields.io/github/license/offlegacy/nuqs-hash-router) ![unofficial](https://img.shields.io/badge/Unofficial-red)

> [!IMPORTANT]
> This package is not an official adapter of nuqs, and caution is advised when using it in production (especially in enterprise environments). (Although it's unofficial, I am actually using it successfully in a company project. Thanks to our team.)

This is a dedicated nuqs adapter for React Router's HashRouter. Currently, nuqs officially supports BrowserRouter, and support for HashRouter is still under discussion.

This package was created to enable the use of nuqs in applications that use React Router's HashRouter.

## Usage

### Installation

```shell
npm install @offlegacy/nuqs-hash-router
```

### React Router v7

```tsx
import { NuqsAdapter } from '@offlegacy/nuqs-hash-router';
import { Outlet } from 'react-router';

// ...

export default function App() {
  return (
    <NuqsAdapter>
      <Outlet />
    </NuqsAdapter>
  );
}
```

### Related Links

- [nuqs Installation Guide](https://nuqs.47ng.com/docs/installation)
- [nuqs Adapter Guide](https://nuqs.47ng.com/docs/adapters)
- [nuqs HashRouter Support Issue (#810)](https://github.com/47ng/nuqs/issues/810)

## Credits

This package is an unofficial adapter created specifically to support the hash router in [`nuqs`](https://nuqs.47ng.com/). Until official support is provided, this package may be used for experimental purposes and maintenance may be discontinued at any time. For more details, please refer to the official nuqs documentation or [this issue](https://github.com/47ng/nuqs/issues/810#issuecomment-2863556483).

- [nuqs](https://github.com/47ng/nuqs) - Type-safe search params state manager for React frameworks - Like useState, but stored in the URL query string.

## Contributing

We welcome contribution from everyone in the community. Read below for detailed contribution guide.

[CONTRIBUTING.md]()

### Contributors

[![contributors](https://contrib.rocks/image?repo=offlegacy/offlegacy.org)](https://github.com/offlegacy/offlegacy.org/contributors)

## License

See [LICENSE]() for more information.

MIT © [OffLegacy](https://www.offlegacy.org/)

## Powered by Offlegacy

<img align="left" height="88" src="https://static.offlegacy.org/logo.svg"/>

**Open-source Development Team in South Korea 🇰🇷**

We design technology not just to work, but to last — focusing on solving pain points we face during development, and sharing those solutions openly.
