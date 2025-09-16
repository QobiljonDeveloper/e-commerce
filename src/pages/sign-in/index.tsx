import { memo, useState, type FormEvent } from "react";
import { api } from "../../api";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setToken } from "../../lib/features/authSlice";
import { Link, useNavigate } from "react-router-dom";
import loginImg from "../../assets/login.png";
import logo from "../../assets/logo.svg";
import { LuEye, LuEyeOff } from "react-icons/lu";

const SignIn = () => {
  const [username, setUsername] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const body = { username, password, expiresInMins: 1 };
    api
      .post("/auth/login", body)
      .then((res) => {
        toast.success("Welcome");
        dispatch(setToken(res.data.accessToken));
        navigate("/account");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex flex-col lg:flex-row items-center gap-10 min-h-screen">
      <div
        className="w-full lg:w-1/2 h-[430px] lg:h-screen relative flex items-start"
        style={{
          backgroundImage: `url(${loginImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Link to={"/"}>
          <img src={logo} alt="Logo" className="mx-auto mt-4 lg:mt-8" />
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex justify-center mx-auto flex-col w-[90%] sm:w-[70%] md:w-[50%] lg:w-[25%] py-8"
      >
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>
        <p className="mb-6 text-gray-500">
          Don’t have an account yet?{" "}
          <span className="text-green-600 cursor-pointer">Sign Up</span>
        </p>

        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Your username or email address"
          className="border-b border-[#E9ECEF] py-3 w-full focus:outline-none"
          type="text"
        />

        <div className="relative mt-8">
          <input
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="border-b border-[#E9ECEF] py-3 w-full focus:outline-none pr-10"
            type={show ? "text" : "password"}
          />
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
          >
            {show ? <LuEyeOff size={20} /> : <LuEye size={20} />}
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 my-8">
            <input
              type="checkbox"
              id="remember"
              className="border border-[#6C7275] size-5"
            />
            <label
              htmlFor="remember"
              className="text-[#6C7275] text-[16px] font-normal select-none cursor-pointer"
            >
              Remember me
            </label>
          </div>

          <p
            className="relative inline-block text-sy font-semibold cursor-pointer 
        after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] 
        after:bg-sy after:w-0 after:transition-all after:duration-500 hover:after:w-full"
          >
            Forgot password?
          </p>
        </div>

        <button
          className="border bg-sy py-2.5 rounded-[8px] text-white disabled:opacity-50 cursor-pointer"
          disabled={loading}
        >
          {loading ? "loading..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default memo(SignIn);
