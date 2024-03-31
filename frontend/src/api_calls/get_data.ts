import axios from 'axios';

axios.defaults.withCredentials = true;

const getData = async () => {
    interface Database {
        fields: Object,
        model: string,
        pk: Number
      }
    
    var data= <Database[]>[];
    await axios
      .get("http://127.0.0.1:8000/api/getDatabase", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        data = JSON.parse(response.data);
        // console.log(data)
      });
      console.log(data);
      return data;
  };

export { getData }
