import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';

const mongoClient = new MongoClient('mongodb://localhost:27017');
await mongoClient.connect();
const db = mongoClient.db('swapi');

const app = express();
const PORT = 3000;

app.use(express.json());

// Route: GET http://localhost:3000/api/planets/:id
app.get('/api/planets/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const planet = await db.collection('planets').findOne({ id });
    if (!planet) return res.status(404).json({ error: "Planet not found" });
    res.json(planet);
});


// Route: GET http://localhost:3000/api/films/:id/characters
app.get('/api/films/:id/characters', async (req, res) => {
    const filmId = parseInt(req.params.id);

    // Get character IDs
    const links = await db.collection('films_characters').find({ film_id: filmId }).toArray();
    const characterIds = links.map(link => link.character_id);

    if (characterIds.length === 0) {
        return res.status(404).json({ error: "No characters found for this film" });
    }

    // Get character details
    const characters = await db.collection('characters')
        .find({ id: { $in: characterIds } })
        .project({ _id: 0, id: 1, name: 1 })
        .toArray();

    res.json(characters);
});



// Route: GET http://localhost:3000/api/films/:id/planets
app.get('/api/films/:id/planets', async (req, res) => {
    const filmId = parseInt(req.params.id);

    // Get planet IDs
    const links = await db.collection('films_planets').find({ film_id: filmId }).toArray();
    const planetIds = links.map(link => link.planet_id);

    if (planetIds.length === 0) {
        return res.status(404).json({ error: "No planets found for this film" });
    }

    // Get planet details
    const planets = await db.collection('planets')
        .find({ id: { $in: planetIds } })
        .project({ _id: 0, id: 1, name: 1 })
        .toArray();

    res.json(planets);
});


// Route: GET http://localhost:3000/api/characters/:id/films
app.get('/api/characters/:id/films', async (req, res) => {
    const characterId = parseInt(req.params.id);

    // Get film IDs
    const links = await db.collection('films_characters').find({ character_id: characterId }).toArray();
    const filmIds = links.map(link => link.film_id);

    if (filmIds.length === 0) {
        return res.status(404).json({ error: "No films found for this character" });
    }

    // Get film details
    const films = await db.collection('films')
        .find({ id: { $in: filmIds } })
        .project({ _id: 0, id: 1, title: 1 })
        .toArray();

    res.json(films);
});


// Route: GET http://localhost:3000/api/planets/:id/films
app.get('/api/planets/:id/films', async (req, res) => {
    const planetId = parseInt(req.params.id);

    // Get film IDs
    const links = await db.collection('films_planets').find({ planet_id: planetId }).toArray();
    const filmIds = links.map(link => link.film_id);

    if (filmIds.length === 0) {
        return res.status(404).json({ error: "No films found for this planet" });
    }

    // Get film details
    const films = await db.collection('films')
        .find({ id: { $in: filmIds } })
        .project({ _id: 0, id: 1, title: 1 })
        .toArray();

    res.json(films);
});


// Route: GET http://localhost:3000/api/planets/:id/characters
app.get('/api/planets/:id/characters', async (req, res) => {
    const planetId = parseInt(req.params.id);

    // Get character IDs and details
    const characters = await db.collection('characters')
        .find({ homeworld: planetId })
        .project({ _id: 0, id: 1, name: 1 })
        .toArray();

    if (characters.length === 0) {
        return res.status(404).json({ error: "No characters found for this planet" });
    }

    res.json(characters);
});




app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});