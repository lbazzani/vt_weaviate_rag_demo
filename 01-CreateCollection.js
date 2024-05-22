import weaviate from 'weaviate-client'
import axios from 'axios'
import dotenv from 'dotenv'

const client = await weaviate.connectToLocal({
    httpHost: 'localhost',
    httpPort: 8080,
    grpcHost: 'localhost',
    grpcPort: 50051,
    headers: {
      'X-OpenAI-Api-Key': process.env.OPENAI_APIKEY || ''
    }
  }
)

const news_data = await axios.get('https://news.bazzify.com/topnews.json');

await client.collections.delete("News"); 

const newsCollection = await client.collections.create({
  name: 'News',
  properties: [
    {
      name: 'newsid',
      dataType: weaviate.configure.dataType.NUMBER,
      "moduleConfig": { "text2vec-openai": { "skip": true } }
    },
    {
      name: 'domain',
      dataType: weaviate.configure.dataType.TEXT,
      "moduleConfig": { "text2vec-openai": { "skip": true } }
    },
    {
      name: 'title',
      dataType: weaviate.configure.dataType.TEXT,
      tokenization: 'word'
    },
    {
      name: 'description',
      dataType: weaviate.configure.dataType.TEXT,
      tokenization: 'word'
    },
  ],
  vectorizer: weaviate.configure.vectorizer.text2VecOpenAI(),
  generative: weaviate.configure.generative.openAI()
})

const newsToInsert = news_data.data.map((news) => {
  return {
    newsid: news.id,
    title: news.title,
    description: news.description,
    domain: news.domain
  }
})

for (var i = 0; i < newsToInsert.length; i++) {
  var response = await newsCollection.data.insert(newsToInsert[i]);

  console.log(response);

  response = await newsCollection.query.fetchObjectById(response);

  console.log(response);

}


