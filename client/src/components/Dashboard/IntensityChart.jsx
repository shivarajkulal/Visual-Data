import React from "react";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Heading } from "@chakra-ui/react";

const IntensityChart = ({ data }) => {
  const intensityData = data.map((item) => item.intensity);
  const years = data.map((item) => item.start_year);

  // Adjusted getColor function to change color for each 10%
  const getColor = (value) => {
    const colors = [
      "#7F00FF", // Blue
      "#F2B93B", // Yellow
      "#FF8000", // Orange
      "#FF453A", // Red
      "#228B22", // Green
      "#DAA520", // Gold
      "#DC143C", // Coral
      "#8B4513", // Saddle Brown
      "#2E8B57", // Teal
      "#4682B4", // Steel Blue
    ];
    // Determine the bucket based on the intensity
    const bucketIndex = Math.floor(value / 10 - 1); // Subtract 1 to start from 0
    return colors[bucketIndex];
  };

  const chartData = {
    labels: years,
    datasets: [
      {
        label: "Intensity",
        backgroundColor: intensityData.map((value) => getColor(value)),
        data: intensityData,
      },
    ],
  };

  const chartOptions = {
    layout: {
      padding: {
        top: 20,
        bottom: 20,
        left: 20,
        right: 20,
      },
    },
    plugins: {
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(0,0,0,0.8)",
        titleColor: "white",
        bodyColor: "white",
        borderColor: "white",
        borderWidth: 1,
        cornerRadius: 5,
        displayColors: false,
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              // Adjust the tooltip to show percentages from 10 to 100
              const adjustedPercentage = Math.round(context.parsed.y / 10) * 10;
              label += adjustedPercentage + "%";
            }
            return label;
          },
        },
      },
      legend: {
        display: true,
        position: "right",
        labels: {
          boxWidth: 20,
          padding: 10,
          font: {
            size: 12,
            weight: "bold",
          },
        },
      },
      datalabels: {
        anchor: "end",
        align: "start",
        offset: -20,
        font: {
          size: 14,
          weight: "bold",
        },
        formatter: (value) => Math.round(value / 10) * 10 + "%",
        shadowBlur: 10,
        shadowColor: "white",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: "Roboto",
            size: 14,
            weight: "bold",
          },
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: "Roboto",
            size: 14,
            weight: "bold",
          },
          callback: (value) => value + "%",
        },
      },
    },
    animation: {
      duration: 4000,
      easing: "easeInOutQuart",
      mode: "progressive",
    },
  };

  return (
    <div
      style={{
        margin: "50px",
        padding: "10px",
        fontFamily: "Arial, sans-serif",
        borderRadius: "8px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Heading as="h2" mb={4}>
        Intensity Chart
      </Heading>
      <Bar
        data={chartData}
        options={chartOptions}
        plugins={[ChartDataLabels]}
      />
    </div>
  );
};

export default IntensityChart;
