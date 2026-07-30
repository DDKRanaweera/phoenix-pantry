import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import {
  Card,
  CardContent,
  Typography,
} from "@mui/material";

function ExpiryChart({ items }) {
  const counts = {
    today: 0,
    oneTwo: 0,
    threeFour: 0,
    fiveSeven: 0,
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  items.forEach((item) => {
    const [year, month, day] = item.expiry
      .split("-")
      .map(Number);

    const expiry = new Date(year, month - 1, day);
    expiry.setHours(0, 0, 0, 0);

    const diffDays = Math.floor(
      (expiry - today) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 0) {
      counts.today++;
    } else if (diffDays >= 1 && diffDays <= 2) {
      counts.oneTwo++;
    } else if (diffDays >= 3 && diffDays <= 4) {
      counts.threeFour++;
    } else if (diffDays >= 5 && diffDays <= 7) {
      counts.fiveSeven++;
    }
  });

  const data = [
    { period: "Today", items: counts.today },
    { period: "1–2 Days", items: counts.oneTwo },
    { period: "3–4 Days", items: counts.threeFour },
    { period: "5–7 Days", items: counts.fiveSeven },
  ];

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
          📈 Items Expiring in the Next 7 Days
        </Typography>

        <ResponsiveContainer
          width="100%"
          height={380}
        >
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 20,
              left: 0,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="period" />

            <YAxis allowDecimals={false} />

            <Tooltip
              formatter={(value) => [
                `${value} item(s)`,
                "Expiring",
              ]}
            />

            <Bar
              dataKey="items"
              fill="#2E7D32"
              radius={[8, 8, 0, 0]}
              barSize={55}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default ExpiryChart;