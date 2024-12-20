import Button from "../Button"
import SelectList from "../SelectList"
import { useState } from "react";
import "./AreaSelector.css"

function AreaSelector({areaProperties}) {

    const [selectedListArea, setSelectedListArea] = useState("")

    let selectList = {name:areaProperties.name,
                      options: areaProperties.listValues,
                      setState: setSelectedListArea}
    
    let buttonProperties = {name:`Change ${areaProperties.name}`,
                            onClick:areaProperties.params[1],
                            params:selectedListArea,
                            pathToIcon:areaProperties.buttonIcon}

    return (
        <div className="AreaSelector">
            <SelectList className="SelectArea" selectProperties={selectList}></SelectList>
            <Button className="ChangeArea" buttonProperties={buttonProperties}></Button>
            <p>{areaProperties.params[0]}</p>
        </div>
    )
}

export default AreaSelector;