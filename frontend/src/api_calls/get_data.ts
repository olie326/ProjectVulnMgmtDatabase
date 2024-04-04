import axios from 'axios';

axios.defaults.withCredentials = true;

const getData = async (variant: "Vulnerability" | "Asset" | "Definition") => {
    
    var data= <Database[]>[];
    await axios
      .post("http://127.0.0.1:8000/api/getDatabase", {
        headers: {
          "Content-Type": "application/json",
        },
          variant: variant
      })
      .then((response) => {
        data = JSON.parse(response.data);
        // console.log(data)
      });
      console.log(data);
      return data;
  };

export { getData }
