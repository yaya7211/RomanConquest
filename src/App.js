import './App.css';
import RessourceArea from './Components/Ressources/RessourceArea';
import Map from "./Components/Map/Map"
import ActionsBar from './Components/Actions/ActionsBar';
import Footer from "./Components/Footer/Footer";
import PopUp from './Components/Divers/PopUp';

import Button from './Components/Divers/Button';
import SelectList from './Components/Divers/SelectList';

import DenariiIcon from './Components/Ressources/Icons/denariiIcon.webp';
import VictualiaIcon from './Components/Ressources/Icons/victualiaIcon.webp';
import LignumIcon from './Components/Ressources/Icons/lignumIcon.webp';
import FerrumIcon from './Components/Ressources/Icons/ferrumIcon.webp';
import PetraIcon from './Components/Ressources/Icons/petraIcon.webp';
import OrdoIcon from './Components/Ressources/Icons/ordoIcon.webp'
import ManupretiumIcon from './Components/Ressources/Icons/manupretiumIcon.webp'
import JCeasarStatue from "./Components/Ressources/Icons/jCeasarStatue.jpg"
import helpIcon from "./Components/Ressources/Icons/helpIcon.webp"

import BuildIcon from './Components/Actions/Icons/buildIcon.webp'
import TroopsIcon from './Components/Actions/Icons/troopsIcon.webp'
import WarIcon from './Components/Actions/Icons/warIcon.webp'
import MovementIcon from './Components/Actions/Icons/movementIcon.webp'

import RegionIcon from "./Components/Divers/AreaSelector/Icons/regionIcon.webp"
import CityIcon from "./Components/Divers/AreaSelector/Icons/cityIcon.webp"
import ViewIcon from "./Components/Divers/AreaSelector/Icons/viewIcon.webp"
import PlayButtonIcon from "./Components/Divers/AreaSelector/Icons/playButtonIcon.webp"
import SelectIcon from "./Components/Divers/AreaSelector/Icons/selectCursorIcon.webp"
import SoldierIcon from "./Components/Divers/AreaSelector/Icons/soldierIcon.webp"

import {useState} from "react";



