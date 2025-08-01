import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import cors from 'cors';

const mongoClient = new MongoClient('mongodb://localhost:27017');
await mongoClient.connect();
const url = 'mongodb://localhost:27017';
const dbName = 'swapi';
const db = mongoClient.db('swapi');

const app = express();
app.use(cors());
const PORT = 3000;

app.use(express.static('./public'))

app.use(express.json());

app.get('/api/characters', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection('characters');        
        const characters = await collection.find({}).toArray();
        res.json(characters);
        client.close();
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error fetching characters");
    }
});


app.get('/api/films', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection('films');
        const films = await collection.find({}).toArray();
        res.json(films);
        client.close();
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error fetching films")
    }
});

app.get('/api/planets', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection('planets');
        const planets = await collection.find({}).toArray();
        res.json(planets);
        client.close();
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error fetching planets")
    }
});

app.get('/api/characters/:id', async (req, res) => {
    try {
        const characterId = req.params.id;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection('characters');
        const numericId = parseInt(characterId);
        const character = await collection.findOne({ id: numericId });
        
        if (!character) {
            return res.status(404).json({
                error: "Not found",
                message: `Character with ID ${characterId} not found`
            });
        }
        res.json(character);
        client.close();
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error fetching character");
    } 
});

app.get('/api/films/:id', async (req, res) => {
    try {
        const filmId = req.params.id;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection('films');
        const numericId = parseInt(filmId);
        const film = await collection.findOne({ id: numericId });

        if (!film) {
            return res.status(404).json({
                error: "Not found",
                message: `Film with ID ${filmId} not found`
            });
        }
        res.json(film);
        client.close();
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error fetching film");
    }
});

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