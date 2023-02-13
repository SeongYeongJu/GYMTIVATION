import styled from 'styled-components';
import { useState } from 'react';
import { AiFillCheckCircle } from 'react-icons/ai';
import { sendPasswordResetEmail } from 'firebase/auth';
import { authService } from '@/firebase';

type ModalProps = {
  onClickCloseModal: () => void;
  email_validation: any;
};

const SignInModal = ({ onClickCloseModal, email_validation }: ModalProps) => {
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValiEmail] = useState(false);

  //패스워드 이메일 전송
  const onClickSendPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(authService, email);
      alert('이메일이 전송됐습니다.');
      onClickCloseModal();
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <>
      <ModalClose onClick={onClickCloseModal}></ModalClose>
      <ModalWrapper>
        <ModalContainer onSubmit={onClickSendPassword}>
          <HeaderText>비밀번호 찾기</HeaderText>
          <InputText>이메일</InputText>
          <SignInInput
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (email_validation.test(e.target.value)) {
                setIsValiEmail(true);
              } else {
                setIsValiEmail(false);
              }
            }}
            placeholder="비밀번호를 찾으실 이메일을 입력해주세요."
          />
          {isValidEmail === false ? (
            <>
              <IconValidation>
                <AiFillCheckCircle color="red" />
                <TextValidation>이메일 형식을 확인해주세요.</TextValidation>
              </IconValidation>
            </>
          ) : (
            <IconValidation>
              <AiFillCheckCircle color="green" />
            </IconValidation>
          )}
          <SignInButton disabled={isValidEmail === false}>확인</SignInButton>
        </ModalContainer>
      </ModalWrapper>
    </>
  );
};

export default SignInModal;

const ModalWrapper = styled.div`
  display: flex;
  z-index: 2000;
  width: 30%;
  height: 40vh;
  position: fixed;
  top: 50%;
  left: 50%;
  border-radius: 15px;
  background-color: white;
  transform: translate(-50%, -50%) !important;
`;
const ModalClose = styled.div`
  z-index: 1500;
  display: block;
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
const ModalContainer = styled.form`
  margin-left: 2vw;
  margin-right: 2vw;
`;
const HeaderText = styled.h2`
  margin-top: 3vh;
  margin-bottom: 5vh;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;
const InputText = styled.p`
  font-size: 15px;
  font-weight: bold;
`;

const SignInInput = styled.input`
  width: 24vw;
  height: 5vh;
  margin-right: 1vw;
  border-radius: 20px;
  border: none;
  padding-left: 16px;
  background-color: #e9ecef;
  font-size: 16px;
`;
const IconValidation = styled.div`
  margin-top: 1vh;
`;
const TextValidation = styled.span`
  color: red;
  margin-left: 1vw;
  font-size: 12px;
`;
const SignInButton = styled.button`
  margin-top: 4vh;
  width: 25vw;
  height: 8vh;
  color: black;
  background-color: #e9ecef;
  border: none;
  font-size: 16px;
  border-radius: 30px;
  :hover {
    cursor: pointer;
    background-color: #dee2e6;
  }
`;
