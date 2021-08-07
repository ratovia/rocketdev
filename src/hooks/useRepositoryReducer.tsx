import { useReducer } from 'react';
import { ipcRenderer } from 'electron';

export interface RepositoryDataAction {
  type: 'fetch';
  payload: {
    folderName?: string;
    remoteOriginUrl?: string;
  };
}

export interface Repository {
  folderName: string;
  remoteOriginUrl: string;
}

export const useRepositoryReducer = (): [
  Repository[],
  ({ type, payload }: RepositoryDataAction) => void
] => {
  const initialData: Repository[] = [];

  const reducer = (state: Repository[], action: RepositoryDataAction) => {
    switch (action.type) {
      case 'fetch': {
        const fileDirectory = ipcRenderer.sendSync('sync-file-directory', '');

        return fileDirectory.split(',').map((file: string) => ({
          folderName: file,
          remoteOriginUrl: ipcRenderer.sendSync('sync-remote-repository', file),
        }));
      }
      default:
        return state;
    }
  };

  const [repositories, repositoriesDispatch] = useReducer(reducer, initialData);
  return [repositories, repositoriesDispatch];
};