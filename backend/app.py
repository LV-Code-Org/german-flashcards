from flask import Flask
from flask_cors import CORS, cross_origin
from docs import compile_data

app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route("/getdata")
@cross_origin()
def get_data():
    return {
        "topics": list(compile_data().keys()),
        "translations": compile_data()
    }


if __name__ == "__main__":
    app.run(debug=True)