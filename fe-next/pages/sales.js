import Head from "next/head";
import styles from "../styles/Home.module.css";
import { NavBar } from "../components/navbar";
import { Footer } from "../components/footer";
import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormControl,
  Button,
  InputGroup,
  Table,
  Modal,
} from "react-bootstrap";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ComposedChart,
  Tooltip,
  Legend,
  Area,
  Bar,
  Sector,
  ResponsiveContainer
} from "recharts";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthenticateEmployee } from "../helpers/AuthenticateEmployee";
import Badge from "react-bootstrap/Badge";
import { PieChart, Pie } from "recharts";
import { TransactionsQueries } from "../queries/transactions";

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1)}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`Unit Sales - ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1)}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#333"
      >{`Total Sales - ₱${payload.total_price}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1)}
        y={ey}
        dy={36}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default function Sales({ token, employee, _weeklyData, _monthlyData }) {
  const [activePieIndex, setActivePieIndex] = useState(0);
  const [mode, setMode] = useState("Week");

  console.log(_weeklyData);
  return (
    <div>
      <Head>
        <title>Vaperous M4ster - POS Website</title>
        <link rel="icon" href="/img/Logo.jpg" />
      </Head>

      <NavBar token={token} employee={employee} />

      <h2 className="fs-2 text-center"> Sales Performance</h2>

      <div className="d-flex align-items-center justify-content-center">
        <Form.Select onChange={(e)=>setMode(e.target.value)} style={{maxWidth: 256}}>
          <option value="Week">Week Sales</option>
          <option value="Month">Month Sales</option>
        </Form.Select>
      </div>

      <div>
        {" "}
        <h6 className="text-center">
          {" "}
          Here you will see a summary your transaction in a {mode === "Week" ? "week" : "month"}
        </h6>{" "}
      </div>

      <div className="text-center">
        <Badge bg="primary">Total Sales: ₱{(mode == "Week" ? _weeklyData : _monthlyData).totalSales}</Badge>
      </div>

      <Container className="my-5">
        <Row>
          <Col md={6} className="d-flex justify-content-center align-items-center flex-column">
            <h3>Top Selling Products this {mode}</h3>
            <ResponsiveContainer width="100%" height={412}>
              <PieChart>
                <Pie
                  activeIndex={activePieIndex}
                  activeShape={renderActiveShape}
                  data={mode == "Week" ? _weeklyData.pieData : _monthlyData.pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  onMouseEnter={(_, index) => setActivePieIndex(index)}
                />
              </PieChart>
            </ResponsiveContainer>
          </Col>
          <Col md={6} className="d-flex justify-content-center align-items-center flex-column">
            <h3>{mode === "Week" ? "Daily" : "Weekly"} Breakdown of Sales</h3>
            <ResponsiveContainer width="100%" height={412}>
              <ComposedChart data={mode == "Week" ? _weeklyData.barData : _monthlyData.barData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#f5f5f5" />
                <Area
                  type="monotone"
                  dataKey="Sales"
                  fill="#8884d8"
                  stroke="#8884d8"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </Col>
        </Row>
      </Container>

      <h1 className="fs-2 text-center"> Sales Data</h1>

      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>{mode === "Week" ? "Day" : "Months"}</th>
              <th>Total Sales</th>
            </tr>
          </thead>
          <tbody>
            {
              (mode === "Week" ? _weeklyData.barData : _monthlyData.barData).map((data, key)=>(
                <tr key={key}>
                  <td>{data.name}</td>
                  <td>₱{data.Sales}</td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </Container>
      <br></br>
      <br></br>
      <br></br>

      <Footer></Footer>

      <script src="https://unpkg.com/aos@next/dist/aos.js"></script>
      <script>AOS.init();</script>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { props } = await AuthenticateEmployee(context);

  if (!props.employee) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  let _weeklyData = (
    await TransactionsQueries.generateSalesDataWeekly(props.token)
  ).data;

  let _monthlyData = (
    await TransactionsQueries.generateSalesDataMonthly(props.token)
  ).data;

  return {
    props: {
      ...props,
      _weeklyData,
      _monthlyData
    },
  };
}
