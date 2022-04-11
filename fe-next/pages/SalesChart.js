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
      name: "Week 1",
      uv: 4000,
      weeks: 2400,
      amt: 2400,
    },
    {
      name: "Week 2",
      uv: 3000,
      weeks: 1398,
      amt: 2210,
    },
    {
      name: "Week 3",
      uv: 2000,
      weeks: 9800,
      amt: 2290,
    },
    {
      name: "Week 4",
      uv: 2780,
      weeks: 3908,
      amt: 2000,
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

      <h1> Total Sales: 136, 435.49 </h1>

      <ComposedChart width={800} height={450} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid stroke="#f5f5f5" />
        <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
        <Bar dataKey="weeks" barSize={20} fill="#413ea0" />
        <Line type="monotone" dataKey="uv" stroke="#ff7300" />
      </ComposedChart>

      <h1 className="fs-2 text-center"> Sales Data</h1>
      <Footer></Footer>
    </div>
  );
}
