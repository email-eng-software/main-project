import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { Container, InputsContainer, Title } from './style';

import setToast from '../../utils/toast.utils';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useLogin } from '../../hooks/query/sessions';

function SignIn() {
  const [formFields, setFormFields] = useState({
    email: '',
    password: '',
  });
  const [fieldErrors, setFieldErrors] = useState({
    email: false,
    password: false,
  });

  const navigate = useNavigate();

  const { mutate: login, isLoading } = useLogin({
    onSuccess: () => {
      setToast('success', 'Usuário logado com sucesso.');
      navigate('/');
    },
    onError: (err) => {
      console.error(err);
      setToast(
        'error',
        'Ocorreu um problema no servidor. Tente novamente mais tarde'
      );
    },
  });

  const validateFields = () => {
    if (!formFields.email || !formFields.password) {
      setToast('error', 'Preencha todos os campos.');
      setFieldErrors({
        email: !formFields.email,
        password: !formFields.password,
      });
      return true;
    }
    return false;
  };

  const handleChange = (name, value) => {
    setFormFields({ ...formFields, [name]: value });
    setFieldErrors({ ...fieldErrors, [name]: false });
  };

  const handleClick = () => {
    const hasError = validateFields();
    if (hasError) return;

    login({ email: formFields.email, password: formFields.password });
  };

  if (isLoading) return <div>Carregando...</div>;

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
        <Link to="/signup">Não possui conta? Faça seu cadastro</Link>
      </InputsContainer>
    </Container>
  );
}

export default SignIn;
