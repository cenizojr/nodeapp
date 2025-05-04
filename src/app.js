require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const HelloWordService = require( "./services/hello-world" );

const MovieRecommendationsService = require('./services/movie-recommendations');
const configuration = require('./config/configuration');
const { ChatGroq } = require('@langchain/groq');

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/:nameToSalute', (req, res) => {
  res.send(new HelloWordService().greet(req.params.nameToSalute));
})

app.put('/post-test', async (req, res) => {
  const recommendations = await new MovieRecommendationsService(
    new ChatGroq({
      apiKey: configuration.groq.apiKey,
      model: 'deepseek-r1-distill-llama-70b',
    })
  ).getMovieRecommendations(req.body);
    res.send(recommendations);
});

module.exports = app