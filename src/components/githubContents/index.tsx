import React, { useEffect, useState } from 'react';
import GithubWebview from '../webview/githubWebview';
import LocalFolder from '../localFolder';
import {
  Repository,
  useRepositoryReducer,
} from '../../hooks/useRepositoryReducer';

const GithubContents = () => {
  const [repositories, repositoriesDispatch] = useRepositoryReducer();
  const [currentFolder, setCurrentFolder] = useState('');

  const handleCurrentFolderChange = (folder: string) => {
    setCurrentFolder(folder);
  };

  useEffect(() => {
    repositoriesDispatch({ type: 'fetch', payload: {} });
  }, []);

  const getMatchFolder: (folder: string) => Repository = (folder: string) => {
    return repositories.filter(
      (repository) => repository.folderName === folder
    )[0];
  };
  return (
    <>
      <LocalFolder handleCurrentFolderChange={handleCurrentFolderChange} />
      {currentFolder && (
        <GithubWebview url={getMatchFolder(currentFolder).remoteOriginUrl} />
      )}
    </>
  );
};

export default GithubContents;
