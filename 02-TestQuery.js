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

const myCollection = client.collections.get("News");

// esempio client
var result = await myCollection.query.nearText('corruzione',{
    limit: 20,
    targetVector: 'description',
    returnProperties: ['title', 'description'],
    returnMetadata: ['distance']
  })
  
  for (let object of result.objects) {
    console.log(object.properties.title + ' - ' + object.metadata?.distance);
}




