import { useReducer } from 'react';
import { ipcRenderer } from 'electron';

export interface RepositoryDataAction {
  type: 'fetch';
  payload?: Repositories;
}

export interface Repository {
  folderName: string;
  remoteOriginUrl: string;
}

export interface Repositories {
  local: Repository[];
  remote: Repository[];
}

export const useRepositoryReducer = (): [
  Repositories,
  ({ type, payload }: RepositoryDataAction) => void
] => {
  const initialData: Repositories = {
    local: [],
    remote: [],
  };

  const reducer = (state: Repositories, action: RepositoryDataAction) => {
    switch (action.type) {
      case 'fetch': {
        const localRepositoryString = ipcRenderer.sendSync(
          'sync-local-repository'
        );
        const localRepository = localRepositoryString
          .split(',')
          .map((file: string) => ({
            folderName: file,
            remoteOriginUrl: ipcRenderer.sendSync('sync-get-remote-url', file),
          }));
        const remoteRepository = ipcRenderer.sendSync('sync-remote-repository');
        return {
          ...state,
          local: localRepository,
          remote: remoteRepository,
        };
      }
      default:
        return state;
    }
  };

  const [repositories, repositoriesDispatch] = useReducer(reducer, initialData);
  return [repositories, repositoriesDispatch];
};
