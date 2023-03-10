import React from "react";

// ChartJS Bar chart Component
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
//bootstrap components
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
//bootstrap spacing
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Financial() {
  //fake data
  let labels = ["2022-12", "2023-1", "2023-2", "2023-3"];
  const expenseData = [75, 400, 230, 300];
  let incomeData = [100, 250, 370, 400];

  return (
    <>
      {/* Page Name */}
      <h1 className="display-1">דאשבורד פיננסי</h1>
      {/* Date Selector */}
      <Row className="ms-md-2">
        <Col xs={5} md={3}>
          <Form.Label className="me-1">מחודש</Form.Label>
          <input type="month" placeholder="YYYY-MM" />
        </Col>
        <Col xs={5} md={3}>
          <Form.Label className="me-1">עד חודש</Form.Label>
          <input type="month" placeholder="YYYY-MM" />
        </Col>
        <Col xs={2} md={2}>
          <Button>הצג מידע</Button>
        </Col>
      </Row>
      {/* Bar Chart */}

      {/* //TODO: Check if data useState before displaying chart */}
      <Bar
        data={{
          labels: labels,
          datasets: [
            {
              label: "Income",
              data: incomeData,
              backgroundColor: "rgba(18, 246, 52, 0.5)",
            },
            {
              label: "Expense",
              data: expenseData,
              backgroundColor: "rgba(246, 18, 18, 0.5)",
            },
          ],
        }}
      />
    </>
  );
}

export default Financial;
