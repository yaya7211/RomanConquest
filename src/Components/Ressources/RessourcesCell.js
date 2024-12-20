import "./Ressources.css"

function RessourcesCell({ressourceData}) {
    return (
        <div className="RessourcesCell">
            <img src={ressourceData.pathToIcon} alt={ressourceData.name}/> {ressourceData.quantity}
        </div>
    )
}

export default RessourcesCell;