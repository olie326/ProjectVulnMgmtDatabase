import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.xsrfHeaderName = "X-XSRF-TOKEN"
axios.defaults.xsrfCookieName = "csrftoken";

const PostFilters = async (filterState: string[][]) => {
    //make this dynamic in the future!
    const filter_options = {
        vulnerability_options: {
        last_seen: filterState[0][0],
        severity: filterState[0]?.[1] ?? "",
        state: filterState[0]?.[2] ?? "",
        },
        asset_options: {
        last_scan_time: filterState[1]?.[0] ?? "",
        is_licensed: filterState[1]?.[1] ?? "",
        is_public: filterState[1]?.[2] ?? "",
        },
    };

    const filtered_data = await axios
      .post("http://127.0.0.1:8000/api/filter", filter_options, {
        headers: {
          "Content-Type": "application/json"
        },
      }
    )
      .then((response) => {
        return JSON.parse(response.data);
      });
      console.log(filter_options);
      console.log(filtered_data)
      return filtered_data;
  };

export { PostFilters }
