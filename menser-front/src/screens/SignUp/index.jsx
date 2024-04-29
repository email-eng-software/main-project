import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Container, InputsContainer, Title } from './style';

import setToast from '../../utils/toast.utils';
import Input from '../../components/Input';
import Button from '../../components/Button';

function SignUp() {
  const [userInfos, setUserInfos] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [fieldErrors, setFieldErrors] = useState({
    name: false,
    surname: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const validateFields = () => {
    if (
      !userInfos.name ||
      !userInfos.surname ||
      !userInfos.email ||
      !userInfos.password ||
      !userInfos.confirmPassword
    ) {
      setToast('error', 'Preencha todos os campos.');
      setFieldErrors({
        name: !userInfos.name,
        surname: !userInfos.surname,
        email: !userInfos.email,
        password: !userInfos.password,
        confirmPassword: !userInfos.confirmPassword,
      });
      return true;
    }
    if (
      !String(userInfos.email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      setToast('error', 'Insira um email válido.');
      setFieldErrors({ ...fieldErrors, email: true });
      return true;
    }
    if (userInfos.password.length <= 8) {
      setToast('error', 'Senha precisa ter ao menos 8 dígitos');
      setFieldErrors({ ...fieldErrors, password: true });
      return true;
    }
    if (userInfos.password !== userInfos.confirmPassword) {
      setToast('error', 'As senhas precisam ser iguais');
      setFieldErrors({ ...fieldErrors, password: true, confirmPassword: true });
      return true;
    }
    return false;
  };

  const handleChange = (name, value) => {
    setUserInfos({ ...userInfos, [name]: value });
    setFieldErrors({ ...fieldErrors, [name]: false });
  };

  const handleClick = () => {
    const hasError = validateFields();
    console.log('SignUp function');
    if (!hasError) {
      setToast('success', 'Usuário cadastrado com sucesso.');
    }
  };

  return (
    <Container>
      <InputsContainer>
        <Title>Faça seu Cadastro</Title>
        <Input
          label="Nome"
          id="name"
          name="name"
          placeholder="Insira seu nome"
          onChange={(event) => handleChange('name', event.target.value)}
          type="string"
          value={userInfos.name}
          error={fieldErrors.name}
        />
        <Input
          label="Sobrenome"
          id="surname"
          name="surname"
          placeholder="Insira seu sobrenome"
          onChange={(event) => handleChange('surname', event.target.value)}
          type="string"
          value={userInfos.surname}
          error={fieldErrors.surname}
        />
        <Input
          label="Email"
          id="email"
          name="email"
          placeholder="Insira seu email"
          required
          onChange={(event) => handleChange('email', event.target.value)}
          type="string"
          value={userInfos.email}
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
          value={userInfos.password}
          error={fieldErrors.password}
        />
        <Input
          label="Confirmar Senha"
          id="confirmarSenha"
          name="confirmarSenha"
          placeholder="Confirme sua senha"
          required
          onChange={(event) =>
            handleChange('confirmPassword', event.target.value)
          }
          type="password"
          value={userInfos.confirmPassword}
          error={fieldErrors.confirmPassword}
        />
        <Button onClick={handleClick}>Cadastrar</Button>
        <Link to="/signin">Já possui conta? Faça login</Link>
      </InputsContainer>
    </Container>
  );
}

export default SignUp;
