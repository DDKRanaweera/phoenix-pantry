import { Box } from "@mui/material";

import CategoryChart from "../CategoryChart";
import ExpiryChart from "../ExpiryChart";

function AnalyticsSection({ items }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          lg: "1fr 1fr",
        },
        gap: 3,
        mb: 4,
        alignItems: "start",
      }}
    >
      <Box>
        <CategoryChart items={items} />
      </Box>

      <Box>
        <ExpiryChart items={items} />
      </Box>
    </Box>
  );
}

export default AnalyticsSection;