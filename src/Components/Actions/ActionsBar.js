import './ActionsBar.css'
import Button from "../Divers/Button";
import MenuIcon from './Icons/menuIcon.webp'


const ActionsBar = ({actions, setSelectedAction}) => {
    return (
        <div className="ActionsBar">
            <Button id="menu" buttonProperties={{pathToIcon:MenuIcon, name:"Menu", onClick : () => {setSelectedAction("nav")}}}/>
            <div className="actions">{actions.map(action=>(action))}</div>
        </div>
     );
}
 
export default ActionsBar;
