import {Component} from 'react';

class Carousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: 0
        };
        this.handleClick = this.handleClick.bind(this);
        
    }
    handleClick(event) {
        this.setState(prevState => ({
            active: prevState.active == this.props.images.length - 1 ? 0 : ++event.target.dataset.index
        }))
   }
   render() {
       console.log(this.props);
       const active = this.state.active;
       const images = this.props.images;
       return (
           <div id="charPhoto">
               <img key={active} onClick={(e) => this.handleClick(e)} data-index={active} src={images[active]} alt="character" />
           </div>
       )
   }
}
export default Carousel;