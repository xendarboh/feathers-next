export default ({
  button = 'Submit',
  email,
  errorMessage,
  onChange,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>Email </label>
        <input type="text" name="email" onChange={onChange} />
      </div>
      <div>
        <button>{button}</button>
      </div>
      <small style={{ color: 'red' }}>{errorMessage}</small>
    </form>
  );
};
