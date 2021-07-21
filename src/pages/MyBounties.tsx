import React, { useEffect, useState, useContext } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { streamUserBountyListItems, Bounty } from '../firebase';
import { AuthContext } from '../Authentication';
import ErrorMessage from '../components/ErrorMessage';
import BountyCard from '../components/BountyCard';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
    bountiesList: {
      maxWidth: 'fit-content',
      margin: '0 auto',
    },
  })
);

function MyBounties() {
  const classes = useStyles();
  const [bounties, setBounties] = useState<Bounty[]>();
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const user = useContext(AuthContext);
  const { uid, displayName } = user.currentUser;

  useEffect(() => {
    const unsubscribe = streamUserBountyListItems(uid, {
      next: (querySnapshot) => {
        const updatedBountyItems = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        );
        setBounties(updatedBountyItems);
        setIsLoading(false);
      },
      error: () => setError('bounty-list-item-get-fail'),
    });
    return unsubscribe;
  }, [uid]);

  const bountyItemElements = bounties?.map((bounty) => (
    <BountyCard
      key={bounty.createdAt}
      title={bounty.title}
      createdAt={bounty.createdAt}
      creator={displayName}
      content={bounty.content}
    />
  ));

  return (
    <div className={classes.root}>
      {isLoading && <LinearProgress />}
      <ErrorMessage errorCode={error} />
      <h1>My Bounties</h1>
      <div className={classes.bountiesList}>{bountyItemElements}</div>
    </div>
  );
}

export default MyBounties;
