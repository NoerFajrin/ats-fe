import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface LineChartProps {
    size:number,
    data: LineChartData[]
}
interface LineChartData {
    timestamp: string;
    bahaya: number;
    waspada: number;
    aman: number;
  }

const CustomLineChart = ({size, data}: LineChartProps) => {
    return (
        <LineChart width={size} height={size} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="bahaya" stroke="#FF4136" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="waspada" stroke="#FF851B" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="aman" stroke="#2ECC40" activeDot={{ r: 8 }} />
            </LineChart>
        
    )
}

export default CustomLineChart