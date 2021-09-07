import { useState } from "react";


/**
 * Utility hook to force component to update.
 * - Won't be needed in many cases.
 * - Indicates bad design?
 * */

export const useForceUpdate = () => {

  const [value, setValue] = useState<number>(0);

  return () => setValue(value => value + 1);

};
