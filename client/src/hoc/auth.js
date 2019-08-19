import React, { Component } from 'react'
import { auth } from '../actions';
import {connect} from 'react-redux';

export default function(ComposedClass, reload){
    class AuthenticationsCheck extends Component {

        state = {
            loading:true
        }

        componentDidMount(){
            this.props.dispatch(auth());
        }

        getSnapshotBeforeUpdate(prevProps){


            if(!this.props.user.login.isAuth){
                if(reload){
                    this.props.history.push('/login')
                }
            } else {
                if(reload === false){
                    this.props.history.push('/user')
                }
            }
            return { updateRequired: prevProps.user !== this.props.user}
        }
        componentDidUpdate(prevProps, prevState, snapshot) 
        {
            if(snapshot.updateRequired){
                this.setState({
                    loading:false
                });
            }
        }
        render(){
            if(this.state.loading){
                return <div className="loader">Loading...</div>
            }
            return (
                <ComposedClass {...this.props} user={this.props.user} />
            )
        }
    }

    function mapStateToProps(state){
        return{
            user:state.user
        }
    }
    return connect(mapStateToProps)(AuthenticationsCheck)
}