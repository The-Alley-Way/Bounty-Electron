/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { Column, Row, Item } from '@mui-treasury/components/flex';
import { Info, InfoSubtitle, InfoTitle } from '@mui-treasury/components/info';
import { useApexInfoStyles } from '@mui-treasury/styles/info/apex';
import { useGraphicBtnStyles } from '@mui-treasury/styles/button/graphic';
import { getUser, Project, UserProfile } from '../firebase';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    transition: '0.3s',
    position: 'relative',
    '&:before': {
      transition: '0.2s',
      position: 'absolute',
      width: '100%',
      height: '100%',
      content: '""',
      display: 'block',
      backgroundColor: '#d9daf1',
      borderRadius: '1rem',
      zIndex: 0,
      bottom: 0,
    },
    '&:hover': {
      '&:before': {
        bottom: -6,
      },
      '& $card': {
        boxShadow: '-12px 12px 64px 0 #bcc3d6',
      },
    },
  },
  card: {
    zIndex: 1,
    position: 'relative',
    borderRadius: '1rem',
    boxShadow: '0 6px 20px 0 #dbdbe8',
    backgroundColor: '#fff',
    transition: '0.4s',
    height: '100%',
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: '0.75rem',
  },
  avatar: {
    fontFamily: 'Ubuntu',
    fontSize: '0.875rem',
    backgroundColor: '#6d7efc',
  },
  join: {
    background: 'linear-gradient(to top, #638ef0, #82e7fe)',
    '& > *': {
      textTransform: 'none !important',
    },
  },
}));

const CustomCard = ({
  thumbnail,
  title,
  description,
  project,
  joined = false,
}) => {
  const styles = useStyles();
  const btnStyles = useGraphicBtnStyles();
  const [memberPfpUrl, setMemberPfpUrl] = useState<string[]>([]);
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    const unsubscribeUrls = async (inputMembers: Project[]) => {
      const updatedUrls = await Promise.all(
        inputMembers.map(async (member) => {
          const gotUser: UserProfile = await getUser(member);
          return gotUser.pfpUrl;
        })
      );

      setMemberPfpUrl(updatedUrls);
    };

    const unsubscribeUsername = async (inputMember: string) => {
      let updatedUsername = '';
      const gotUser: UserProfile = await getUser(inputMember);
      updatedUsername = gotUser.username;

      setUsername(updatedUsername);
    };

    return function cleanup() {
      unsubscribeUrls(project[0].members);
      unsubscribeUsername(project[0].creator);
    };
  }, [project]);

  return (
    <div className={styles.root}>
      <Column className={styles.card}>
        <Row p={2} gap={2}>
          <Avatar className={styles.logo} variant="rounded" src={thumbnail} />
          <Info position="middle" useStyles={useApexInfoStyles}>
            <InfoTitle>{title}</InfoTitle>
            <InfoSubtitle>{`Created by ${username}`}</InfoSubtitle>
          </Info>
        </Row>
        <Box
          pb={1}
          px={2}
          color="grey.600"
          fontSize="0.875rem"
          fontFamily="Ubuntu"
        >
          {description}
        </Box>
        <Row p={2} gap={2} position="bottom">
          <Item>
            <AvatarGroup max={4} classes={{ avatar: styles.avatar }}>
              {memberPfpUrl.map((member: string, index) => (
                <Avatar key={index} src={member} />
              ))}
            </AvatarGroup>
          </Item>
          <Item position="middle-right">
            <Button
              className={styles.join}
              classes={btnStyles}
              variant="contained"
              color="primary"
              disableRipple
            >
              {joined ? 'Leave project' : 'Join project'}
            </Button>
          </Item>
        </Row>
      </Column>
    </div>
  );
};

export default CustomCard;
