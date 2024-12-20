import "./Footer.css"
import AreaSelector from "../Divers/AreaSelector/AreaSelector"
import Button from "../Divers/Button";

function Footer({ViewSelectorParams, AreaSelectorParams, PlayButtonParams, armiesSelectorParams}) {

    return (
        <div className="Footer">
            <AreaSelector className="ViewBar" areaProperties={ViewSelectorParams}></AreaSelector>
            <AreaSelector className="AreaSelector" areaProperties={AreaSelectorParams}></AreaSelector>
            <AreaSelector className="ArmySelector" areaProperties={armiesSelectorParams}></AreaSelector>
            <Button className="PlayButton" buttonProperties={PlayButtonParams}></Button>
        </div>
    )
}

export default Footer;