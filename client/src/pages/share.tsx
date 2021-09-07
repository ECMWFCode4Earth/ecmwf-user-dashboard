import React, { useContext, useEffect, useMemo, useState } from "react";
import Layout from "../components/common/Layout";
import { useRouter } from "next/router";
import { Tab } from "../utils/types";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { kStore } from "../utils/constants";
import { AuthContext } from "../utils/contexts/AuthContext";
import TabPanel from "../components/TabPanel";
import { TabManagerContext } from "../utils/contexts/TabManagerContext";
import SharedWidgetCanvas from "../components/SharedWidgetCanvas";


const initialTabState = {
  uuid: uuidv4(),
  name: "Tab 1",
  shared: false,
  sharedWithUsers: [],
  widgetIds: [],
  layouts: {}
};


export default function Share() {

  const router = useRouter();
  const { user } = useContext(AuthContext);
  const { buildAllWidgetsOfSharedTab } = useContext(TabManagerContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>(initialTabState);
  const [widgetConfigurations, setWidgetConfigurations] = useState<Record<string, Record<string, any>>>({});

  const memoizedBuildAllWidgetsOfSharedTab = useMemo(() => buildAllWidgetsOfSharedTab(tab, widgetConfigurations), [tab, widgetConfigurations]);


  useEffect(() => {
    fetchSharedTabDetails().catch((err) => {
      setError(err.message);
      setLoading(false);
    });
  }, []);


  const fetchSharedTabDetails = async () => {
    const sharingUsername = router.query.u;
    const tabUuid = router.query.uuid;
    const res = await axios.get(`${kStore.BASE_URL}/api/shared-tab?u=${sharingUsername}&uuid=${tabUuid}`, { headers: { Authorization: user?.token } });
    setTab(res.data.data.tab);
    setWidgetConfigurations(res.data.data.widgetConfigurations);
    setLoading(false);
  };


  return (
    <Layout showWidgetToolbar={false}>
      {error ? { error } : (
        <TabPanel index={0} value={0}>
          <SharedWidgetCanvas layouts={tab.layouts}>
            {memoizedBuildAllWidgetsOfSharedTab}
          </SharedWidgetCanvas>
        </TabPanel>
      )}
    </Layout>
  );
}
