class  Simulator:
    def __init__(self, model):
        self.model = model

        self.days = []
        self.S_data = []
        self.I_data = []
        self.R_data = []
        self.D_data = []

    def run(self, days):

        for day in range(days):
            self.model.step()

            self.days.append(day)
            self.S_data.append(self.model.S)
            self.I_data.append(self.model.I)
            self.R_data.append(self.model.R)
            self.D_data.append(self.model.D)
