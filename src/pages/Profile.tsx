import { LinearProgress } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import NoSsr from '@material-ui/core/NoSsr';
import Grid from '@material-ui/core/Grid';
import GoogleFontLoader from 'react-google-font-loader';
import { AuthContext } from '../Authentication';
import ProfileCard from '../components/ProfileCard';
import CustomCard from '../components/CustomCard';
import {
  streamUserProfile,
  UserProfile,
  streamProjects,
  Project,
} from '../firebase';

function Profile() {
  const user = useContext(AuthContext);
  const [profile, setProfile] = useState<UserProfile>(new UserProfile());
  const [projects, setProjects] = useState<Project[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { uid, photoURL, displayName } = user.currentUser;

  useEffect(() => {
    const unsubscribeProfile = streamUserProfile(uid, {
      next: (querySnapshot) => {
        setProfile(querySnapshot.data());
        setIsLoading(false);
      },
    });
    const unsubscribe = streamProjects(uid, {
      next: (querySnapshot) => {
        const updatedProjects = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        );

        setProjects(updatedProjects);
        setIsLoading(false);
      },
    });

    return function cleanup() {
      unsubscribeProfile();
      unsubscribe();
    };
  }, [uid]);

  const projectElements = projects?.map((project) => (
    <>
      <CustomCard
        thumbnail="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRQHCBAj8nRJkEwjWg5TpNuSZZG9iscsf43V1mfx0LZHNDYW3S_&usqp=CAU"
        title={project.title}
        description={<>{project.description}</>}
        project={[project]}
        joined
      />
    </>
  ));

  return (
    <div>
      {isLoading && <LinearProgress />}
      <div className="ProfileProjectSection">
        <h1 className="ProfileProjectHeader">Projects</h1>
        <NoSsr>
          <GoogleFontLoader fonts={[{ font: 'Ubuntu', weights: [400, 700] }]} />
        </NoSsr>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6} lg={4}>
            {projectElements}
          </Grid>
        </Grid>
      </div>
      <div className="ProfileSection">
        <h1 className="ProfileHeader">Profile</h1>
        <ProfileCard
          pfpUrl={photoURL}
          username={displayName}
          bio={profile.bio}
          pronoun={profile.pronoun}
          styleName="MyProfile"
        />
      </div>
    </div>
  );
}

export default Profile;
