import { userSchema } from "@/components/authentication/SignUpForm";
import { loginUserSchema } from "@/components/authentication/LoginForm";
import axios from "axios";
import { z } from "zod";
import { selectSchema } from "@/components/CrudButtons";
import { ValueSetter } from "node_modules/date-fns/parse/_lib/Setter";
import { editUserSchema } from "@/pages/Settings/profile";

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

const signUp = async (values: z.infer<typeof userSchema>) => {
  axios.post("http://127.0.0.1:8000/api/create_account", values);
};

const logIn = async (values: z.infer<typeof loginUserSchema>) => {
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

  return response;
};

const updateUser = async (values: z.infer<typeof editUserSchema>) => {
  const response = await axios.patch(
    "http://127.0.0.1:8000/api/dj-rest-auth/user/",
    values
  );
  return response.data;
};

const updateRemediation = async (
  status: z.infer<typeof selectSchema>,
  Rows: {}
) => {
  const value = status.status;

  const rows = Object.keys(Rows);
  const response = await axios.post(
    "http://127.0.0.1:8000/api/remediation_update",
    {
      value: value,
      rows: rows,
    }
  );
  return response;
};

const deleteRows = async (
  variant: "Vulnerability" | "Asset" | "Definition",
  Rows: {}
) => {
  const rows = Object.keys(Rows);
  const response = await axios.post("http://127.0.0.1:8000/api/delete_rows", {
    variant: variant,
    rows: rows,
  });
  return response;
};

const getAge = async () => {
  axios.get("http://127.0.0.1:8000/api/avg_vulnerability_age");
};

export {
  PostFilters,
  signUp,
  logIn,
  logout,
  getUser,
  updateUser,
  updateRemediation,
  deleteRows,
  getAge,
};
