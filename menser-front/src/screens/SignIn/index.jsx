import React, { useState } from "react";

import {
  Container,
  InputsContainer,
  Title
} from "./style";

import setToast from '../../utils/toast.utils';
import Input from "../../components/Input";
import Button from "../../components/Button";

function SignIn() {
  const [formFields, setFormFields] = useState({
    email: '',
    password: '',
  });
  const [fieldErrors, setFieldErrors] = useState({
    email: false,
    password: false,
  });

  const validateFields = () => {
    if(!formFields.email || !formFields.password) {
      setToast('error', 'Preencha todos os campos.');
      setFieldErrors({
        email: !formFields.email,
        password: !formFields.password,
      });
      return true;
    }
    return false;
  }

  const handleChange = (name, value) => {
    setFormFields({ ...formFields, [name]: value });
    setFieldErrors({ ...fieldErrors, [name]: false });
  };

  const handleClick = () => {
    const hasError = validateFields();
    if(!hasError) {
      console.log('SignIn function');
      setToast('success', 'Usuário cadastrado com sucesso.');
    }
  }

  return (
    <Container>
      <InputsContainer>
        <Title>Faça seu Login</Title>
        <Input
          label="Email"
          id="email"
          name="email"
          placeholder="Insira seu email"
          required
          onChange={(event) => handleChange('email', event.target.value)}
          type="string"
          value={formFields.email}
          error={fieldErrors.email}
        />
        <Input
          label="Senha"
          id="senha"
          name="senha"
          placeholder="Insira sua senha"
          required
          onChange={(event) => handleChange('password', event.target.value)}
          type="password"
          value={formFields.password}
          error={fieldErrors.password}
        />
        <Button onClick={handleClick}>Entrar</Button>
      </InputsContainer>
    </Container>
  )
}

export default SignIn;