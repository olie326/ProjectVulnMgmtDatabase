import { newUserSchema } from "@/components/authentication/SignUpForm";
import { userSchema } from "@/components/authentication/LoginForm";
import axios from "axios";
import { z } from "zod";

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.defaults.xsrfHeaderName = "X-CSRFToken";
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
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return JSON.parse(response.data);
    });
  console.log(filter_options);
  console.log(filtered_data);
  return filtered_data;
};

export async function sendData(formData: FormData) {
  const response = await axios
    .post("http://127.0.0.1:8000/api/file", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response);
        return;
      } else if (error.request) {
        console.log(error.request);
        return;
      } else {
        console.log("Error", error.message);
        return;
      }
    });

  return response;
}

const signUp = async (values: z.infer<typeof newUserSchema>) => {
  axios.post("http://127.0.0.1:8000/api/create_account", values);
};

const logIn = async (values: z.infer<typeof userSchema>) => {
  const response = await axios.post(
    "http://127.0.0.1:8000/api/dj-rest-auth/login/",
    values
  );
  return response;
};

const logout = async () => {
  const response = await axios.post(
    "http://127.0.0.1:8000/api/dj-rest-auth/logout/"
  );
  return response;
};

const getUser = async () => {
  const response = await axios.get(
    "http://127.0.0.1:8000/api/dj-rest-auth/user/"
  );
  return response.data;
};

export { PostFilters, signUp, logIn, logout, getUser };
