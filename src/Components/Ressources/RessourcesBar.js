import RessourcesCell from "./RessourcesCell";
import "./Ressources.css"

function RessourcesBar({ressources}) {
    return (
        <div className="RessourcesBar">
            {ressources.map(ressource => (
                <RessourcesCell key={ressource.name} ressourceData={ressource}></RessourcesCell>
            ))}
        </div>
    )
}

export default RessourcesBar;