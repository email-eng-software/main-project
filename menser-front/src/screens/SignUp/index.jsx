import React, { useState } from "react";

import {
  Container,
  InputsContainer,
  Title,
  Input,
  InputLabel,
  Button
} from "./style";

function SignUp() {
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <Container>
      <InputsContainer>
        <Title>Faça seu cadastro</Title>
        <InputLabel>Nome</InputLabel>
        <Input
          id="name"
          name="name"
          placeholder="Insira seu nome"
          required
          onChange={(event) => setName(event.target.value)}
          type="string"
          value={name}
        />
        <InputLabel>Sobrenome</InputLabel>
        <Input
          id="surname"
          name="surname"
          placeholder="Insira seu sobrenome"
          required
          onChange={(event) => setSurname(event.target.value)}
          type="string"
          value={surname}
        />
        <InputLabel>Email</InputLabel>
        <Input
          id="email"
          name="email"
          placeholder="Insira seu email"
          required
          onChange={(event) => setEmail(event.target.value)}
          type="string"
          value={email}
        />
        <InputLabel>Senha</InputLabel>
        <Input
          id="senha"
          name="senha"
          placeholder="Insira sua senha"
          required
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          value={password}
        />
        <Button onClick={() => console.log(name, surname, email, password)}>Cadastrar</Button>
      </InputsContainer>
    </Container>
  )
}

export default SignUp;