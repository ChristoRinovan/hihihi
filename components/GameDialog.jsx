export default function GameDialog({ message }) {
  return (
    <div className="dialog-slot" aria-live="polite" aria-atomic="true" role="status">
      {message && <div key={message} className="game-dialog"><span aria-hidden="true">💬</span> {message}</div>}
    </div>
  );
}
