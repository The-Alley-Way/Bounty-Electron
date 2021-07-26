import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
import { useGutterBorderedGridStyles } from '@mui-treasury/styles/grid/gutterBordered';

const useStyles = makeStyles(({ palette }) => ({
  card: {
    borderRadius: 12,
    minWidth: 256,
    textAlign: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    margin: 'auto',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: '0.5px',
    marginTop: 8,
    marginBottom: 0,
  },
  subheader: {
    fontSize: 14,
    color: palette.grey[500],
    marginBottom: '0.875em',
  },
  statLabel: {
    fontSize: 12,
    color: palette.grey[500],
    fontWeight: 500,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    margin: 0,
  },
  statValue: {
    fontSize: 20,
    marginBottom: 4,
    marginBlockStart: 0,
    marginBlockEnd: 0,
  },
}));

interface UserDetails {
  pfpUrl: string;
  username: string;
  bio: string;
  pronoun: string;
  styleName: string;
}

const ProfileCard = React.memo(function ProfileCard({
  pfpUrl,
  username,
  bio,
  pronoun,
  styleName,
}: UserDetails) {
  const styles = useStyles();
  const shadowStyles = useFadedShadowStyles();
  const borderedGridStyles = useGutterBorderedGridStyles({
    borderColor: 'rgba(0, 0, 0, 0.08)',
    height: '50%',
  });
  return (
    <div className={styleName}>
      <Card className={cx(styles.card, shadowStyles.root)}>
        <CardContent>
          <Avatar className={styles.avatar} src={pfpUrl} />
          <h3 className={styles.heading}>{username}</h3>
          <span className={styles.subheader}>{pronoun}</span>
        </CardContent>
        <Divider light />
        <Box display="flex">
          <Box p={2} flex="auto" className={borderedGridStyles.item}>
            <p className={styles.statLabel}>Bio</p>
            <p className={styles.statValue}>{bio}</p>
          </Box>
        </Box>
      </Card>
    </div>
  );
});

export default ProfileCard;
