const dotenv = require("dotenv").config();
const express = require('express')
const cors = require('cors')
const app = express()

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
const openai = new OpenAIApi(configuration);

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true })) 

app.post('/colorpick', async function (req, res) {
    let messages = [
        {role: "system", content: "너는 키워드에 맞게 색상을 추천해주는 챗봇이야. 색상 추천은 5가지로 하고 컬러 영문 이름, 컬러코드, rgb를 JSON 형태로만 답해줘."},
        {role: "user", content: "너는 키워드에 맞게 색상을 추천해주는 챗봇이야. 색상 추천은 5가지로 하고 컬러 영문 이름, 컬러코드, rgb를 JSON 형태로만 답해줘."},
        {role: "assistant", content: "원하시는 키워드를 입력해주세요."},
    ]

    while (userMessages.length != 0 || assistantMessages.length != 0) {
        if (userMessages.length != 0) {
            messages.push(
                JSON.parse('{"role": "user", "content": "'+String(userMessages.shift()).replace(/\n/g,"")+'"}')
            )
        }
        if (assistantMessages.length != 0) {
            messages.push(
                JSON.parse('{"role": "assistant", "content": "'+String(assistantMessages.shift()).replace(/\n/g,"")+'"}')
            )
        }
    }

    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messages
    });
    
    let fortune = completion.data.choices[0].message['content']

    res.json({"assistant": fortune});
});

app.listen(3000)



