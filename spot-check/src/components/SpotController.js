import React from 'react'
import SpotMap from './SpotMap';
import { connect } from 'react-redux';
import { withFirestore} from 'react-redux-firebase';
import firebase from './../firebase';
import AddSpot from './AddSpot';
import * as a from './../actions/index';


class SpotControl extends React.Component {
  // constructor(props){
  //   super(props);
  // }
  handleClick = () => {
    const {dispatch} = this.props;
    if(this.props.selectedSpot != null){
      if(this.props.spotFormVisible){
        const action = a.toggleForm();
        dispatch(action); 
      }
      const action2 = a.clearSelect();
      dispatch(action2)
      if(this.props.editing){
        const action3 = a.toggleEdit();
        dispatch(action3);
      }
    }else{
      const action = a.toggleForm();
      dispatch(action);
    }
  }
  
  handleNewSpot = () => {
    const{ dispatch } = this.props;
    const action = a.toggleForm();
    dispatch(action);
  }
  handleLocationAdded = () => {
    const { dispatch } = this.props;
    const action = a.locationAdded();
    dispatch(action);
  }


  render() {
    if(this.props.spotFormVisible){
      return (
        <AddSpot onAddLocation={this.handleLocationAdded} onNewSpotCreation={this.handleNewSpot}/>
      )
    }else{
      return(
        <>
          <button onClick={this.handleNewSpot}>Add New Spot</button>
          <SpotMap spotList ={this.props.spotList}/>
          {console.log(this.props.spotFormVisible)}
          
        </>
      )
    }
  }
    
  //   return (
  //     <>
  //       <SpotMap/>
  //       <AddSpot />
        
  //     </>
  //   )
  // }
}

const mapStateToProps = state => {
  return{
    spotFormVisible: state.spotFormVisible,
    spotList: state.spotList,
    coordinates: state.coordinates,
    
  }
}
SpotControl = connect(mapStateToProps)(SpotControl);
export default withFirestore(SpotControl);