function App() {

  const [selectedCity, setSelectedCity] = useState("")
  let CityParam = [selectedCity, setSelectedCity]
  class City {
    constructor(name, pos, region, ressources) {
      this.name = name || ""; 
      [this.x, this.y] = pos || [-1, -1];
      this.region = region
      this.Manupretium = ressources["Manupretium"]
      this.Ordo = ressources["Ordo"]
      this.buildings = [];
      this.conquered = true
  }
  build(building) {
    this.buildings.push(building);
  }
  }
  let cities = {
    "": new City("", [-100, -100], "", {"Manupretium":{name:"Manupretium", pathToIcon:ManupretiumIcon, quantityNset:useState(2)}, //les state variables ont du ping dans les transitions entre les valeurs, et j'ai pas le temps de reprogrammer react
                                        "Ordo":{name:"Ordo", pathToIcon:OrdoIcon, quantityNset:useState(100)}}),
    "Lutetia": new City("Lutetia", [380, 252], "Lutecia", {"Manupretium":{name:"Manupretium", pathToIcon:ManupretiumIcon, quantityNset:useState(2)}, 
                                                           "Ordo":{name:"Ordo", pathToIcon:OrdoIcon, quantityNset:useState(100)}}),
    "Lugdunum": new City("Lugdunum", [480, 408], "Lugdunesis", {"Manupretium":{name:"Manupretium", pathToIcon:ManupretiumIcon, quantityNset:useState(2)}, 
                                                                "Ordo":{name:"Ordo", pathToIcon:OrdoIcon, quantityNset:useState(100)}}),
    "Burdigala": new City("Burdigala", [288, 480], "Aquitania", {"Manupretium":{name:"Manupretium", pathToIcon:ManupretiumIcon, quantityNset:useState(2)}, 
                                                                 "Ordo":{name:"Ordo", pathToIcon:OrdoIcon, quantityNset:useState(100)}}),
  }

  const [denariiQuantity, setDenariiQuantity] = useState(2000)
  const [victualiaQuantity, setVictualiaQuantity] = useState(500)
  const [lignumQuantity, setLignumQuantity] = useState(20)
  const [ferrumQuantity, setFerrumQuantity] = useState(20)
  const [petraQuantity, setPetraQuantity] = useState(20)
  console.log(cities);
    //"Barrack" : () => [cities[selectedCity].buildings.map(building => (building.type)).includes("Barrack") ? false : `${selectedCity} needs a Barrack`, () => undefined],
  let fees = {
      "Barrack": () => [true ? false : `${selectedCity} needs a Barrack`, () => undefined],
      "Coast": () => [true ? false : `${selectedRegion} needs a coast`, () => undefined],
      "Deposit": () => [regions[selectedRegion].deposit ? false : `${selectedRegion} needs a deposit`, () => undefined],
      "Rare_Deposit": () => [regions[selectedRegion].rare_deposit ? false : `${selectedRegion} needs a rare deposit`, () => undefined],
      "Ferrum": (q) => [ferrumQuantity >= q ? false : `Lacking Ferrum`, () => setFerrumQuantity(prevFerrum => prevFerrum - q)],
      "Lignum": (q) => [lignumQuantity >= q ? false : `Lacking Lignum`, () => setLignumQuantity(prevLignum => prevLignum - q)],
      "Petra": (q) => [petraQuantity >= q ? false : `Lacking Petra`, () => setPetraQuantity(prevPetra => prevPetra - q)],
      "Denarii": (q) => [denariiQuantity >= q ? false : `Lacking Denarii`, () => setDenariiQuantity(prevDenarii => prevDenarii - q)],
      "Victualia": (q) => [victualiaQuantity >= q ? false : `Lacking Victualia`, () => setVictualiaQuantity(prevVictualia => prevVictualia - q)],
      "Manupretium": (q) => [cities[selectedCity].Manupretium.quantityNset[0] >= q ? false : `Lacking Manupretium in ${selectedCity}`, () => cities[selectedCity].Manupretium.quantityNset[1](prevManupretium => prevManupretium - q)],
      "Ordo": (q) => [cities[selectedCity].Ordo.quantityNset[0] >= q ? false : `Lacking Ordo in ${selectedCity}`, () => cities[selectedCity].Ordo.quantityNset[1](prevOrdo => prevOrdo - q)]
    };
  
  let instructions = [["Welcome in Roman Conquest Simulatore\nMake sure to use your ressources to bring civilisation to those barbarians in Gallia", () => undefined],
                      ["First, take a look to the top part of the page.\nOverthere, you can see the ressources you will have to manage during your con- euuh brought of civilisation\n", () => undefined],
                      ["Now, look at the bottom left of the page, where you can switch views from Cities to Regions.\nThis will change the areas displayed in the map\nLet me switch to cities as an example", () => setView("City")],
                      ["The cities are now displayed on the central part of your screen, the Map.\nEach colored area you see it a City, that you can select by left clicking on, or in the City selector in the middle-left part of the bottom of the page.\nLet's chose Par- euuh Lutecia", () => setSelectedCity("Lutetia")],
                      ["As you can see at the right of your city selector (where you can manually select a city),\nThe selected city's name is now displayed\nPlus, of the right part of the ressources area, you can now see the local ressources of the selected City", () => undefined],
                      ["On the left of the Map,\n you can see the interactions menu\nThis menu provides you an interface of decisions.\nLet's build something to try !", () => setSelectedAction("build")],
                      ["Let's build a barrack, so we can raise our first troop\nFirst, select the city where you want to procede to the build, we will keep Lutecia", () => undefined],
                      ["Then, we have to specify the building we want, let's chose a barrack", () => setSelectedBuilding("Barrack")],
                      ["Now, YOU take the commands, and press the Build button\nFrom now on, YOU are the one in charge of this futur part of the Roman Empire\nAVE CEASAR !", () => undefined]]


  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [currentInstruction, setCurrentInstruction] = useState(0);
  const [isSequential, setIsSequential] = useState(false);
  const closePopup = () => {
    if (isSequential) {
      const nextInstructionIndex = currentInstruction + 1;
      if (nextInstructionIndex < instructions.length) {
        setPopupMessage(instructions[nextInstructionIndex][0]);
        instructions[nextInstructionIndex][1]();  // Execute the function associated with the next instruction
        setCurrentInstruction(nextInstructionIndex);
        setShowPopup(true);  // Continue showing popups in sequence
      } else {
        setShowPopup(false);  // No more instructions in the sequence
        setIsSequential(false);  // Turn off sequential logic
      }
    } else {
      setShowPopup(false);  // Always hide the popup if not in sequential mode
    }
  };
  
                  

  const helpButton = {
    name: "Help",
    pathToIcon: helpIcon,
    onClick: () => {
      setIsSequential(true)
      setCurrentInstruction(0)
      setPopupMessage(instructions[0][0])
      setShowPopup(true)
    }
  }
  

  let [buildings, updateBuildings] = useState([])
  const [selectedBuilding, setSelectedBuilding] = useState("")
  let newBuilding = undefined

  const build = () => {
    if (selectedBuilding) {
      let allResourcesAvailable = true;
      for (let cost of Object.keys(costs[selectedBuilding])) {
        let [check, _] = fees[cost](costs[selectedBuilding][cost]);
        if (check) {
          setPopupMessage(`${check} to build ${selectedBuilding}`);
          setShowPopup(true);
          allResourcesAvailable = false;
          break;
        }
      }
  
      if (allResourcesAvailable) {
        Object.keys(costs[selectedBuilding]).forEach(cost => {
          let [_, fee] = fees[cost](costs[selectedBuilding][cost]);
          fee();
        });
  
        let newBuilding = new summonEntity[selectedBuilding]({
          name: `${buildings.length + 1} ${selectedBuilding} ${selectedView === "City" ? cities[selectedCity].name : selectedRegion}`,
          region: selectedView === "Region" ? selectedRegion : cities[selectedCity].region,
          city: selectedView === "City" ? selectedCity : undefined
        });
  
        updateBuildings(prevBuildings => [...prevBuildings, newBuilding]);
        cities[selectedCity].build(newBuilding);
      }
    } else {
      setPopupMessage(`Unable to manage uncontrolled area ${selectedView === "Region" ? selectedRegion : selectedCity}`);
      setShowPopup(true);
    }
  };
  
  
  

  class Troop {
    constructor({name, health, moral, power, resistance, speed, region}) {
        this.name = name;
        this.health = health;
        this.moral = moral;
        this.power = power;
        this.resistance = resistance;
        this.speed = speed;
        this.region = region
        this.x = this.computeCoordinates(regions[this.region].x)
        this.y = this.computeCoordinates(regions[this.region].y)
    }
    computeCoordinates(x) {
      return x + Math.floor(Math.random() * 61) - 30
    }
  }
  class Hasaiti extends Troop {
      constructor({name, region}) {
          super({name: name, health: 10, moral: 5, power: 4, resistance: 0, speed: 1, region: region});
          this.type = "Hasaiti"
          this.maintain = {"Victualia" : 50, "Denarii" : 100}
        }
  }
  class Legion extends Troop {
      constructor({name, region}) {
          super({name: name, health: 10, moral: 10, power: 4, resistance: 2, speed: 1, region: region});
          this.type = "Legion"
          this.maintain = {"Victualia" : 60, "Denarii" : 120}
        }
  }
  class Aux_Cavalery extends Troop {
      constructor({name, region}) {
          super({name: name, health: 15, moral: 5, power: 3, resistance: 0, speed: 2, region: region});
          this.type = "Auxilary Cavalery"
          this.maintain = {"Victualia" : 60, "Denarii" : 120}
        }
  }
  class Equites extends Troop {
      constructor({name, region}) {
          super({name: name, health: 15, moral: 10, power: 5, resistance: 1, speed: 2, region: region});
          this.type = "Equites"
          this.maintain = {"Victualia" : 80, "Denarii" : 160}
        }
  }
  class Building {
    constructor({name, region, city}) {
      this.name = name
      this.region = region
      this.x = this.computeCoordinates(regions[this.region].x)
      this.y = this.computeCoordinates(regions[this.region].y)
      this.city = city || undefined
    }
    maintenance() {
      return true
    }
  computeCoordinates(x) {
    return x + Math.floor(Math.random() * 101) - 50
  }
  }
  class Farm extends Building {
    constructor({name, region}) {
      super({name: name, region: region});
      this.type = "Farm";
    }
    production() {
      setVictualiaQuantity(prevVictualia => prevVictualia + 100);
    }
  } 
  class Fishery extends Building {
    constructor({name, region}) {
      super({name: name, region: region});
      this.type = "Fishery";
    }
    production() {
      setVictualiaQuantity(prevVictualia => prevVictualia + 50);
    }
  }
  class Lumberjack_Camp extends Building {
    constructor({name, region}) {
      console.log("region", region)
      super({name: name, region: region});
      this.type = "Lumberjack camp";
    }
    production() {
      setLignumQuantity(prevLignum => prevLignum + 10);
    }
  }  
  class Iron_Mine extends Building {
    constructor({name, region}) {
      super({name: name, region: region});
      this.type = "Iron Mine";
    }
    production() {
      setFerrumQuantity(prevFerrum => prevFerrum + 10);
    }
  }
  class Gold_Mine extends Building {
    constructor({name, region}) {
      super({name: name, region: region});
      this.type = "Gold Mine";
    }
    production() {
      setDenariiQuantity(prevDenarii => prevDenarii + 1000);
    }
  }
  class Quarry extends Building {
    constructor({name, region}) {
      super({name: name, region: region});
      this.type = "Quarry";
    }
    production() {
      setPetraQuantity(prevPetra => prevPetra + 10);
    }
  }
  class Forum extends Building {
    constructor({name, region, city}) {
      super({name: name, region: region, city: city});
      this.type = "Forum";
    }
    production() {
      setDenariiQuantity(prevDenarii => prevDenarii + cities[this.city].Manupretium.quantityNset[0] * 100);
    }
    maintenance() {
      return cities[this.city].Ordo.quantityNset[0] >= 70;
    }
  } 
  class Bath extends Building {
    constructor({name, region, city}) {
      super({name: name, region: region, city: city});
      this.type = "Bath";
    }
    production() {
      cities[this.city].Ordo.quantityNset[1](prevOrdo => prevOrdo + 10);
    }
  }
  class Aqueduc extends Building {
    constructor({name, region, city}) {
      super({name: name, region: region, city: city});
      this.type = "Aqueduc";
    }
    production() {
      cities[this.city].Ordo.quantityNset[1](prevOrdo => prevOrdo + 20);
    }
  }  
  class Amphetheatre extends Building {
    constructor({name, region, city}) {
      super({name: name, region: region, city: city});
      this.type = "Ampheteatre";
    }
    production() {
      cities[this.city].Ordo.quantityNset[1](prevOrdo => prevOrdo + 10);
    }
  }
  class Temple extends Building {
    constructor({name, region, city}) {
      super({name: name, region: region, city: city});
      this.type = "Temple";
    }
    production() {
      cities[this.city].Ordo.quantityNset[1](prevOrdo => prevOrdo + 10);
    }
  }
  class Barrack extends Building {
    constructor({name, region, city}) {
      super({name: name, region: region, city: city});
      this.type = "Barrack";
    }
    maintenance() {
      return cities[this.city].Ordo.quantityNset[0] > 50;
    }
  }
  class Stable extends Building {
    constructor({name, region, city}) {
      super({name: name, region: region, city: city});
      this.type = "Stable";
    }
    maintenance() {
      return cities[this.city].Ordo.quantityNset[0] > 50;
    }
  }
  


  const costs = {
    "": {},
    "Hasaiti": {
      "Barrack": undefined,
      "Manupretium": 1,
      "Ferrum": 2
    },
    "Legions": {
      "Barrack": undefined,
      "Manupretium": 1,
      "Lignum": 10,
      "Ferrum": 1,
      "Petra": 1,
      "Denarii": 100,
    },
    "Auxiliary Cavalery": {
      "Barrack": undefined,
      "Manupretium": 1,
      "Ferrum": 4
    },
    "Equites": {
      "Barrack": undefined,
      "Manupretium": 1,
      "Ferrum": 14
    },
    "Farm": {
      "Lignum": 10,
      "Ferrum": 1,
      "Petra": 1,
      "Denarii": 100,
    },
    "Fishery": {
      "Lignum": 5,
      "Ferrum": 50,
    },
    "Lumberjack camp": {
      "Denarii": 200,
    },
    "Iron Mine": {
      "Lignum": 10,
      "Denarii": 500,
    },
    "Gold Mine": {
      "Lignum": 10,
      "Denarii": 500,
      "Ferrum": 2,
    },
    "Quarry": {
      "Lignum": 10,
      "Denarii": 500,
      "Ferrum": 2
    },
    "Forum": {
      "Petra": 20,
      "Denarii": 500
    },
    "Bath": {
      "Petra": 10,
      "Denarii": 500
    },
    "Aqueduc": {
      "Petra": 30,
      "Denarii": 1500
    },
    "Ampheteatre": {
      "Petra": 20,
      "Denarii": 1000
    },
    "Temple": {
      "Petra": 20,
      "Denarii": 1000
    },
    "Barrack": {
      "Petra": 5,
      "Denarii": 1000,
      "Lignum": 20,
    },
    "Stable": {
      "Petra": 5,
      "Denarii": 1000,
      "Lignum": 20,
    }
  };

  const summonEntity = {
    "Hasaiti": Hasaiti,
    "Legions": Legion,
    "Auxiliary Cavalery": Aux_Cavalery,
    "Equites": Equites,
    "Farm": Farm,
    "Fishery": Fishery,
    "Lumberjack camp": Lumberjack_Camp,
    "Iron Mine": Iron_Mine,
    "Gold Mine" : Gold_Mine,
    "Quarry" : Quarry,
    "Forum" : Forum,
    "Bath" : Bath,
    "Aqueduc" : Aqueduc,
    "Ampheteatre" : Amphetheatre,
    "Temple" : Temple,
    "Barrack" : Barrack,
    "Stable" : Stable
  };
  
  

  let [armies, updateArmies] = useState([])
  const [selectedTroopToRaise, setSelectedTroopToRaise] = useState("")
  let newTropp = undefined
  const raiseTroops = ({city, troopToTrain}) => {
    setSelectedCity(city || selectedCity)
    setSelectedTroopToRaise(troopToTrain || selectedTroopToRaise)
    if (true && selectedTroopToRaise) { //selectedCity.conquered
      let allResourcesAvailable = true;
      for (let cost of Object.keys(costs[selectedTroopToRaise])) {
        let [check, _] = fees[cost](costs[selectedTroopToRaise][cost])
        if (check) { 
          setPopupMessage(`${check} to raise troop ${selectedTroopToRaise}`);
          setShowPopup(true);
          allResourcesAvailable = false;
          break;
        }
        }

      if (allResourcesAvailable) {
        Object.keys(costs[selectedTroopToRaise]).forEach(cost => {
          let [_, fee] = fees[cost](costs[selectedTroopToRaise][cost]) 
          fee()
        });
        let newTroop = new summonEntity[selectedTroopToRaise]({name:`${armies.length + 1} ${selectedTroopToRaise} ${selectedCity}'s`, region:cities[selectedCity].region});
        updateArmies([...armies, newTroop]);
        }
    } else {
      setPopupMessage(`Unable to manage uncontroled city ${selectedCity}`);
      setShowPopup(true);
    }
  }
  


  let globalRessources = [
    {name: "Denarii", pathToIcon: DenariiIcon, quantity: denariiQuantity, change: setDenariiQuantity},
    {name: "Victualia", pathToIcon: VictualiaIcon, quantity: victualiaQuantity, change: setVictualiaQuantity},
    {name: "Lignum", pathToIcon: LignumIcon, quantity: lignumQuantity, change: setLignumQuantity},
    {name: "Ferrum", pathToIcon: FerrumIcon, quantity: ferrumQuantity, change: setFerrumQuantity},
    {name: "Petra", pathToIcon: PetraIcon, quantity: petraQuantity, change: setPetraQuantity}]



  const [selectedRegion, setSelectedRegion] = useState("")
  
  let RegionParam = [selectedRegion, setSelectedRegion]

  class Region {
    constructor(name, pos, buildable) {
        this.name = name || "";
        [this.x, this.y] = pos || [-1, -1];
        this.buildable = buildable; 
        this.buildings = [];
        this.conquered = true
    }

    build(building) {
      this.buildings.push(building);
    }
  }

  let regions = {
    "": new Region("", [-100, -100], true), 
    "Armorica": new Region("Armorica", [207, 282], false),
    "Lutecia": new Region("Lutecia", [328, 251], false),
    "Silva Carbonaria": new Region("Silva Carbonaria", [407, 151], false),
    "Germania Inferior": new Region("Germania Inferior", [536, 114], true),
    "Senonia": new Region("Senonia", [454, 254], true),
    "Arduenna Silva": new Region("Arduenna Silva", [542, 208], true),
    "Maxima Sequanorum": new Region("Maxima Sequanorum", [577, 296], true),
    "Silva Nigra": new Region("Silva Nigra", [661, 228], true),
    "Pictavis": new Region("Pictavis", [311, 377], false),
    "Gergovia": new Region("Gergovia", [402, 416], true),
    "Lugdunesis": new Region("Lugdunesis", [510, 398], true),
    "Helvetia": new Region("Helvetia", [632, 344], true),
    "Insubria": new Region("Insubria", [650, 407], true),
    "Aquitania": new Region("Aquitania", [286, 504], false),
    "Narbonesis": new Region("Narbonesis", [393, 527], false),
    "Transalpina": new Region("Transalpina", [513, 515], false),
    "Liguria": new Region("Liguria", [611, 482], false)
  };
  

  const [selectedView, setView] = useState("")
  let ViewsParam = [selectedView, setView]

  const handleArmies = () => {
    let cacheArmies = []
    for (let army of armies) {
      let enough = true
      for ( let ressource of Object.keys(army.maintain) ){
        let [check, _] = fees[ressource](army.maintain[ressource])
        if (check) {
          enough = false
          break;
        }
        if (enough) {
          let [_, fee] = fees[ressource](army.maintain[ressource])
          fee()
          cacheArmies.push(army)
        } else {
          setPopupMessage("Unpaid army revolted and is no longer under your controle")
          showPopup(true)
        }
    }}
    updateArmies(cacheArmies)
  }

  const handleBuildings = () => {
    updateBuildings(buildings.filter(building => building.maintenance()))
    for (let building of buildings) {
      building.production()
    }
  }

  const [currentTurn, setTurn] = useState(1)
  const passTurn = () => {
    handleArmies()
    handleBuildings()
    setTurn(currentTurn+1)}

  const [selectedArmy, setSelectedArmy] = useState()
  let ArmiesParams = [selectedArmy, setSelectedArmy]

  let AreaParam = { "": {name:"", listValues: [], 
                         params: [null, ()=>(0)], buttonIcon:SelectIcon, coordinates: [{name:"",x:-10, y:-10}]},
                    undefined: {name:"", listValues: [], 
                         params: [null, ()=>(0)], buttonIcon:SelectIcon, coordinates: [{name:"",x:-10, y:-10}]},
                    "Region": { name:"Region", listValues: Object.values(regions).map(region => region.name),
                                params: RegionParam, buttonIcon:RegionIcon, coordinates: Object.values(regions)},
                    "City": { name:"City", listValues: Object.values(cities).map(city => city.name),
                              params: CityParam, buttonIcon:CityIcon, coordinates: Object.values(cities)}}

  let ViewBarParam = { name:"View", listValues: Object.keys(AreaParam).map(areaP => AreaParam[areaP].name),
                      params: ViewsParam, buttonIcon:ViewIcon}
  
  let ArmiesParam = {name: "Armies", listValues: armies.map(army => army.name),
                     params: ArmiesParams, buttonIcon:SoldierIcon}

  let PlayButtonParams = {name:`${currentTurn} : Next Turn`, 
                          pathToIcon:PlayButtonIcon,
                          onClick:passTurn}

  const [selectedAction, setSelectedAction] = useState("nav")

  const actionBarComponents = {
    "nav":[
      <Button buttonProperties={{name: "Build", 
                                 pathToIcon: BuildIcon, 
                                 onClick:() => (setSelectedAction("build"))}}/>, 
      <Button buttonProperties={{name: "Troop raising", 
                                 pathToIcon: TroopsIcon, 
                                 onClick:() => (setSelectedAction("troops"))}}/>,
      <Button buttonProperties={{name: "War", 
                                 pathToIcon: WarIcon, 
                                 onClick:() => {
                                    setPopupMessage(`Devs are still working on this one, try it later`);
                                    setShowPopup(true);
                                  }}}/>, //setSelectedAction("war")
      <Button buttonProperties={{name: "Movement",
                                 pathToIcon: MovementIcon, 
                                 onClick:() => {
                                  setPopupMessage(`Devs are still working on this one, try it later`);
                                  setShowPopup(true);
                                }}}/>, //setSelectedAction("move")
    ],
    "build": [
      <SelectList selectProperties={{name:"Building", 
                                     options: selectedView == "Region" && regions[selectedRegion].buildable ? ["Farm", "Fishery", "Lumberjack camp", "Iron Mine", "Gold Mine", "Quarry"] : selectedView == "City" ? ["Forum", "Bath", "Aqueduc", "Ampheteatre", "Temple", "Barrack", "Stable"] : [], //my 2k 36' screen is not enough to display the whole line, i should consider dropping from university
                                     setState:setSelectedBuilding}} />,
      <div style={{display: "flex", justifyContent: "space-between",alignItems: "center"}}><h4>Location : </h4>{selectedView == "Region" ? selectedRegion : selectedCity}</div>,
      <Button buttonProperties={{name: "Build", 
                                 pathToIcon: BuildIcon, 
                                 onClick:() => (build())}}/>
    ],
    "troops": [
      <SelectList selectProperties={{name:"Troop raising", 
                                     options: selectedView == "City" ? ["Hasaiti", "Legions", "Auxiliary Cavalery", "Equites"] : [], 
                                     setState:setSelectedTroopToRaise}} />,
      <div style={{display: "flex", justifyContent: "space-between",alignItems: "center"}}><h4>Location : </h4> {selectedCity} </div>, 
      <Button buttonProperties={{name: "Raise troops", 
                                 pathToIcon: BuildIcon, 
                                 onClick:() => (raiseTroops({city:"", troopToTrain:""}))}}/>
    ]
  }



  return (
    <div className="App">
      {showPopup && 
      <PopUp 
        message={popupMessage}
        onClose={closePopup} />}
      <RessourceArea 
        selectedCity={selectedCity} 
        selectedView={selectedView} 
        globalRessources={globalRessources} 
        helpButton={helpButton}
        localResources={[cities[selectedCity]["Manupretium"], cities[selectedCity]["Ordo"]]}/>
    <main>
      <Map
          setArmySelect={setSelectedArmy}
          armies={armies}
          buildings={buildings}
          setMapSelect={AreaParam[selectedView].params[1]} 
          areas={AreaParam[selectedView].coordinates}/>
      <ActionsBar
          setSelectedAction={setSelectedAction}
          actions={actionBarComponents[selectedAction]}/>
    </main>
      <Footer  
        ViewSelectorParams={ViewBarParam} 
        AreaSelectorParams={AreaParam[selectedView]}
        armiesSelectorParams={ArmiesParam}
        PlayButtonParams={PlayButtonParams}/>
    </div>
  );
}

export default App;
