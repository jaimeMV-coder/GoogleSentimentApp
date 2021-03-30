const { json } = require('body-parser');
const language = require('@google-cloud/language');
const Text = require('../models/texts');
const {textSchema} = require('../helpers/validation_schema');
// Creates a client
const client = new language.LanguageServiceClient();

module.exports = {
    googleText: async function(req,res,next){
        const text = req.body.text;
        // Prepares a document, representing the provided text
        const document = {
        content: text,
        type: 'PLAIN_TEXT',
        };
        
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
        const miText = new Text({
            userID: req.get('auth-token'),
            text: req.body.text,
            score: sentiment.score,
            magnitude:sentiment.magnitude
        });
        console.log(miText);
        //const {error} = await textSchema.validateAsync(miText);
        const savedText = await miText.save();
        res.status(200).json({status:"200",response:savedText});
        next();
    }
};