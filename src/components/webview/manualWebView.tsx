import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  webview: {
    padding: 0,
    flexGrow: 1,
  },
}));

interface Props {
  url: string;
}

const ManualWebview = ({ url }: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.webview}>
      <webview
        src={url}
        style={{
          display: 'inline-flex',
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
};

export default ManualWebview;
