import React, { Component } from 'react';
import CocktailFile from './cocktails.json';
import './CocktailPicker.css';
import martiniGlass from './assets/martini-glass.svg';
import shotGlass from './assets/shot-glass.svg';
import tumblerGlass from './assets/tumbler-glass.svg';
import add from './assets/add.svg';
import multiply from './assets/multiply.svg';
var images = [martiniGlass, shotGlass, tumblerGlass];

function Drink(props) {
  return (
    <div className="picker-frame__list-item">
      {props.name}
    </div>
  )
}

function DrinkList(props) {
  const elements = (props.drinks).map((x) =>
    <Drink key={x.name} name={x.name} />
  );
  if (props.visibile) {
    return (
      <div className="picker-frame__list" > {elements}</div>
    );
  }
  return null;
}
function AccordianIcon(props){
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
    var bemClassName = "picker-frame__category-plate picker-frame__category-plate--" + this.props.categoryName;

    return (
      <div onClick={this.handleClick} className={bemClassName}>
        <img className="picker-frame__glass-icon" src={getGlassImage(this.props.categoryName)} alt="" />
        {this.props.categoryName}
        <AccordianIcon visible={this.props.visible}/>
      </div>
    );
  }
}
//TODO: this will be given a state (collapsed/visibile), and will pass it down to drinkList and up from CategoryHeader
class GlassCategory extends React.Component {
  constructor(props) {
    super(props);
    this.toggleVisible = this.toggleVisible.bind(this);
    this.state = { visibile: true };
  }

  toggleVisible() {
    if (this.state.visibile)
      this.setState({ visibile: false });
    else
      this.setState({ visibile: true });
  }

  render() {
    return (
      <div className="picker-frame__category">
        <CategoryHeader visible={this.state.visibile} onVisibilityToggle={this.toggleVisible} categoryName={this.props.categoryName} />
        <DrinkList visibile={this.state.visibile} drinks={this.props.drinks} categoryName={this.props.categoryName} />
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
