import React, { Component } from 'react';
import CocktailFile from './cocktails.json';
import './CocktailPicker.css';
import martiniGlass from './assets/martini-glass.svg';
import shotGlass from './assets/shot-glass.svg';
import tumblerGlass from './assets/tumbler-glass.svg';
var images = [martiniGlass, shotGlass, tumblerGlass];

function Drink(props) {
  return (
    <div className="picker-frame__listItem">
      {props.name}
    </div>
  )
}
function DrinkList(props) {
  const elements = (props.drinks).map((x) =>
    <Drink key={x.name} name={x.name} />
  );
  return(
    <div className="picker-frame__list" > { elements }</div>
  );
}
class CategoryHeader extends React.Component {
  render() {
    return (
      <div className={"picker-frame__categoryPlate picker-frame__categoryPlate--" + this.props.categoryName}>
        <img src={getGlassImage(this.props.categoryName)} alt="" />
        {this.props.categoryName}
      </div>

    );
  }

}
class GlassCategory extends React.Component {
  render() {
    return (
      <div className="picker-frame__category">
        <CategoryHeader categoryName={this.props.categoryName} />
        <DrinkList drinks={this.props.drinks} categoryName={this.props.categoryName} />
      </div>
    );
  };
}

class PickerFrame extends React.Component {
  render() {
    var renderedCategories = [];
    (this.props.drinkData).forEach(category => {
      renderedCategories.push(<GlassCategory key={category[0].glass} categoryName={category[0].glass} drinks={category} />);
    });
    return (
      <div className="picker-frame">
        <div className="picker-frame__header">Cocktail Picker </div>
        {renderedCategories}
      </div>

    );
  }
}

function loadData() {
  var processedData = [];
  for (var i = 0; i < (CocktailFile.categories).length; i++) {
    var drinks = [];
    ((CocktailFile.categories[i]).cocktails).forEach(drink => {
      drinks.push(drink);
    });
    processedData.push(drinks);
  }
  return processedData;
}

function getGlassImage(glassName) {
  for (var i = 0; i < images.length; i++) {
    if (images[i].indexOf(glassName.toLowerCase()) !== -1)
      return images[i];
  }
  return -1;
}

class App extends Component {
  render() {
    return <PickerFrame drinkData={loadData()} />;
  }
}

export default App;
