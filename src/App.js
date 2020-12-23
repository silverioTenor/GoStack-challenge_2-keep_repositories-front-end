import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => setRepositories(response.data));
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      "title": `Novo repositório - ${Date.now()}`,
      "url": `https://github.com/silverioTenor/${Date.now()}`,
      "techs": ["Node.js", "React", "React Native"]
    });

    const respository = response.data;

    setRepositories([...repositories, respository]);
  }

  async function handleRemoveRepository(id) {
    const foundIndex = repositories.findIndex(repository => repository.id === id);
    
    if (foundIndex < 0) return

    await api.delete(`/repositories/${id}`);

    repositories.splice(foundIndex, 1);

    setRepositories([...repositories]);
  }

  return (
    <div className="container">
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            <div className="content">
              <h4>{repository.title}</h4>

              <p>{repository.url}</p>

              <div id="techs">
                {repository.techs.map(tech => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </div>

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button className="add" onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
