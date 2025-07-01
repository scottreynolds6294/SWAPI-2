import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function Film() {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const [filmRes, charRes, planetRes] = await Promise.all([
          fetch(`/api/films/${id}`),
          fetch(`/api/films/${id}/characters`),
          fetch(`/api/films/${id}/planets`)
        ]);

        if (!filmRes.ok) throw new Error(`Film not found: ${id}`);
        const filmData = await filmRes.json();
        setFilm(filmData);

        const charactersData = charRes.ok ? await charRes.json() : [];
        setCharacters(charactersData);

        const planetsData = planetRes.ok ? await planetRes.json() : [];
        setPlanets(planetsData);

      } catch (err) {
        console.error("Error loading film data:", err);
        setError(err.message);
      }
    }
    fetchData();
  }, [id]);

  if (error) return <p>Error: {error}</p>;
  if (!film) return <p>Loading film...</p>;

  return (
    <div>
      <h1>{film.title}</h1>
      <section id="generalInfo">
        <p><span>Episode:</span> {film.episode_id}</p>
        <p><span>Director:</span> {film.director}</p>
        <p><span>Release Date:</span> {film.release_date}</p>
        <p><span>Opening Crawl:</span> {film.opening_crawl}</p>
      </section>

      <section id="characters">
        <h2>Characters</h2>
        <ul>
          {characters.map(char => (
            <li key={char.id}>
              <Link to={`/character/${char.id}`}>{char.name}</Link>
            </li>
          ))}
        </ul>
      </section>

      <section id="planets">
        <h2>Planets</h2>
        <ul>
          {planets.map(planet => (
            <li key={planet.id}>
              <Link to={`/planet/${planet.id}`}>{planet.name}</Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Film;
