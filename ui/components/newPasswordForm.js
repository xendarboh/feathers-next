export default ({
  button = 'Submit',
  errorMessage,
  onChange,
  onSubmit,
  password,
}) => {
  return (
    <form onSubmit={onSubmit}>
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
