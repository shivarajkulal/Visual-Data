import React from "react";
import { PolarArea } from "react-chartjs-2";
import { Box, Heading } from "@chakra-ui/react";

// Function to generate a unique color
function generateUniqueColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

const TopicsPolarAreaChart = ({ data }) => {
  const topics = [...new Set(data.map((item) => item.topic))]; // Remove duplicates

  // Generate a unique color for each topic
  const colors = topics.map((topic) => generateUniqueColor());

  const chartData = {
    labels: topics,
    datasets: [
      {
        data: data.map((item) => item.relevance),
        backgroundColor: colors,
        borderColor: colors.map((color) => color.replace(")", ", 1)")),
        borderWidth: 3,
      },
    ],
  };

  const chartOptions = {
    scale: {
      ticks: {
        beginAtZero: true,
        stepSize: 1,
        max: 5,
      },
    },
  };

  return (
    <Box>
      <Heading as="h2" mb={4}>
        Topics Chart
      </Heading>
      <PolarArea data={chartData} options={chartOptions} />
    </Box>
  );
};

export default TopicsPolarAreaChart;
