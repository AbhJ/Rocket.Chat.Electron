import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import { RootState } from '../../../store/rootReducer';
// TODO: change currentView.url string to URL type
export const useServers = () =>
  useSelector(
    createSelector(
      ({ currentView }: RootState) => currentView,
      ({ servers }: RootState) => servers,
      (currentView, servers) => {
        const currentViewUrl =
          typeof currentView === 'object' ? new URL(currentView.url) : false;
        return servers.map((server) =>
          Object.assign(server, {
            selected:
              currentViewUrl &&
              currentViewUrl.href === new URL(server.url).href,
          })
        );
      }
    )
  );
