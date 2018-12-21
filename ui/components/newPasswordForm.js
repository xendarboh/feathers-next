export default ({
  button = 'Submit',
  errorMessage,
  isProcessing = false,
  onChange,
  onSubmit,
  password,
  showCurrentPassword = false,
}) => {
  return (
    <form onSubmit={onSubmit}>
      {showCurrentPassword && (
        <div>
          <label>Current Password </label>
          <input type="password" name="currentPassword" onChange={onChange} />
        </div>
      )}
      <div>
        <label>Password </label>
        <input type="password" name="password" onChange={onChange} />
      </div>
      {/* TODO: password confirmation
      <div>
        <label>Password (again) </label>
        <input type="password" name="password2" onChange={onChange} />
      </div>
      */}
      <div>
        {isProcessing ? <span>Processing...</span> : <button>{button}</button>}
      </div>
      <small style={{ color: 'red' }}>{errorMessage}</small>
    </form>
  );
};
