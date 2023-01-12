const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const cors = require('cors');
const PORT = 3000 || process.env.PORT;

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/chatbot', (req, res) => {
    const message = req.body.message;
    console.log('body', req.body);

    const number = message?.toString().match(/\d+/);

    if (number) {
		fetch(`http://numbersapi.com/${number}?type=trivia`)
        .then(response => response.text())
        .then(data => {
			res.json({
				text: data
			});
		}).catch(error => {
			res.json({
				text: "Sorry, I couldn't find any information about that number."
			});
		});
	} else {
        res.json({
            text: "I'm sorry, I don't undestand your question. Please ask me about a number."
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});