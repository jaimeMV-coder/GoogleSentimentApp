// Imports the Google Cloud client library
const language = require('@google-cloud/language');

// Creates a client
const client = new language.LanguageServiceClient();

const text = 'Your text to analyze, e.g. Hello, world!';

// Prepares a document, representing the provided text
const document = {
  content: text,
  type: 'PLAIN_TEXT',
};


// Detects the sentiment of the document
async function main(){
const [result] = await client.analyzeSentiment({document});

const sentiment = result.documentSentiment;
console.log('Document sentiment:');
console.log(`  Score: ${sentiment.score}`);
console.log(`  Magnitude: ${sentiment.magnitude}`);

const sentences = result.sentences;
sentences.forEach(sentence => {
  console.log(`Sentence: ${sentence.text.content}`);
  console.log(`  Score: ${sentence.sentiment.score}`);
  console.log(`  Magnitude: ${sentence.sentiment.magnitude}`);
});
}
main()