import { authService } from '@/firebase';
import Image from 'next/image';

import styled from 'styled-components';
import like from '../../public/assets/icons/deactive_like_button.svg';
import checkedLike from '../../public/assets/icons/active_like_button.svg';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import {
  updateGalleryLike,
  updateGalleryUnLike,
  updatePorfilePostLike,
  updatePostLike,
  updatePostUnLike,
  updateProfileGalleryLike,
  updateProfileGalleryUnLike,
  updateProfilePostUnLike,
} from '@/pages/api/api';
const Like = ({ detailPost, detailGalleryPost, id }: any) => {
  const router = useRouter();
  const boardLikeCount = detailPost?.like?.length;
  const galleryLikeCount = detailGalleryPost?.like?.length;
  const user: any = String(authService.currentUser?.uid);
  const boardLikeChecked = detailPost?.like?.includes(user);
  const galleryLikeChecked = detailGalleryPost?.like?.includes(user);
  const board = router.pathname === '/boardDetail/[...params]';
  const gallery = router.pathname === '/galleryDetail/[...params]';
  const queryClient = useQueryClient();
  const { mutate: addPostLike } = useMutation(updatePostLike);
  const { mutate: deletePostLike } = useMutation(updatePostUnLike);

  //gallery
  const { mutate: addGalleryLike } = useMutation(updateGalleryLike);
  const { mutate: deleteGalleryUnLike } = useMutation(updateGalleryUnLike);

  const { mutate: addPostProfileLike } = useMutation(updatePorfilePostLike);
  const { mutate: deletePostProfileLike } = useMutation(
    updateProfilePostUnLike,
  );
  const { mutate: addGalleryProfileLike } = useMutation(
    updateProfileGalleryLike,
  );
  const { mutate: deleteGalleryProfileLike } = useMutation(
    updateProfileGalleryUnLike,
  );

  const likeCounter = async () => {
    if (authService.currentUser) {
      if (board) {
        if (!boardLikeChecked) {
          addPostLike(
            { id, user, detailPost },
            {
              onSuccess: () => {
                queryClient.invalidateQueries('post', {
                  refetchActive: true,
                });
              },
            },
          );
          addPostProfileLike(
            { id, user },
            {
              onSuccess: () => {
                queryClient.invalidateQueries('post', {
                  refetchActive: true,
                });
              },
            },
          );
        } else {
          deletePostLike(
            {
              id,
              user,
              detailPost,
            },
            {
              onSuccess: () => {
                queryClient.invalidateQueries('post', {
                  refetchActive: true,
                });
              },
            },
          );
          deletePostProfileLike(
            { id, user },
            {
              onSuccess: () => {
                queryClient.invalidateQueries('post', {
                  refetchActive: true,
                });
              },
            },
          );
        }
      }

      if (gallery) {
        if (!galleryLikeChecked) {
          addGalleryLike(
            {
              id,
              user,
              detailGalleryPost,
            },
            {
              onSuccess: () => {
                queryClient.invalidateQueries('gallery', {
                  refetchActive: true,
                });
              },
            },
          );
          addGalleryProfileLike(
            { id, user, detailGalleryPost },
            {
              onSuccess: () => {
                queryClient.invalidateQueries('gallery', {
                  refetchActive: true,
                });
              },
            },
          );
        } else {
          deleteGalleryUnLike(
            {
              id,
              user,
              detailGalleryPost,
            },
            {
              onSuccess: () => {
                queryClient.invalidateQueries('gallery', {
                  refetchActive: true,
                });
              },
            },
          );
          deleteGalleryProfileLike(
            { id, user },
            {
              onSuccess: () => {
                queryClient.invalidateQueries('gallery', {
                  refetchActive: true,
                });
              },
            },
          );
        }
      }
    }
  };

  return (
    <LikeWrapper>
      {board ? (
        <>
          <LikeContainer onClick={likeCounter}>
            <LikeCount>{boardLikeCount}</LikeCount>
            <Text
              style={
                boardLikeChecked ? { color: '#FF3D00' } : { color: 'black' }
              }
            >
              좋아요
            </Text>
            <Image
              src={boardLikeChecked ? checkedLike : like}
              alt="좋아요"
              width={50}
              height={50}
            />
          </LikeContainer>
        </>
      ) : (
        <>
          <LikeContainer onClick={likeCounter}>
            <Text
              style={
                galleryLikeChecked ? { color: 'black' } : { color: 'white' }
              }
            >
              좋아요
            </Text>
            <LikeCount>{galleryLikeCount}</LikeCount>
            <Image
              src={galleryLikeChecked ? checkedLike : like}
              alt="좋아요"
              width={50}
              height={50}
            />
          </LikeContainer>
        </>
      )}
    </LikeWrapper>
  );
};
const Text = styled.span`
  font-weight: 600;
  font-size: ${({ theme }) => theme.font.font50};
`;

const LikeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const LikeContainer = styled.button`
  display: flex;
  width: 100%;
  margin: 0 30px;
  border-radius: ${({ theme }) => theme.borderRadius.radius50};
  border: none;
  background-color: white;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  :hover {
    background-color: ${({ theme }) => theme.color.brandColor50};
    outline: none;
    width: 100%;
  }
`;

const LikeCount = styled.span`
  display: flex;
  font-weight: 600;
`;
export default Like;