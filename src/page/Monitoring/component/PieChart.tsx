import React from 'react'
import { Cell, Pie, PieChart } from 'recharts'

interface PieChartProps {
    size:number,
    data: ChartData[]
}

interface ChartData {
    name: string,
    value: number, 
    label: string,
    color: string
}
const CustomPieChart = ({size, data}: PieChartProps) => {
    return (
        <PieChart width={size} height={size * .8}>
            <Pie
                data={data}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius="50%"
                fill="#8884d8"
                label={({ name, value, label }) => `${label}: ${value}`}
            >
                {data.map((entry) => (
                    <Cell key={`cell-${entry.name}`} fill={entry.color} />
                ))}
            </Pie>
        </PieChart>
    )
}

export default CustomPieChart