import RessourcesBar from "./RessourcesBar";
import Button from "../Divers/Button";
import "./Ressources.css";

function RessourceArea({helpButton, selectedView, selectedCity, globalRessources, localResources}) {
    const processedLocalResources = localResources?.map(localResource => ({
        ...localResource,
        quantity: localResource?.quantityNset?.[0] ?? 0 
    })) ?? [];

    return (
        <div className="RessourceArea">
            <div id="GlobalRessources">
                <p>Global Ressources</p>
                <RessourcesBar ressources={globalRessources}></RessourcesBar>
            </div>
            <div className="Help">
                <Button buttonProperties={helpButton}/>
            </div>
            {selectedView === "City" && selectedCity && processedLocalResources.length > 0 ? (
                <div id="LocalResources">
                    <p>Local Resources in {selectedCity}</p>
                    <RessourcesBar ressources={processedLocalResources}></RessourcesBar>
                </div>
            ) : null}
        </div>
    );
}

export default RessourceArea;
