import axios from "axios";

export default axios.create({
  baseURL: "https://api.yelp.com/v3/businesses",
  headers: {
    Authorization:
      "Bearer vCshSWp_Iufdnaz4EVeKHyfn1fh-fn-sL_PBj7eHMJcbAUzpnHSa84AD8PV7uslsdl48zXe9V2kg-aD2fh0Wep5vF6b2kvh6rZ8JXNp0ia8safE7BzKCw6JfuFhGY3Yx",
  },
});