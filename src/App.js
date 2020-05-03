import React, {useState, useEffect} from "react";

import "./styles.css";
import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);
  
  useEffect(() => {
    api.get('repositories').then(response => {
      console.log('response:', response);
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      "title": `Desafio NodeJS back-end ${new Date()}`,
      "url": "www.github.com",
      "techs": ["Javascript", "NodeJS", "Express", "git"]
    });

    const repository = response.data;
    console.log('repository:', repository);
    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);
    console.log('response:', response);
    if (response.status === 204) {
      const repositoryIndex = repositories.findIndex(repository => repository.id === id);
      const newRepositories = repositories;
      newRepositories.splice(repositoryIndex, 1);
      setRepositories([...newRepositories]);
    } else {
      alert('Não foi possível deletar o repositório!')
    }
  }

  return (
    <div>
      <h1>Lista de repositórios</h1>
      <ul  data-testid="repository-list">
          {repositories.map(repository => {
            const {id, title} = repository;
            return (
              <li key={id}>
                <h3>{title}</h3>
                <button onClick={() => handleRemoveRepository(id)}>
                   Remover
                </button>
              </li>
           );
          })}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
