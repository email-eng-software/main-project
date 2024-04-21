import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: #e0f1ff;
`;

export const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: white;
  width: 90%;
  max-width: 500px;
  height: max-content;
  border-radius: 10px;
  box-shadow: 2px 2px 3px #a1a1a1;
`;

export const Title = styled.p`
  font-family: Poppins, Arial, Helvetica, sans-serif;
  font-weight: 600;
  font-size: 32px;
  margin: 20px auto;
  color: #000000;
`;

export const InputLabel = styled.p`
  font-family: Poppins, Arial, Helvetica, sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: #000000;
`;

export const Input = styled.input`
  width: 100%;
  height: 48px;
  border-radius: 8px;
  border: 1px solid #8c8c8c;
  font-family: Poppins, Arial, Helvetica, sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  color: #6c6c6c;
  padding-left: 16px;
  margin-bottom: 20px;
  ::placeholder {
    font-family: Poppins, Arial, Helvetica, sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: #8c8c8c;
  }
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #037bfc;
  width: 150px;
  height: 40px;
  border: 0px;
  border-radius: 8px;
  color: #ffffff;
  font-family: Poppins, Arial, Helvetica, sans-serif;
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  margin-left: auto;
  padding: 0;
  text-align: center;
  cursor: pointer
`;