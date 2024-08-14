import openai
import os
from fastapi.responses import Response
from fastapi.responses import PlainTextResponse
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to allow requests from specific origins
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)


openai.api_key = "<input-openai-key>" >


def codeSummary(code):
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=f"{code}\n====\nExplain what the above code is doing in a concise manner : \n1.",
        temperature=0,
        max_tokens=150,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0,
        stop=["===="]
    )
    return response.choices[0].text


@app.get("/")
def process_code(code):
    res = "1." + str(codeSummary(code))
    res = res.replace('\n', '\n\n')

    print(type(res))
    print(res)
    return PlainTextResponse(res)
