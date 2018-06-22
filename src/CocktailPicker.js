import React, { Component } from 'react';

import CocktailVisualizer from './ImageUtilities';
import Recipe from './RecipeUtilities';
import InfoBanner from './Info';

import CocktailFile from './cocktails.json';
import './CocktailPicker.css';

import add from './assets/add.svg';
import multiply from './assets/multiply.svg';
import martiniGlass from './assets/martini-glass.svg';
import shotGlass from './assets/shot-glass.svg';
import tumblerGlass from './assets/tumbler-glass.svg';
import highballGlass from './assets/highball-glass.svg';

var images = [martiniGlass, shotGlass, tumblerGlass, highballGlass];

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

class Drink extends React.Component {
  constructor(props) {
    super(props);
    this.handleDrinkChange = this.handleDrinkChange.bind(this);
  }

  handleDrinkChange(e) {
    this.props.onDrinkUpdate(this.props.drinkData);
  }

  render() {
    var bemClassName = "picker-frame__list-item"
    if (this.props.name === this.props.selectedDrinkName)
      bemClassName += " picker-frame__list-item--selected"

    return (<div className={bemClassName} onClick={this.handleDrinkChange} >
      {this.props.name}
    </div>);

  }
}

function DrinkList(props) {
  const elements = (props.drinks).map((x) =>
    <Drink key={x.name} name={x.name} drinkData={x} onDrinkUpdate={props.onDrinkUpdate} selectedDrinkName={props.selectedDrinkName}/>
  );
  if (props.visibile) {
    return (
      <div className="picker-frame__list" > {elements}</div>
    );
  }
  return null;
}

function AccordianIcon(props) {
  var accordionIconVals = [];
  if (props.visible) {
    accordionIconVals[0] = multiply;
    accordionIconVals[1] = "collapse";
  } else {
    accordionIconVals[0] = add;
    accordionIconVals[1] = "expand";
  }
  return <img className="picker-frame__accordian-icon" src={accordionIconVals[0]} alt={accordionIconVals[1]} />
}

class CategoryHeader extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    this.props.onVisibilityToggle();
  }
  render() {
    var bemClassName = "picker-frame__category-plate picker-frame__category-plate";//--" + this.props.categoryName;
    return (
      <div onClick={this.handleClick} className={bemClassName}>
        <img className="picker-frame__glass-icon" src={getGlassImage(this.props.categoryName)} alt="" />
        {this.props.categoryName}
        <AccordianIcon visible={this.props.visible} />
      </div>
    );
  }
}

class GlassCategory extends React.Component {
  constructor(props) {
    super(props);
    this.toggleVisible = this.toggleVisible.bind(this);
    this.state = { visibile: true };
  }

  toggleVisible() {
    this.setState({ visibile: (!this.state.visibile) });
  }

  render() {
    return (
      <div className="picker-frame__category">
        <CategoryHeader visible={this.state.visibile} onVisibilityToggle={this.toggleVisible} categoryName={this.props.categoryName} />
        <DrinkList visibile={this.state.visibile} drinks={this.props.drinks} categoryName={this.props.categoryName} onDrinkUpdate={this.props.onDrinkUpdate} selectedDrinkName={this.props.selectedDrinkName}/>
      </div>
    );
  };
}

class PickerFrame extends React.Component {
  render() {
    var renderedCategories = [];
    (this.props.drinkData).forEach(category => {
      renderedCategories.push(<GlassCategory key={category[0].glass} categoryName={category[0].glass} drinks={category} onDrinkUpdate={this.props.onDrinkUpdate} selectedDrinkName={this.props.selectedDrinkName}/>);
    });
    return (
      <div className="picker-frame">
        <div className="picker-frame__header">Cocktails</div>
        <div className="picker-frame__inner">{renderedCategories}</div>
        <div className="picker-frame__footer" />
      </div>
    );
  }
}

class PageElements extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "name": "Grey Goose Le Citron Asian Mary",
      "glass": "Tumbler",
      "ingredients": [
        ["Sake", 1],
        ["Grey Goose Le Citron Flavored Vodka", 1.5],
        ["Asian Mary Mix", 3]]
    };
    this.selectDrink = this.selectDrink.bind(this);
  }
  
  selectDrink(passedDrink) {
    this.setState(passedDrink);
  }

  render() {
    console.log(this.state.name);
    return (
      <React.Fragment>
        <InfoBanner />
        <PickerFrame drinkData = { loadData() } onDrinkUpdate = { this.selectDrink } selectedDrinkName = { this.state.name } />
        <div className="main-viewer">
          <CocktailVisualizer drink={this.state} />
          <Recipe drink={this.state} />
        </div>
      </React.Fragment>
    );
  }
}

class App extends Component {
  render() {
    return <PageElements />;
  }
}

export default App;
