import "./PopUp.css"

function PopUp({ message, onClose}) {
    return (
        <div className="popUp">
            <h3>Ceaser said</h3>
            <p>{message}</p>
            <button onClick={onClose}>Close</button>
        </div>
    );
}

export default PopUp;
