import axios from "axios";

export default async function Home() {
  const URL = "https://chimpu.online/api/post.php ";
  const data = { phonenumber: "1234567890" };
  const response = await axios.post(URL, data);

  return (
    <div className="flex flex-col gap-4">
      {
        response.headers ? <p>Response Headers: {JSON.stringify(response.headers, null, 2)}</p> : "Headers not found"
      }
      {
        response.headers['phoneorigen'] ? <p>Phoneorigen: {JSON.stringify(response.headers['phoneorigen'])}</p> : "phoneorigen not found"
      }
      {
        response.data.msg ? <p>Response Data: {response.data.msg}</p> : "Msg not found"
      }
    </div>
  );
}
