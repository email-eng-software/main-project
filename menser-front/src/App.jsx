import React, { useEffect } from 'react';
import axios from 'axios';

const BASE_URL = `http://localhost:3333/api`;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

function App() {
  useEffect(() => {
    api
      .get('/messages/66297139b179083068e1c712/users?type=draft')
      .then((res) => console.log({ data: res.data }));
  }, []);
  return <div>Teste AAA</div>;
}

export default App;
