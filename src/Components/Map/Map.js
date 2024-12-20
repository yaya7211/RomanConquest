import React, { useRef, useEffect, useState } from 'react';
import MapImage from "./map.jpg";

function Map({ setArmySelect, setMapSelect, areas, armies, buildings }) {
    const mapRef = useRef(null);
    const [scale, setScale] = useState({ x: 1, y: 1 });

    useEffect(() => {
        function updateScale() {
            if (mapRef.current) {
                setScale({
                    x: mapRef.current.offsetWidth / mapRef.current.naturalWidth,
                    y: mapRef.current.offsetHeight / mapRef.current.naturalHeight,
                });
            }
        }

        window.addEventListener('resize', updateScale);
        updateScale();

        return () => window.removeEventListener('resize', updateScale);
    }, []);

    const handleClick = (e, area) => {
        e.preventDefault();
        setMapSelect(area.name);
    };

    const handleClickArmy = (e, army) => {
        e.preventDefault();
        setArmySelect(army.name);
    };

    return (
        <div className="Map" style={{ position: 'relative' }}>
            <img ref={mapRef} src={MapImage} alt="Map" useMap="#mapareas" style={{ width: '100%', height: 'auto' }} />
            {areas.map((area, index) => (
                <div key={`area_${index}`}
                     className="area-overlay"
                     style={{
                         position: 'absolute',
                         left: `${(area.x - 15) * scale.x}px`,
                         top: `${(area.y - 15) * scale.y}px`,
                         width: `${30 * scale.x}px`,
                         height: `${30 * scale.y}px`,
                         borderRadius: '50%',
                         border: `2px solid ${area.isConquered ? 'red' : 'black'}`,
                         backgroundColor: `${area.isConquered ? 'rgba(255, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.4)'}`,
                         pointerEvents: 'none',
                     }}
                />
            ))}
            <map name="mapareas">
                {areas.map((area, index) => (
                    <area key={index}
                          alt={area.name}
                          shape="circle"
                          coords={`${area.x * scale.x},${area.y * scale.y},${15 * Math.max(scale.x, scale.y)}`}
                          onClick={(e) => handleClick(e, area)}
                          href="#!" />
                ))}
            </map>
            {armies.map((army, index) => (
                <div key={`army_${index}`}
                     className="army-overlay"
                     style={{
                         display:"flex",
                         justifyContent:"center",
                         alignItems:"center",
                         position: 'absolute',
                         left: `${(army.x - 15) * scale.x}px`,
                         top: `${(army.y - 15) * scale.y}px`,
                         width: `${30 * scale.x}px`,
                         height: `${30 * scale.y}px`,
                         borderRadius: '30%',
                         border: `2px solid red`,
                         backgroundColor: `rgba(255, 0, 0, 0.7)`,
                         pointerEvents: 'none',
                     }}
                >{army.name.substring(0, 3)}</div>
            ))}
            <map name="maparmies">
                {armies.map((army, index) => (
                    <area key={index}
                          alt={army.name}
                          shape="circle"
                          coords={`${army.x * scale.x},${army.y * scale.y},${15 * Math.max(scale.x, scale.y)}`}
                          onClick={(e) => handleClickArmy(e, army)}
                          href="#!" />
                ))}
            </map>
            {buildings.map((building, index) => (
                <div key={`buildings_${index}`}
                     className="buildings-overlay"
                     style={{
                         display:"flex",
                         justifyContent:"center",
                         alignItems:"center",
                         position: 'absolute',
                         left: `${(building.x - 15) * scale.x}px`,
                         top: `${(building.y - 15) * scale.y}px`,
                         width: `${30 * scale.x}px`,
                         height: `${30 * scale.y}px`,
                         borderRadius: '10%',
                         border: `2px solid yellow`,
                         backgroundColor: `rgba(255, 255, 0, 0.7)`,
                         pointerEvents: 'none',
                     }}
                >{building.name.substring(0, 3)}</div>
            ))}
            <map name="mapbuildings">
                {buildings.map((building, index) => (
                    <area key={index}
                          alt={building.name}
                          shape="circle"
                          coords={`${building.x * scale.x},${building.y * scale.y},${15 * Math.max(scale.x, scale.y)}`}
                          onClick={(e) => handleClickArmy(e, building)}
                          href="#!" />
                ))}
            </map>
        </div>
    );
}

export default Map;
