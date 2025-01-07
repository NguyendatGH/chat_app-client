export const DeleteContact: React.FC = () => {
    return (
      <div>
        <h3>Are you sure you want to delete this contact?</h3>
        <button onClick={() => console.log("Confirmed")}>Confirm</button>
        <button onClick={() => console.log("Cancelled")}>Cancel</button>
      </div>
    );
  };
  