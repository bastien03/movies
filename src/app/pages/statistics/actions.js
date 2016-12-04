import {
  statistics as statisticsApi,
} from '../../api/movies';

export const loadStatistics = () => statisticsApi();
