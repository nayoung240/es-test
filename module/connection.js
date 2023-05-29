const { Client } = require('@elastic/elasticsearch');

const client = new Client({
  node: 'http://localhost:9200',
  maxRetries: 5,
  requestTimeout: 60000,
  sniffOnStart: true,
//   auth: {
//     username: 'xxxxxx',   //elasticsearch의 주소 
//     password: 'xxxxxx'
//   }
})

async function bootstrap() {
    try {
      client.ping();
      console.log("9200번 포트 연결");
    } catch (e) {
      console.log(e);
    }
  }
bootstrap();

async function run () {
    // Let's start by indexing some data
    await client.index({
      index: 'game-of-thrones',
      document: {
        character: 'Ned Stark',
        quote: 'Winter is coming.'
      }
    })
  
    await client.index({
      index: 'game-of-thrones',
      document: {
        character: 'Daenerys Targaryen',
        quote: 'I am the blood of the dragon.'
      }
    })
  
    await client.index({
      index: 'game-of-thrones',
      document: {
        character: 'Tyrion Lannister',
        quote: 'A mind needs books like a sword needs a whetstone.'
      }
    })
  
    // here we are forcing an index refresh, otherwise we will not
    // get any result in the consequent search
    await client.indices.refresh({ index: 'game-of-thrones' })
  
    // Let's search!
    // 쿼리
    const result= await client.search({
      index: 'game-of-thrones',
      query: {
        match: { quote: 'winter' }
      }
    })
  
    console.log(result.hits.hits)
}
  
module.exports = client;  