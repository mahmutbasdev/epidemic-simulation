class SIRModel:

    def __init__(self, S, I, R, D, beta, gamma, mu):
        self.S = S
        self.I = I
        self.R = R
        self.D = D

        self.beta = beta
        self.gamma = gamma
        self.mu = mu

        self.S_history = []
        self.I_history = []
        self.R_history = []
        self.D_history = []

    def step(self):
        N = self.S + self.I + self.R

        new_infected = self.beta * self.S * self.I / N
        new_recovered = self.gamma * self.I
        new_dead = self.mu * self.I

        new_infected = min(self.S, new_infected)
        new_recovered = min(self.I, new_recovered)
        new_dead = min(self.I - new_recovered, new_dead)

        self.S -= new_infected
        self.I += new_infected - new_recovered - new_dead
        self.R += new_recovered
        self.D += new_dead

        self.S_history.append(self.S)
        self.I_history.append(self.I)
        self.R_history.append(self.R)
        self.D_history.append(self.D)
