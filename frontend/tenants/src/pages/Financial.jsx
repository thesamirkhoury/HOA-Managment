import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
//custom hooks
import { useDataContext } from "../hooks/useDataContext";
import { useDataHandler } from "../hooks/useDataHandler";

// ChartJS Bar chart Component
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto"; // eslint-disable-line
//CSV download file
import { CSVLink } from "react-csv";

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
  const [financialData, setFinancialData] = useState([]);

  async function getData(e) {
    e.preventDefault();
    await fetchData(`billing/sum/${fromDate}/${toDate}`, "SET_INCOME");
    await fetchData(`expenses/sum/${fromDate}/${toDate}`, "SET_SPENDING");
  }

  //combines the income and expenses alongside with the months labels, in rows format
  async function combineDataData() {
    if (labels && incomeData && spendingData) {
      //create headers
      let arr = [["חודש", "הכנסות", "הוצאות"]];
      // make each month expense and income in on row
      labels.forEach((label, index) => {
        arr.push([label, incomeData[index], spendingData[index]]);
      });
      // add the creation date
      let today = new Date(Date.now());
      arr.push([
        "----",
        `הקובץ נוצר על ידי מערכת נהל - בתאריך: ${today}`,
        "----",
      ]);
      // set the state
      setFinancialData(arr);
    }
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
        <title>נהל - דשבורד פיננסי</title>
      </Helmet>
      {/* Page Name */}
      <h1 className="display-1">דשבורד פיננסי</h1>
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
            <Button className="mt-2" type="submit">
              הצג מידע
            </Button>
          </Col>

          {income && spending && (
            <Col xs={12} md={2} className="mt-md-4">
              <CSVLink
                data={financialData}
                onClick={combineDataData}
                filename={"מידע פיננסי.csv"}
                asyncOnClick={true}
                className="btn btn-outline-primary mt-2"
              >
                <i className="bi bi-file-earmark-spreadsheet"> </i>הורדת המידע
              </CSVLink>
            </Col>
          )}
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
                label: "Expenses",
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
