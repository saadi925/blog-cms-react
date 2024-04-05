import { useState } from "react";
import visibleIcon from "../assets/visual.png";
import invisibleIcon from "../assets/invisible.png";
import { useLoginMutation } from "../setup/store/authApi";
import { useNavigate } from "react-router-dom";
const LoginForm = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [login, { isLoading, isSuccess, isError }] = useLoginMutation();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [msg, setMsg] = useState("");
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handleInputChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const res = await login(formData).unwrap();
      if (res.token) {
        localStorage.setItem("token", res.token);
        navigate("/")
        setMsg("Login Successful");
      }
    } catch (err: any) {
      const messageArray = err.data.message;
      if (Array.isArray(messageArray)) {
        setError(messageArray.join(", "));
      } else if (typeof messageArray === "string") {
        setError(err.data.message);
      }
      console.log(err.data.message);
    }
  };

  return (
    <div className="bg-gray-950 text-white w-full flex justify-center min-h-screen">
      <div className="p-24 pl-16 pr-4 ">
        <h3 className="text-gray-400 text-2xl uppercase font-semibold">
          Welcome Back
        </h3>
        <div>
          <h1 className="text-4xl font-serif py-2">Login</h1>
        </div>
        <form className="my-4 space-y-4  w-full items-center ">
          <div className="flex flex-col gap-4">
            <div className="bg-slate-900  max-w-sm text-opacity-80 rounded-3xl my-3 md:my-0">
              <span className="mx-6 px-2 font-semibold">Email</span>
              <input
                type="email"
                onChange={(e) => handleInputChange(e)}
                name="email"
                className="w-full  bg-slate-900 text-white px-6 py-2 rounded-3xl focus:outline-none border-b border-blue-600 focus:border-green-600"
              />
            </div>
            <div className="bg-slate-900 relative max-w-sm text-opacity-80 rounded-3xl my-3 md:my-0 ">
              <span className="mx-6 px-2 font-semibold">Password</span>
              <input
                onChange={(e) => handleInputChange(e)}
                name="password"
                type={passwordVisible ? "text" : "password"}
                className="w-full  bg-slate-900 text-white px-6 py-2 rounded-3xl focus:outline-none border-b border-blue-600 focus:border-green-600"
              />
              <button
                type="button"
                className="absolute top-1/2 transform -translate-y-1/2 right-4"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? (
                  <img
                    src={visibleIcon}
                    alt="Hide Password"
                    className="visible-password-icon w-7"
                  />
                ) : (
                  <img
                    src={invisibleIcon}
                    alt="Show Password"
                    className="invisible-password-icon w-7"
                  />
                )}
              </button>
            </div>
          </div>
          <button
            type="button"
            onClick={(e) => handleLogin(e)}
            className="bg-blue-600 text-xl my-6 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors"
          >
            {isLoading ? "Submitting..." : "Login"}
          </button>
          <div className="relative">
            {isError && (
              <div className="text-red-500 text-xl  absolute top-0 ">
                {error}
              </div>
            )}
            {isSuccess && msg && (
              <div className="text-green-500 text-xl   ">{msg}</div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
