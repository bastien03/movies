import createBrowserHistory from 'history/lib/createBrowserHistory';
import { useRouterHistory } from 'react-router';

function initHistory(basename) {
  // Run our app under the /base URL.
  const appHistory = useRouterHistory(createBrowserHistory)({
    basename,
  });

  return appHistory;
}

export default initHistory;
