import weaviate from 'weaviate-client'
import axios from 'axios'
import dotenv from 'dotenv'

const client = await weaviate.connectToLocal({
    httpHost: 'localhost',
    httpPort: 8080,
    grpcHost: 'localhost',
    grpcPort: 50051,
    headers: {
      'X-OpenAI-Api-Key': process.env.OPENAI_API_KEY || ''
    }
  }
)

const myCollection = client.collections.get("News");

const generatePrompt = `delle news`;


const result = await myCollection.generate.nearText(['Ci sono stati eventi catastofici oggi?'],{
  singlePrompt: 'Rispondi delineando il contesto {title} e {description}',
  groupedTask: 'Raggruppa le news per argomento',
},{
  limit: 2,
  returnProperties: ['title', 'description'],
})

console.log(JSON.stringify(result.objects, null, 2));