import React from 'react';
import { Route } from 'react-router';

import IndexPage from './pages/index/IndexContainer';
import StatisticsPage from './pages/statistics/StatisticsContainer';
import DetailPage from './pages/detail/DetailContainer';
import InsertMoviePage from './pages/insert/InsertMovieContainer';
import EditMoviePage from './pages/edit/EditMovieContainer';
import AdminPage from './pages/admin/AdminContainer';
import uris from '../../uris';

export default function routes(requireAuth) {
  return (
    <Route>
      <Route path={uris.moviesStartPage()} component={IndexPage} />
      <Route path={uris.moviesPage()} component={IndexPage} />
      <Route path={uris.statisticsPage()} component={StatisticsPage} />
      <Route path={uris.detailMoviePage(':id')} component={DetailPage} />
      <Route onEnter={requireAuth}>
        <Route path={uris.newMoviePage()} component={InsertMoviePage} />
        <Route path={uris.editMoviePage(':id')} component={EditMoviePage} />
        <Route path={uris.adminPage()} component={AdminPage} />
      </Route>
    </Route>
  );
}
