const Container = ({ children }) => {
  return (
    <div className="py-10 px-4 w-full h-full flex items-center justify-center flex-col">
      {children}
    </div>
  );
};

export default Container;
