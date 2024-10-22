import React from "react";
import { Bar } from "react-chartjs-2";
import "./BookingChart.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BOOKINGS_BUCKETS = {
  Cheap: {
    min: 0,
    max: 50,
  },
  Moderate: {
    min: 50,
    max: 100,
  },
  Expensive: {
    min: 100,
    max: 10000000,
  },
};

const BookingsChart = ({ bookings, title = "Booking Distribution", labels = BOOKINGS_BUCKETS, chartOptions = {} }) => {
  const defaultChartData = {
    labels: [],
    datasets: [
      {
        label: "Number of Bookings",
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        hoverBackgroundColor: 'rgba(75, 192, 192, 0.8)',
        hoverBorderColor: 'rgba(75, 192, 192, 1)',
        data: [],
      },
    ],
  };

  const chartData = { ...defaultChartData };

  const values = [];
  for (const bucket in labels) {
    const filteredBookingsCount = bookings.reduce((prev, current) => {
      if (
        current.event.price > labels[bucket].min &&
        current.event.price <= labels[bucket].max
      ) {
        return prev + 1;
      }
      return prev;
    }, 0);
    values.push(filteredBookingsCount);
    chartData.labels.push(bucket);
  }

  chartData.datasets[0].data = values;

  // Default chart options if no custom options are provided
  const defaultOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: '#333',
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        backgroundColor: '#333',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#fff',
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#333',
          font: {
            size: 12,
          },
        },
      },
      x: {
        ticks: {
          color: '#333',
          font: {
            size: 12,
          },
        },
      },
    },
  };
  return (
    <div className="bookings-chart-container">
      <h2 className="bookings-chart-title">{title}</h2>
      <div className="chart-wrapper">
        <Bar 
          data={chartData} 
          options={{ ...defaultOptions, ...chartOptions }} 
        />
      </div>
    </div>
  );
};

export default BookingsChart;
