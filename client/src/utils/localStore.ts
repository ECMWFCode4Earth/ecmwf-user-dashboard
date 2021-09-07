import localforage from "localforage";


/**
 * Client side storage.
 * */

const localStore = localforage.createInstance({ name: "ecmwf-dashboard" });

export default localStore;
