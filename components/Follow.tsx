import { Follows } from '@/pages/follow';
import { useState } from 'react';
import { authService } from '@/firebase';
import { updateDoc, doc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { dbService } from '@/firebase';
import styled from 'styled-components';

type FollowInformation = {
  item: Follows;
  userUid: string;
  follwoingInformation: string;
  setFollowing: (p: string) => void;
  following: string;
};

const Follow = ({
  item,
  userUid,
  follwoingInformation,
  setFollowing,
  following,
}: FollowInformation) => {
  const user = authService.currentUser;

  const FollowOnClick = async () => {
    if (user !== null) {
      await updateDoc(doc(dbService, 'profile', userUid), {
        following: arrayUnion(item.id),
      });
      await updateDoc(doc(dbService, 'profile', item.id), {
        follower: arrayUnion(user.uid),
      });

      alert('팔로우 완료');
    }
  };

  const FollowReMoveOnClick = async () => {
    if (user !== null) {
      await updateDoc(doc(dbService, 'profile', userUid), {
        following: arrayRemove(item.id),
      });
      await updateDoc(doc(dbService, 'profile', item.id), {
        follower: arrayRemove(user.uid),
      });
      const reMoveId = follwoingInformation.replace(item.id, '');
      setFollowing(reMoveId);
      alert('언팔로우 완료');
    }
  };

  return (
    <FollowWrapper>
      <OnOffBox>
        <ProfilePhoto>
          <Photo src={item.photoURL} />
        </ProfilePhoto>
        <TextBox>
          <FollowText> {item.displayName}</FollowText>
          <div>{item.email}</div>
        </TextBox>

        <StateBox>
          {follwoingInformation.includes(item.id) ? (
            <ClickFollowButton onClick={FollowReMoveOnClick}>
              팔로잉
            </ClickFollowButton>
          ) : (
            <ClickFollowButton onClick={FollowOnClick}>
              팔로우
            </ClickFollowButton>
          )}
        </StateBox>
      </OnOffBox>
    </FollowWrapper>
  );
};

export default Follow;

const FollowWrapper = styled.div``;
const OnOffBox = styled.div`
  display: flex;
  margin: auto;
  margin-bottom: 2vh;
  width: 24vw;
  height: 8vh;
  border-radius: 15px;
`;

const ProfilePhoto = styled.div`
  width: 100px;
  height: 50px;
  margin-top: 2vh;
  margin-left: 1vw;
  margin-right: 1vw;
  border-radius: 70%;
  overflow: hidden;
`;
const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const FollowText = styled.span`
  font-size: 16px;
  text-align: center;
  font-weight: bolder;
`;

const TextBox = styled.div`
  margin-top: 2vh;
  text-align: left;
  width: 20vw;
`;
const StateBox = styled.div`
  margin-top: 3vh;
  text-align: right;
  width: 20vw; ;
`;
const ClickFollowButton = styled.button`
  background-color: white;
  border-radius: 15px;
  font-size: 16px;
  :hover {
    cursor: pointer;
    background-color: lightgray;
  }
`;