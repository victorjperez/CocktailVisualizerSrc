import React from 'react';
import { GetColorFromString } from './ColorFunctions'

function ProcessIngredients(props) {
    var display = [];
    var lineBuild;

    display.push(<p className="recipe-frame__warning">* Visual representation, may not be exact</p>);
    (props.ingredients).forEach(ingredient => {
        lineBuild = (
        <div className="recipe-frame__ingredient" key={ingredient[0]}> 
            <svg height="40" width="40">
                <circle cx="20" cy="20" r="20" fill={GetColorFromString(ingredient[0])} />
            </svg>
            <p>{ingredient[1]} parts {ingredient[0]}</p>   
        </div>
        );
        display.push(lineBuild);
    });

    return display.reverse();
}
class Recipe extends React.Component {
    render() {
        return (
            <div className="recipe-frame">
                <h1>{this.props.drink.name}</h1>
                <ProcessIngredients ingredients={this.props.drink.ingredients} />
            </div>
        );
    }

}

export default Recipe; 