import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import {
  Card,
  CardContent,
  Typography,
} from "@mui/material";

const COLORS = [
  "#4CAF50",
  "#2196F3",
  "#FF9800",
  "#9C27B0",
  "#F44336",
  "#00BCD4",
  "#8BC34A",
  "#795548",
  "#607D8B",
];

function CategoryChart({ items }) {
  const counts = {};

  items.forEach((item) => {
    const category = item.category || "Pantry";
    counts[category] = (counts[category] || 0) + 1;
  });

  const data = Object.entries(counts).map(([name, value]) => ({
    name,
    value,
  }));

  if (data.length === 0) {
    return null;
  }

  return (
    <Card
      elevation={4}
      sx={{
        height: "100%",
        borderRadius: 3,
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          fontWeight="bold"
        >
          🥧 Pantry by Category
        </Typography>

        <ResponsiveContainer
          width="100%"
          height={380}
        >
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="45%"
              outerRadius={120}
              label={({ percent }) =>
                `${(percent * 100).toFixed(0)}%`
              }
            >
              {data.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value) => [
                `${value} item(s)`,
                "Count",
              ]}
            />

            <Legend
              verticalAlign="bottom"
              height={45}
              iconType="circle"
              formatter={(value) => {
                const item = data.find(
                  (d) => d.name === value
                );

                return `${value} (${item?.value ?? 0})`;
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default CategoryChart;