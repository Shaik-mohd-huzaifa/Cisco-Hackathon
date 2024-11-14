import json
from flask import Flask, request
from Services.llm_service import getLLMChain
from flask_cors import CORS

app = Flask(__name__)

CORS(app, origins=["*"])


@app.route("/getSummary", methods=["POST"])
def summarize():
    data = request.get_json()
    chain = getLLMChain()
    response = chain.invoke({"Packet": data})
    return {"response": response}


@app.route("/getPackages", methods=["GET"])
def getPackages():
    with open("data.json", "r") as file:
        data = json.load(file)

    return {"data": data}


if __name__ == "__main__":
    app.run(debug=True)
