import React from 'react';
import { GetColorFromString } from './ColorFunctions'

var glassSVG = [
    ["Tumbler", "5.5","300","600",
            <defs>
                <clipPath id="bounds">
                    <path transform="rotate(-180 150.00000000000003,300)" d="m6.14123,594.64495l53.84179,-589.57031l179.47269,0l53.84178,589.57031l-287.15625,0l-0.00001,0z" strokeWidth="0" />
                </clipPath>
            </defs>
            ,
            <g>
                <title>Frame</title>
                <path stroke="#fff" id="glassFrame" d="m293.97029,2.67907l-53.79157,594.28902l-179.30526,0l-53.79156,-594.28902l286.88838,0l0.00001,0z" strokeWidth="10" fill="none" />
            </g>
    ],
    ["Shot", "1.5","300", "300",
        <defs>
            <clipPath id="bounds">
                <path transform="rotate(179.93980407714844 151.83953857421875,150.02839660644534) " d="m11.586,291.40045l52.59509,-282.7441l175.31696,0l52.59506,282.7441l-280.5071,0z" strokeWidth="0" />
            </clipPath>
        </defs>
        ,
        <g>
            <title>Frame</title>
            <path stroke="#fff" transform="rotate(179.93980407714844 150.3798828125,149.98588562011716) " d="m6.19236,294.73707l54.07032,-289.50238l180.2344,0l54.0703,289.50238l-288.37501,0z" strokeWidth="10" fill="none" />
        </g>
    ],
    ["Martini", "3.5", "400", "600",
        <defs>
            <clipPath id="bounds">
                <path d="m19.04186,288.54537l181.2104,-278.43752l181.2104,278.43752l-362.42079,0z" transform="rotate(-180 200.25225830078125,149.32659912109375) " />            </clipPath>
        </defs>
        ,
        <g>
            <title>Frame</title>
            <line stroke="#fff" fill="none" strokeWidth="10" x1="182.43752" y1="267.65625" x2="182.43752" y2="569.24905"  />
            <path stroke="#fff" fill="none" strokeWidth="10" d="m10.49959,293.75633l189.50064,-288.425l189.50064,288.425l-379.00128,0l-0.00001,0z"  transform="rotate(180 200.00022888183594,149.54383850097656) " />
            <line stroke="#fff" fill="none" strokeWidth="10" x1="218.34375" y1="264.92625" x2="218.34375" y2="569.40187"  />
            <path stroke="#fff" fill="none" strokeWidth="10" d="m47.54474,592.5962l152.64842,-24.1875l152.64842,24.1875l-305.29688,0l0.00003,0z" />
        </g>
    ],
    ["Highball", "8", "350", "500",
        <defs>
            <clipPath id="bounds">
                <path transform="rotate(-180 174.7562408447266,250.32244873046875) " d="m10.31873,491.07244l61.66407,-481.50001l205.5469,0l61.66404,481.50001l-328.87501,0z" />
            </clipPath>
        </defs>
        ,
        <g>
            <title>Frame</title>
            <path stroke="#fff" transform="rotate(-180 174.92889404296878,249.73001098632812) " fill-opacity="0.09" d="m5.65277,494.48001l63.47855,-489.5l211.59518,0l63.47853,489.5l-338.55227,0z" strokeWidth="10" fill="none" />
        </g>
    ],
];

function HandleIngredientName(name, glassWidth){
    var nameArray = name.split(" ");
    var lines = [];
    var formedString = "";

    for (var i = 0; i < nameArray.length;i++){
        if (i%3 === 0) {
            lines.push(<tspan key={formedString} x={(glassWidth/2 - (formedString.length * 3))} dy="1.4em">{formedString}</tspan>);
            formedString = "";
        }
        formedString += ( nameArray[i] + " ");
    }
    if (formedString.length !== 0){
        lines.push(<tspan key={formedString} x={(glassWidth/2 - (formedString.length * 3))} dy="1.4em">{formedString}</tspan>);
    }

    return lines;
}

function IngredientVisualizer(props) {
    var rectangles = [];
    var currentHeight = props.glassHeight;
    var nameLines = "";
    var scale = (props.glassHeight/props.glassCapacity);
    
    (props.ingredients).forEach(ingredient => {
        nameLines = Math.ceil((ingredient[0].split(" ")).length / 3);
        nameLines = Math.floor(nameLines / 2);
        rectangles.push(
            <g key={ingredient[0]}>
                <rect x="0" key={ingredient[0]} y={currentHeight - (ingredient[1] * scale)} height={ingredient[1] * scale}
                    width={props.glassWidth} clipPath="url(#bounds)" fill={GetColorFromString(ingredient[0])} />
                <text y={(currentHeight - (scale*ingredient[1])/2)-15} className="small-text">{HandleIngredientName(ingredient[0], props.glassWidth)}</text>
            </g>
        )
        currentHeight = (currentHeight - (ingredient[1] * scale));
    });
    return rectangles;
}

function RenderGlass(props) {
    var trueHeight;
    if (props.drink.glass === "Martini") 
        trueHeight = 275;
    else 
        trueHeight = props.height;
    
    return (
        <div className="glass-ingredient-view">
            <svg width={props.width} height={props.height}>
            {props.snipsnip}
                <IngredientVisualizer ingredients={props.drink.ingredients} glassCapacity={props.capacity} glassHeight={trueHeight} glassWidth={props.width}/>
            {props.glassFrame}
            </svg>
        </div>
    );
}

function FindGlass(props) {
    var foundCompData = -1;
    glassSVG.forEach(glass => {
        if (glass[0] === props.drink.glass) {
            foundCompData = <RenderGlass drink={props.drink} capacity={glass[1]} width={glass[2]} height={glass[3]} snipsnip={glass[4]} glassFrame={glass[5]} />;
            return;
        }
    });
    return foundCompData;
}

class CocktailVisualizer extends React.Component {
    render() {
        return (
            <FindGlass drink={this.props.drink} />
        );
    }
    
}

export default CocktailVisualizer; 