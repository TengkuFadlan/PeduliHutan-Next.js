'use client';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import React from 'react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type WaterGraphProps = {
  data: { timestamp: string; water_level: number }[];
};

const WaterGraph: React.FC<WaterGraphProps> = ({ data }) => {
  const chartData = {
    labels: data.map((entry) =>
      new Date(entry.timestamp).toLocaleString('id-ID', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' })
    ),
    datasets: [
      {
        label: 'Persentase Air',
        data: data.map((entry) => entry.water_level),
        fill: false,
        borderColor: 'rgb(0, 191, 255)',
        backgroundColor: 'rgba(0, 191, 255, 0.5)',
        tension: 0.3,
      },
    ],
  };

  return (
    <Line
      data={chartData}
      options={{
        responsive: true,
        plugins: {
          legend: { display: true },
          title: { display: true, text: 'Riwayat Level Air' },
        },
        scales: {
          y: { min: 0, max: 100, title: { display: true, text: 'Persentase (%)' } },
        },
      }}
    />
  );
};

export default WaterGraph;