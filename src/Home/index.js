// Importa o React e duas ferramentas importantes:
// - useState: serve pra guardar informações que mudam (tipo variáveis)
// - useEffect: serve pra rodar algo assim que a tela aparecer
import React, { useEffect, useState } from 'react';

// Aqui a gente importa o arquivo que sabe como acessar a API de Dragon Ball
import api from '../services/api';

// Esse é o componente que mostra cada personagem com nome e imagem
import CharacterCard from '../components/CharacterCard';

// Esse é o componente principal da página inicial
const Home = () => {
    // Aqui criamos uma "caixinha" chamada characters pra guardar os personagens que vierem da API
    const [characters, setCharacters] = useState([]);

    // Essa "caixinha" loading serve pra saber se os dados ainda estão sendo carregados
    const [loading, setLoading] = useState(true);

    // useEffect roda uma vez quando a página abre
    useEffect(() => {
        // Essa função vai buscar os personagens na API
        async function fetchCharacters() {
            try {
                // Acessa o endpoint /characters da API e guarda a resposta
                const response = await api.get('/characters');

                // Coloca os personagens recebidos dentro da nossa caixinha "characters"
                setCharacters(response.data.items);
            } catch (error) {
                // Se der erro, mostra no console
                console.error('Erro ao buscar personagens:', error);
            } finally {
                // Quando terminar (com ou sem erro), tira o "carregando"
                setLoading(false);
            }
        }

        // Chama a função pra buscar os personagens
        fetchCharacters();
    }, []); // Esse array vazio significa que vai rodar só uma vez quando a tela abrir

    // Se ainda estiver carregando, mostra o texto abaixo
    if (loading) return <p>Carregando personagens...</p>;

    // Se já tiver os dados, mostra os personagens na tela
    return (
        <div
            style={{
                display: 'flex',      // Organiza os personagens em linha
                flexWrap: 'wrap',     // Faz eles quebrarem de linha se não couberem
                gap: 20               // Espaço entre um personagem e outro
            }}
        >
            {/* Aqui a gente pega cada personagem e mostra em um cartão */}
            {characters.map((char) => (
                <CharacterCard
                    key={char.id}       // Cada personagem precisa de uma chave única
                    id={char.id}        // Envia o id do personagem pro componente Card
                    name={char.name}    // Envia o nome do personagem pro componente Card
                    image={char.image}  // Envia a imagem do personagem pro componente Card
                    gender={char.gender} // Adiciona o gênero do personagem
                />
            ))}
        </div>
    );
};

// Deixa esse componente disponível pra ser usado em outro lugar
export default Home;
