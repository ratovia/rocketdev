import React, { useEffect, useState } from 'react';
import GithubWebview from '../webview/githubWebview';
import LocalFolder from '../localFolder';
import {
  Repository,
  useRepositoryReducer,
} from '../../hooks/useRepositoryReducer';

const GithubContents = () => {
  const [repositories, repositoriesDispatch] = useRepositoryReducer();
  const [currentRepository, setCurrentRepository] = useState<
    Repository | undefined
  >(undefined);

  const handleCurrentRepositoryChange = (repo: Repository) => {
    setCurrentRepository(repo);
  };

  useEffect(() => {
    repositoriesDispatch({ type: 'fetch' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getMatchRepositoryUrl = (): string => {
    const matchByLocal = repositories.local.filter(
      (repository) => repository.folderName === currentRepository?.folderName
    );
    if (matchByLocal.length > 0) {
      return matchByLocal[0].remoteOriginUrl;
    }
    const matchByRemote = repositories.remote.filter(
      (repository) => repository.folderName === currentRepository?.folderName
    );
    if (matchByRemote.length > 0) {
      return matchByRemote[0].remoteOriginUrl;
    }
    return '';
  };
  return (
    <>
      <LocalFolder
        handleCurrentRepositoryChange={handleCurrentRepositoryChange}
      />
      {currentRepository && <GithubWebview url={getMatchRepositoryUrl()} />}
    </>
  );
};

export default GithubContents;
