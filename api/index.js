import express from 'express';
import cors from 'cors';

import { generateChatResponse } from './chatai.js';

const app = express();

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://127.0.0.1:5179',
}));


app.post('/chatai', async (req, res) => {
    try {
        const { msg } = req.body;
        const msgAi = "Whatever maybe the query below just give me algorithm name and data on which algorithm must be preformed (Eg. Implement Linear search on 1 5 3 7 6 to find 7 output should be json format file with algorithmName,data,datatype(type of data in the array eg String,Integer,Float,Character) and required target or anything related to that particular algorithm). If the query is incomplete generate random data and required other things but implement the algorithm only asked by the query. If its not related to any algorithm thing i.e, computer science reply it with not a valid question and importantly generate every thing in json format only and if there is any not valid question take it into body of json as body:  and mention only required fields for json file and if search is given give input for linear search, if sort is given give input for selection sort and if there is any extra information avoid it and consider only what's important, give default data for given algorithm with respect to algorithm . If the input query is a code, analyze the code and give which algorithm it is and also the data it has. If it doesn't have data generate random data required that can be array, matrix, target value etc. The json file which should be returned must contain only algorithm name, data, target or any other required variables"+'\n\n'+msg;

        const assistantResponse = await generateChatResponse(msgAi);

        const parsedResponse = JSON.parse(assistantResponse);

        console.log(parsedResponse);

        return res.json({
            parsedResponse,
        });
    } catch (error) {
        console.error("Error handling /chatai:", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(5000);
