from flask import render_template, Flask, jsonify, request
from model.sir_model import SIRModel

app = Flask(__name__) 


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/simulate", methods=["GET"])
def simulate():

    S = int(request.args.get("S"))
    I = int(request.args.get("I"))

    beta = float(request.args.get("beta"))
    gamma = float(request.args.get("gamma"))
    mu = float(request.args.get("mu"))

    days_count = int(request.args.get("days"))

    model = SIRModel(
        S=S,
        I=I,
        R=0,
        D=0,
        beta=beta,
        gamma=gamma,
        mu=mu,
    )

    days = []

    for day in range(days_count):
        model.step()
        days.append(day)

    return jsonify(
        {
            "days": days,
            "S": model.S_history,
            "I": model.I_history,
            "R": model.R_history,
            "D": model.D_history,
        }
    )


if __name__ == "__main__":
    app.run(debug=True)
