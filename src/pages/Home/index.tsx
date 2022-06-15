import React, { useState, useEffect } from 'react';
import './styles.css';

import { Card, CardProps } from '../../components/Card';

type ProfileResponse = {
  name: string;
  avatar_url: string;
}

type User = {
  name: string;
  avatar: string;
}

export function Home() {

  const [listName, setlistName] = useState('');
  const [presentUsers, setPresentUsers] = useState<CardProps[]>([]);
  const [appUser, setAppUser] = useState<User>({} as User);

  function createUserId() {
    return Math.floor(Math.random() * 9999);
  }

  function addUser() {
    const newPresentUser = {
      name: listName,
      time: new Date().toLocaleDateString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }),
      id: createUserId(),
    };

    setPresentUsers(prevState => [...prevState, newPresentUser]);
  }

  useEffect(() => {

    async function fetchData () {
      const response = await fetch('https://api.github.com/users/oabarreto');
      const data = await response.json() as ProfileResponse;

      setAppUser({
        name: data.name,
        avatar: data.avatar_url,
      })
    }
    
    fetchData();
  }, []);

  return (
   <div className="container">
      <header>
        <h1>Lista de Presença</h1>
        <div>
          <div className="status">
          <strong>Hi, {appUser.name}!</strong>
          <small>online</small>
          </div>
          <img src={appUser.avatar} alt="Foto de Perfil" />
        </div>
      </header>

      <input type="text" placeholder="Digite o nome..." onChange={event => setlistName(event.target.value)} />
      <button type="button" onClick={addUser}>Adicionar</button>

      {
        presentUsers.map((pUser) => <Card key={pUser.id} id={pUser.id} name={pUser.name} time={pUser.time} />)
      }

   </div>
  )
}
