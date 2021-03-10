import React from 'react'
import SpotMap from './SpotMap';
import { connect } from 'react-redux';
import { withFirestore} from 'react-redux-firebase';
import firebase from './../firebase';
import AddSpot from './AddSpot';
import * as a from './../actions/index';
import styled from 'styled-components';


class SpotControl extends React.Component {
  // constructor(props){
  //   super(props);
  // }

  // HANDLERS FOR SPOT ACTIONS
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
  handleReturnHome = () => {
    const {dispatch} =this.props;
    const action = a.toggleForm();
    dispatch(action);
  }
  
  //STYLED COMPONENTS TO HANDLE STYLING IN CONTROL 
  BodyDiv = styled.div`
  position: center;
  `;


  render() {
    if(this.props.spotFormVisible){
      return (
        <>
          <this.BodyDiv>
            <AddSpot onAddLocation={this.handleLocationAdded} returnHome={this.handleReturnHome} onNewSpotCreation={this.handleNewSpot}/>
          </this.BodyDiv>
        </>
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