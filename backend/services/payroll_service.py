class PayrollService:
    # 2026 한국 법정 요율
    RATES = {"pension": 0.045, "health": 0.03545, "employment": 0.009}

    @staticmethod
    def calculate(salary: int):
        pension = int(salary * PayrollService.RATES["pension"])
        health = int(salary * PayrollService.RATES["health"])
        emp = int(salary * PayrollService.RATES["employment"])
        return {"net_pay": salary - (pension + health + emp), "deductions": {"pension": pension, "health": health}}
