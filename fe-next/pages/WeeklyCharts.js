import Head from "next/head";
import styles from "../styles/Home.module.css";
import { NavBar } from "../components/navbar";
import { Footer } from "../components/footer";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Area,
  Bar,
} from "recharts";

export default function Sales() {
  const [data, setData] = useState([
    {
      name: "Monday",
      uv: 2000,
      days: 1200,
      amt: 1600,
    },
    {
      name: "Tuesday",
      uv: 2100,
      days: 2298,
      amt: 1910,
    },
    {
      name: "Wednesday",
      uv: 2000,
      days: 1298,
      amt: 1490,
    },
    {
      name: "Thursday",
      uv: 2780,
      days: 1908,
      amt: 1900,
    },
    {
      name: "Friday",
      uv: 2000,
      days: 2742,
      amt: 1783,
    },
    {
      name: "Saturday",
      uv: 2130,
      days: 1842,
      amt: 1620,
    },
    {
      name: "Saturday",
      uv: 2030,
      days: 2003,
      amt: 1820,
    },
  ]);

  return (
    <div>
      <Head>
        <title>Vaperous M4ster - POS Website</title>

        <link rel="icon" href="/img/Logo.jpg" />
      </Head>

      <NavBar></NavBar>

      <h1 className="fs-2 text-center"> Sales Performance</h1>

      <h1> Total Sales: 34, 435.49 </h1>

      <ComposedChart width={800} height={450} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid stroke="#f5f5f5" />
        <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
        <Bar dataKey="days" barSize={20} fill="#413ea0" />
        <Line type="monotone" dataKey="uv" stroke="#ff7300" />
      </ComposedChart>

      <h1 className="fs-2 text-center"> Sales Data</h1>
      <Footer></Footer>
    </div>
  );
}
