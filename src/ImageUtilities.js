import React, { Component } from 'react';
{/* <svg width="350" height="600">
    <defs>
        <clipPath id="bounds">
            <path stroke="#000000" transform="rotate(-180 150.00000000000003,300)" d="m6.14123,594.64495l53.84179,-589.57031l179.47269,0l53.84178,589.57031l-287.15625,0l-0.00001,0z" strokeWidth="0" />
        </clipPath>
    </defs>
    <rect x="0" y="50" width="300" height="150" clipPath="url(#bounds)" fill="#394858" />
    <rect x="0" y="200" width="300" height="200" clipPath="url(#bounds)" fill="#399533" />
    <rect x="0" y="400" width="300" height="200" clipPath="url(#bounds)" fill="#949499" />
    <g>
        <title>Frame</title>
        <path stroke="#fff" id="glassFrame" d="m295.97029,2.67907l-54.91657,594.28902l-183.05526,0l-54.91656,-594.28902l292.88838,0l0.00001,0z" stroke-width="10" fill="none" />
    </g>

</svg> */}
var glassSVG = [
    ["Tumbler", "300","600",
            <defs>
                <clipPath id="bounds">
                    <path stroke="#000000" transform="rotate(-180 150.00000000000003,300)" d="m6.14123,594.64495l53.84179,-589.57031l179.47269,0l53.84178,589.57031l-287.15625,0l-0.00001,0z" strokeWidth="0" />
                </clipPath>
            </defs>
            ,
            <g>
                <title>Frame</title>
                <path stroke="#fff" id="glassFrame" d="m293.97029,2.67907l-53.79157,594.28902l-179.30526,0l-53.79156,-594.28902l286.88838,0l0.00001,0z" strokeWidth="10" fill="none" />
            </g>
    ]
];
function ShadeColor(color, percent) {
    var f = parseInt(color.slice(1), 16), t = percent < 0 ? 0 : 255, p = percent < 0 ? percent * -1 : percent, R = f >> 16, G = f >> 8 & 0x00FF, B = f & 0x0000FF;
    return "#" + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
}
function GetColorFromString(sentence){
    var hash = 0;
    var color = "#";
    for (var i = 0; i < sentence.length; i++) {
        hash = sentence.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    for (i = 0; i < 3; i++) {
        var value = (hash >> (i * 8)) & 0xFF;
        color += ('00' + value.toString(16)).substr(-2);
    }
    return ShadeColor(color,-0.50);
}

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
    //x={(props.glassWidth - (ingredient[0].length * 8)) / 2} 
    return lines;
}

function IngredientVisualizer(props) {
    var rectangles = [];
    var currentHeight = props.glassHeight;
    var nameLines = "";
    (props.ingredients).forEach(ingredient => {
        nameLines = Math.ceil((ingredient[0].split(" ")).length / 3);
        nameLines = Math.floor(nameLines / 2);
        rectangles.push(
            <g key={ingredient[0]}>
                <rect x="0" key={ingredient[0]} y={currentHeight - (ingredient[1]*100)} height={ingredient[1]*100}
                    width={props.glassWidth} clipPath="url(#bounds)" fill={GetColorFromString(ingredient[0])} />
                <text y={(currentHeight - (ingredient[1] * 57 + (15 * nameLines)))} className="small-text">{HandleIngredientName(ingredient[0], props.glassWidth)}</text>
            </g>
        )
        currentHeight = (currentHeight - (ingredient[1] * 100));
    });
    return rectangles;
}

function RenderGlass(props) {
    return (
        <div className="composition-shower">
            <h1>{props.drink.name}</h1>
            <svg width={props.width} height={props.height}>
            {props.snipsnip}
                <IngredientVisualizer ingredients={props.drink.ingredients} glassHeight={props.height} glassWidth={props.width}/>
            {props.glassFrame}
            </svg>
        </div>
    );
}

function FindGlass(props) {
    var foundCompData = -1;
    glassSVG.forEach(glass => {
        if (glass[0] === props.drink.glass) {
            foundCompData = <RenderGlass drink={props.drink} width={glass[1]} height={glass[2]} snipsnip={glass[3]} glassFrame={glass[4]} />;
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