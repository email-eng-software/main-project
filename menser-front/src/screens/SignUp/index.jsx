import React, { useState } from "react";

import {
  Container,
  InputsContainer,
  Title
} from "./style";

import setToast from '../../utils/toast.utils';
import Input from "../../components/Input";
import Button from "../../components/Button";

function SignUp() {
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleClick = () => {
    setToast('error', 'Preencha todos os campos');
  }

  return (
    <Container>
      <InputsContainer>
        <Title>Faça seu cadastro</Title>
        <Input
          label="Nome"
          id="name"
          name="name"
          placeholder="Insira seu nome"
          onChange={(event) => setName(event.target.value)}
          type="string"
          value={name}
        />
        <Input
          label="Sobrenome"
          id="surname"
          name="surname"
          placeholder="Insira seu sobrenome"
          onChange={(event) => setSurname(event.target.value)}
          type="string"
          value={surname}
        />
        <Input
          label="Email"
          id="email"
          name="email"
          placeholder="Insira seu email"
          required
          onChange={(event) => setEmail(event.target.value)}
          type="string"
          value={email}
        />
        <Input
          label="Senha"
          id="senha"
          name="senha"
          placeholder="Insira sua senha"
          required
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          value={password}
        />
        <Button onClick={handleClick}>Cadastrar</Button>
      </InputsContainer>
    </Container>
  )
}

export default SignUp;