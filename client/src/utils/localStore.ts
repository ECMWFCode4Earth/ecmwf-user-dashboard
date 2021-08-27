import localforage from "localforage";


const localStore = localforage.createInstance({ name: "ecmwf-dashboard" });;

export default localStore;
