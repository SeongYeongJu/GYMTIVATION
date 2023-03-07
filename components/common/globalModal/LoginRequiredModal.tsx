import React from 'react';

import useModal from '@/hooks/useModal';
import { ModalPropsType } from '@/recoil/modalState';
import { useEffect } from 'react';
import styled from 'styled-components';

const LoginRequiredModal = (props: ModalPropsType) => {
  const { hiddenModal } = useModal();
  const { contentText, handleConfirm } = props;

  const closeModal = async () => {
    if (!handleConfirm) {
      hiddenModal();
      return;
    }

    if (handleConfirm) {
      await handleConfirm();
      hiddenModal();
      return;
    }
  };

  // useEffect(() => {
  //   setTimeout(() => hiddenModal(), 1500);
  // }, []);

  return (
    <BackgroundContainer>
      <ModalContainer>
        <LoginRequiredImg src="/assets/icons/mapBoard/Rectangle 1797.svg" />
        <EllipseImg src="/assets/icons/mapBoard/Ellipse 162.svg" />
        <SmileImg src="/assets/icons/mapBoard/Group 815.svg" />
        <h5>{contentText}</h5>
        <AlertButton onClick={closeModal}>확인</AlertButton>
      </ModalContainer>
    </BackgroundContainer>
  );
};

export default LoginRequiredModal;

const BackgroundContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-width: 75%;
  height: 100%;
  min-height: 75%;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.7);
`;

const ModalContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  align-items: center;
  justify-content: center;
  width: 400px;
  min-width: 300px;
  height: 250px;
  min-height: 150px;
  background-color: white;
  padding: 10px;
  z-index: 1000;
`;

const AlertModalContent = styled.span``;

const AlertButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 40px;
  margin-top: 10px;
  color: white;
  font-size: 20px;
  background-color: #ff4800;
  border-radius: 8px;
  border: 1px solid black;
  filter: drop-shadow(-2px 2px 0px #000000);
`;

const SmileImg = styled.img`
  width: 80px;
  height: 80px;
  margin-bottom: 12px;
`;
const EllipseImg = styled.img`
  width: 14px;
  height: 14px;
  /* margin-bottom: 10px; */
`;
const LoginRequiredImg = styled.img`
  width: 30px;
  height: 30px;
  /* margin-bottom: 10px; */
`;