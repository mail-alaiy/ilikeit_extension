import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, setLoading } from "../store/authSlice";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

const InputField = ({
  label,
  type,
  placeholder,
  name,
  pattern,
  errorMessage,
}) => {
  const handleInvalid = (e) => {
    e.target.setCustomValidity(errorMessage); // Set your custom error message
  };

  const handleInput = (e) => {
    e.target.setCustomValidity(""); // Clear the error message when user starts typing again
  };
  return (
    <div className="w-full">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        pattern={pattern}
        required
        className="w-full mt-4 px-4 py-2 border-2 border-black rounded-lg bg-white text-black shadow-[4px_4px_0px_black] focus:outline-none focus:ring-2 focus:ring-black focus:translate-y-1 focus:shadow-[2px_2px_0px_black] transition-all"
        onInvalid={handleInvalid} // Trigger when input doesn't match the pattern
        onInput={handleInput} // Trigger to clear the error when the user starts typing again
      />
      <p className="text-red-500 text-sm mt-1 hidden">{errorMessage}</p>
    </div>
  );
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const formRef = useRef(null);

  useEffect(() => {
    chrome.storage.local.get(["user"], (result) => {
      if (result.user) {
        dispatch(setUser(result.user));
      }
    });
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const userData = Object.fromEntries(formData);
    dispatch(setLoading(true));

    chrome.storage.local.set({ user: userData }, () => {
      console.log("User data saved to Chrome storage");
    });

    setTimeout(() => {
      dispatch(setUser(userData));
      dispatch(setLoading(false));
    }, 1000);
  };

  return (
    <div className="container divContainer my-6 flex items-center flex-col justify-center">
      <h2 className="text-2xl font-semibold">login</h2>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="w-full md:w-[33%] flex flex-col gap-4"
      >
        <InputField
          type="text"
          name="firstName"
          placeholder="first name"
          pattern="^[A-Za-z]{2,30}$"
          errorMessage="First name should only contain letters (2-30 characters) without any spaces."
        />
        <InputField
          type="email"
          name="email"
          placeholder="email"
          pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
          errorMessage="Enter a valid email address"
        />
        <InputField
          type="password"
          name="password"
          placeholder="password"
          pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$"
          errorMessage="Password must be at least 6 characters with both letters and numbers."
        />
        <div className="flex w-full gap-5 mb-2">
          <PrimaryButton title="login" className="mt-4 flex-1" type="submit" />
          <SecondaryButton title="reset" className="mt-4 flex-1" type="reset" />
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
