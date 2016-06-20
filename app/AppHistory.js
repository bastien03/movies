import { useRouterHistory } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

let appHistory;

export function initHistory(basename) {
  // Run our app under the /base URL.
  appHistory = useRouterHistory(createBrowserHistory)({
    basename: basename
  })
}

export function history() {
  return appHistory
}
