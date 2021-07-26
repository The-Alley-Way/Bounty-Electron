import { LinearProgress } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Authentication';
import ProfileCard from '../components/ProfileCard';
import { streamUserProfile, UserProfile } from '../firebase';

function Profile() {
  const user = useContext(AuthContext);
  const [profile, setProfile] = useState<UserProfile>(new UserProfile());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { uid, photoURL, displayName } = user.currentUser;

  useEffect(() => {
    const unsubscribe = streamUserProfile(uid, {
      next: (querySnapshot) => {
        console.log(querySnapshot.data());
        setProfile(querySnapshot.data());
        setIsLoading(false);
      },
    });
    return unsubscribe;
  }, [uid]);

  return (
    <div>
      {isLoading && <LinearProgress />}
      <ProfileCard
        pfpUrl={photoURL}
        username={displayName}
        bio={profile.bio}
        pronoun={profile.pronoun}
        styleName="MyProfile"
      />
    </div>
  );
}

export default Profile;
