import React from "react";
import { Pie } from "react-chartjs-2";
import { Box, Heading, useColorModeValue } from "@chakra-ui/react";

const PieChart = ({ data }) => {
  const sectors = {};

  data.forEach((entry) => {
    if (!sectors[entry.sector]) {
      sectors[entry.sector] = 0;
    }
    sectors[entry.sector] += entry.intensity;
  });

  // Predefined set of colors to cycle through
  const colorSet = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#E7E9ED",
    "#9966CC",
    "#FFD700",
    "#32CD32",
    "#FF4500",
    "#9400D3",
    "#FF5733",
    "#DAF7A6",
    "#8B4513",
    "#2E8B57",
    "#FF69B4",
    "#D2691E",
    "#B8860B",
    "#8A2BE2",
    "#483D8B",
    "#FA8072",
    "#90EE90",
  ];

  function generateUniqueColor(name) {
    // Append a unique suffix to the sector name to minimize color collisions
    const suffix = Math.random().toString(36).substring(2, 15);
    const adjustedName = `${name}-${suffix}`; // Ensure this is correctly concatenated

    // Calculate the hash for the adjusted name
    const index = Math.abs(calculateHashCode(adjustedName)) % colorSet.length;

    return colorSet[index];
  }

  // Standalone function to calculate a simple hash for string names
  function calculateHashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  }

  const chartData = {
    labels: Object.keys(sectors),
    datasets: [
      {
        data: Object.values(sectors),
        backgroundColor: Object.keys(sectors).map(generateUniqueColor),
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        position: "average",
      },
    },
  };

  return (
    <Box
      p={6}
      borderRadius={20}
      boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
      mt={50}
      ml={50}
      shadow="md"
      pb={100}
      bg={useColorModeValue("white", "gray.800")}
      maxHeight={700}
      overflow="hidden"
    >
      <Heading as="h2" mb={4}>
        Sector Chart
      </Heading>

      <Pie data={chartData} options={chartOptions} />
    </Box>
  );
};

export default PieChart;
