import { Box, Typography } from "@material-ui/core";
import Link from "next/link";

import Layout from "../components/common/Layout";


export default function Home() {
  return (
    <Layout>

      <Box mt={2}>
        <Typography variant={"h1"} align={"center"}>Hello, Welcome to ECMWF Dashboard</Typography>
      </Box>

      <Box textAlign={"center"} mt={2}>
        <Link href={"/dashboard"}>
          <a>
            Go to dashboard
          </a>
        </Link>
      </Box>

    </Layout>
  );
}
