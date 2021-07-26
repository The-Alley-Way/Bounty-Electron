/* eslint-disable max-classes-per-file */
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBR3JvV8w57iaBD05Y3eZ9-JXh9Es5XYIE',
  authDomain: 'bounty-eb852.firebaseapp.com',
  projectId: 'bounty-eb852',
  storageBucket: 'bounty-eb852.appspot.com',
  messagingSenderId: '386811981272',
  appId: '1:386811981272:web:c7019a90e12e9826c4d6ad',
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default app;

export class Bounty {
  title: string;

  creator: string;

  createdAt: string;

  content: string;

  constructor(
    title: string,
    creator: string,
    createdAt: string,
    content: string
  ) {
    this.title = title;
    this.creator = creator;
    this.createdAt = createdAt;
    this.content = content;
  }

  toString() {
    return this.title;
  }
}

const bountyConverter = {
  toFirestore(bounty) {
    return {
      title: bounty.title,
      creator: bounty.creator,
      createdAt: bounty.createdAt,
      content: bounty.content,
    };
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return new Bounty(
      data.title,
      data.creator,
      data.createdAt.toDate().toUTCString(),
      data.content
    );
  },
};

export const streamUserBountyListItems = (userId, observer) => {
  return db
    .collection('bounties')
    .where('creator', '==', userId)
    .withConverter(bountyConverter)
    .onSnapshot(observer);
};

export class UserProfile {
  pronoun: string;

  username: string;

  bio: string;

  isPublic: boolean;

  email: string;

  constructor(
    pronoun = 'Error',
    username = 'Error',
    bio = 'Error',
    isPublic = true,
    email = 'Error'
  ) {
    this.pronoun = pronoun;
    this.username = username;
    this.bio = bio;
    this.isPublic = isPublic;
    this.email = email;
  }
}

const userConverter = {
  toFirestore(user) {
    return {
      pronoun: user.pronoun,
      username: user.username,
      bio: user.bio,
      isPublic: user.isPublic,
      email: user.email,
    };
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return new UserProfile(
      data.pronoun,
      data.username,
      data.bio,
      data.isPublic,
      data.email
    );
  },
};

export const streamUserProfile = (userId, observer) => {
  return db
    .collection('users')
    .doc(userId)
    .withConverter(userConverter)
    .onSnapshot(observer);
};
