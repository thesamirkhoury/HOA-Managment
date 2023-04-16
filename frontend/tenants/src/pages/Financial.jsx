import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
//custom hooks
import { useDataContext } from "../hooks/useDataContext";
import { useDataHandler } from "../hooks/useDataHandler";

// ChartJS Bar chart Component
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto"; // eslint-disable-line
//bootstrap components
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
//bootstrap spacing
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Financial() {
  const { fetchData } = useDataHandler();
  const { income, spending } = useDataContext();
  //form data
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  // chart data extraction
  const [labels, setLabels] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [spendingData, setSpendingData] = useState([]);

  async function getData(e) {
    e.preventDefault();
    await fetchData(`billing/sum/${fromDate}/${toDate}`, "SET_INCOME");
    await fetchData(`expenses/sum/${fromDate}/${toDate}`, "SET_SPENDING");
  }

    useEffect(() => {
      if (income) {
        const date = income.map((i) => i.date);
        setLabels(date);
        const sum = income.map((i) => i.sum);
        setIncomeData(sum);
      }
      if (spending) {
        const sum = spending.map((s) => s.sum);
        setSpendingData(sum);
      }
    }, [income, spending]);

  return (
    <>
      {/* Document Title */}
      <Helmet>
        <title>נהל - דאשבורד פיננסי</title>
      </Helmet>
      {/* Page Name */}
      <h1 className="display-1">דאשבורד פיננסי</h1>
      {/* Date Selector */}
      <Form onSubmit={getData}>
        <Row className="ms-md-2">
          <Col xs={5} md={4}>
            <Form.Group>
              <Form.Label className="me-1">מתאריך</Form.Label>
              <Form.Control
                required
                type="date"
                dir="ltr"
                value={fromDate}
                onChange={(e) => {
                  setFromDate(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col xs={5} md={4}>
            <Form.Group>
              <Form.Label className="me-1">עד חודש</Form.Label>
              <Form.Control
                required
                type="date"
                dir="ltr"
                value={toDate}
                onChange={(e) => {
                  setToDate(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col xs={2} md={2} className="mt-md-4">
            <Button type="submit">הצג מידע</Button>
          </Col>
        </Row>
      </Form>

      {/* Bar Chart */}
      {income && spending && (
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
                data: spendingData,
                backgroundColor: "rgba(246, 18, 18, 0.5)",
              },
            ],
          }}
        />
      )}
    </>
  );
}

export default Financial;
