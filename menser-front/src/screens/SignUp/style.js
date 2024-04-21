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
