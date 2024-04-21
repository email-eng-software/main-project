import styled from 'styled-components';

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const InputLabel = styled.p`
  font-family: Poppins, Arial, Helvetica, sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: #000000;
`;

export const StyledInput = styled.input`
  width: 100%;
  height: 48px;
  border-radius: 8px;
  border: ${({ error }) => error ? '1px solid #ff0000' : '1px solid #8c8c8c'};
  font-family: Poppins, Arial, Helvetica, sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  color: #6c6c6c;
  padding-left: 16px;
  ::placeholder {
    font-family: Poppins, Arial, Helvetica, sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: #8c8c8c;
  }
`;