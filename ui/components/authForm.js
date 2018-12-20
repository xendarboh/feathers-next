export default ({
  button,
  email,
  errorMessage,
  onChange,
  onSubmit,
  password,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>Email </label>
        <input type="text" name="email" onChange={onChange} />
      </div>
      <div>
        <label>Password </label>
        <input type="password" name="password" onChange={onChange} />
      </div>
      <div>
        <button>{button}</button>
      </div>
      <small style={{ color: 'red' }}>{errorMessage}</small>
    </form>
  );
};
