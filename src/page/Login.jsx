import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(username, password);
    const req = await fetch("https://kobarsept.com/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const token = await req.json();

    localStorage.setItem(
      "token",
      JSON.stringify({
        token: token.token,
        username: username,
      })
    );
    navigate("/home");
    // console.log(await req.json());
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="border-solid border-2 border-sky-500 m-3"
          placeholder="username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          type="password"
          className="border-solid border-2 border-sky-500 m-3"
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          onSubmit={() => {
            handleSubmit();
          }}
          className="bg-sky-500 px-3 rounded"
        >
          submit
        </button>
      </form>
      {/* <div>halo</div> */}
    </>
  );
}

export default Login;
