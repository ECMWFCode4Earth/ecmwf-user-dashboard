import React from "react";

import Layout from "../components/common/Layout";
import ChartBrowser from "../components/ChartBrowser";


const ChartBrowserPage: React.FC = () => {
  return (
    <Layout>
      <ChartBrowser isOpen={true} onClose={() => {}} />
    </Layout>
  );

};


export default ChartBrowserPage;
