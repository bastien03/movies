import { useRouterHistory } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

export function initHistory(basename) {
  // Run our app under the /base URL.
  const appHistory = useRouterHistory(createBrowserHistory)({
    basename,
  });

  return appHistory;
}
