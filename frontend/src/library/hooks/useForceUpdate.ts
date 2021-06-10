/**
 * Custom React hook to trigger re-render of the component.
 * */

import { useState } from "react";

export const useForceUpdate = () => {

  const [value, setValue] = useState<number>(0);

  return () => setValue(value => value + 1);

};
