import React, { Component } from 'react';
import CocktailFile from './cocktails.json';
import './CocktailPicker.css';

// TODO: turn this into a class and add state for selected
function Cocktail(props) {
  return (
    <div className="picker-frame_item">
      {props.name}
    </div>
  )
}

// TODO: add side component that collaps categories based on this class' state
function CocktailsByGlass(props) {
  const elements = (props.glass.cocktails).map((x) =>
    <Cocktail key={x.name} name={x.name} />
  );  
  return (
    <div className={props.glass.catName}>{elements}</div>
  );
}
class ProcessList extends React.Component{
  render() {
    var glasses = [];
    (CocktailFile.categories).forEach(category => {
      glasses.push(<h2 key={category.catName}>{category.catName}</h2>);
      glasses.push(<CocktailsByGlass key={category.catName + "_list"} glass={category} />)
    });
    return(
      
      <div className="picker-frame__elements">{glasses}</div>
    );
  }
}
class App extends Component {
  render() {
    return (
      <div className="picker-frame">
        <div className="picker-frame__header">
        Cocktail Picker
        </div>
        <ProcessList />
      </div>
    );
  }
}

export default App;
