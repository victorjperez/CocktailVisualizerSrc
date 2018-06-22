import React from 'react';
import info from './assets/information.svg';

function MoreInfo(props){
    if (props.visible) {
        return(
            <div className="banner__info">
                <p>Click on the drinks in the picker to display. Click on the glass to collapse category.</p>
                <h2>Created by <a href="https://github.com/victorjperez">Victor Perez</a></h2>
                <h2>Recipes by <a href="https://www.liquor.com/hub/cocktail-recipes/">Liquor.com</a></h2>
                <p>Icons made by <a href="https://www.flaticon.com/authors/good-ware" title="Good Ware">Good Ware</a>, <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a>,  <a href="http://www.freepik.com" title="Freepik">Freepik</a>, and <a href="https://www.flaticon.com/authors/iconnice" title="Iconnice">Iconnice </a> 
                from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></p>
            </div>
        );
    } else {
        return null;
    }
}
class InfoButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {
        this.props.onVisibilityToggle();
        console.log("clicked");
    }
    render() {
        return <img className="banner__info-image" src={info} onClick={this.handleClick} />;
    }
}
class InfoBanner extends React.Component {
    constructor(props) {
        super(props);
        this.toggleVisible = this.toggleVisible.bind(this);
        this.state = { visibile: false };
    }
    toggleVisible() {
        this.setState({ visibile: (!this.state.visibile) });
    }

    render() {
        return (
            <div className="banner">
                Cocktail Visualizer <InfoButton onVisibilityToggle={this.toggleVisible} />
                <MoreInfo visible={this.state.visibile} />
            </div>
        );
    }

}
export default InfoBanner; 