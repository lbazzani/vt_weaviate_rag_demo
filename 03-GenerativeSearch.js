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



const result = await myCollection.generate.nearText(['russia'],{
  singlePrompt: 'Rispondi delineando il contesto partendo da {title} e {description}. Scrivi massimo 20 parole.',
  groupedTask: 'Fai un sommario delle news per argomento',
},{
  limit: 2,
  returnProperties: ['title', 'description', 'domain', 'newsid' ],
})

console.log(JSON.stringify(result.objects, null, 2));