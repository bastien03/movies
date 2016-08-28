import { useRouterHistory } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

let appHistory;

export function initHistory(basename) {
  console.log('init history', basename);
  // Run our app under the /base URL.
  appHistory = useRouterHistory(createBrowserHistory)({
    basename,
  });
}

export function history() {
  return appHistory;
}
