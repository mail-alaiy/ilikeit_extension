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

  export default InputField;