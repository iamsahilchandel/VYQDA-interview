import { useEffect, useState } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";
import "./App.css";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [headers, setHeaders] = useState<Record<string, string> | null>(null);
  const [phoneOrigen, setPhoneOrigen] = useState<string | null>(null);

  const url = "https://chimpu.online/api/post.php";

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response: AxiosResponse<any, any> = await axios.post(url, { phonenumber: "1234567890" }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData = response.data;

      const allHeaders: Record<string, string> = {};
      Object.keys(response.headers).forEach((key) => {
        allHeaders[key] = response.headers[key];
      });

      const phoneOrigenHeader = response.headers["phoneorigen"] || response.headers["Phoneorigen"] || response.headers["PHONEORIGEN"];

      setHeaders(allHeaders);
      setPhoneOrigen(phoneOrigenHeader || "No phoneorigen found");
      setData(responseData);

    } catch (error) {
      const axiosError = error as AxiosError;
      alert("Failed to fetch data");
      console.error(axiosError);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>Headers:</h2>
          <pre>{JSON.stringify(headers, null, 2)}</pre>
          <h2>Phoneorigen Header:</h2>
          <p>{phoneOrigen}</p>
          <h2>Response Data:</h2>
          <pre>{data ? JSON.stringify(data, null, 2) : "not found"}</pre>
        </div>
      )}
    </>
  );
}
