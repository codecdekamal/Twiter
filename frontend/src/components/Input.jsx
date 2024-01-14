const Input = ({type,name,onChange,message}) => {
  return (
    <>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={name}
        className={`font-medium enabled:hover:border-gray-400 disabled:opacity-75 outline-0 rounded-xl mb-2 p-3 flex justify-center text-center border border-gray-200 ${message?"bg-red-500":""}`}
        autoComplete="off"
        onChange={onChange}
      />
    </>
  );
};

export default Input;
