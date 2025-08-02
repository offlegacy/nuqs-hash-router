import {
  type unstable_AdapterOptions,
  unstable_createAdapterProvider,
  type unstable_UseAdapterHook,
} from 'nuqs/adapters/custom';
import { useEffect, useState } from 'react';
import { getCurrentURL } from './utils';

function useHashAdapter(): ReturnType<unstable_UseAdapterHook> {
  const url = getCurrentURL();
  const [hashParams, setHashParams] = useState<URLSearchParams>(new URLSearchParams(url.search));

  function updateUrl(updated: URLSearchParams, options: Required<unstable_AdapterOptions>) {
    const url = getCurrentURL();
    const currentParams = new URLSearchParams(url.search);

    currentParams.forEach((_, key) => {
      if (!updated.has(key)) currentParams.delete(key);
    });
    updated.forEach((value, key) => {
      if (value) currentParams.set(key, value);
    });

    const updatedHashUrl = `#${url.pathname}${currentParams.toString() ? `?${currentParams.toString()}` : ''}`;
    switch (options.history) {
      case 'push':
        window.history.pushState(null, '', updatedHashUrl);
        break;
      case 'replace':
        window.history.replaceState(null, '', updatedHashUrl);
        break;
      default: // fallback
        window.history.pushState(null, '', updatedHashUrl);
        break;
    }
    setHashParams(updated);
  }

  function getSearchParamsSnapshot() {
    const url = getCurrentURL();
    return new URLSearchParams(url.search);
  }

  useEffect(() => {
    function handleHashChange() {
      const url = getCurrentURL();
      setHashParams(new URLSearchParams(url.search));
    }

    window.addEventListener('hashchange', handleHashChange);

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return {
    searchParams: hashParams,
    updateUrl,
    getSearchParamsSnapshot,
  };
}

/**
 * @see https://github.com/47ng/nuqs/issues/810#issuecomment-2863556483
 * @see https://github.com/47ng/nuqs/blob/84ee9aa49d74f3a0782ae7bbe5646a3e42cb8e52/packages/nuqs/src/adapters/lib/react-router.ts#L43
 */
export const NuqsAdapter = unstable_createAdapterProvider(useHashAdapter);
