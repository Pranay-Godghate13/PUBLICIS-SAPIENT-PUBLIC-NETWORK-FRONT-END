import './ErrorFallback.css';
function ErrorFallback({ message }) {
  return (
    <div className="error-container">
      <p className="error-message">{message}</p>
      <button className="error-button" onClick={() => window.location.href = '/'}>
        Go Back
      </button>
    </div>
  );
}

export default ErrorFallback;
