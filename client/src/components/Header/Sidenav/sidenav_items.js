import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux'

const SidenavItems = (props) => {

    const items = [
        {
            type:'navItem',
            icon:'home',
            text:'Home',
            link:'/',
            restricted:false
        },
        {
            type:'navItem',
            icon:'file-alt',
            text:'My Profile',
            link:'/user',
            restricted:true
        },
        {
            type:'navItem',
            icon:'file-alt',
            text:'Add Admins',
            link:'/user/register',
            restricted:true
        },
        {
            type:'navItem',
            icon:'sign-in-alt',
            text:'Login',
            link:'/login',
            restricted:false,
            exclude:true
        },
        {
            type:'navItem',
            icon:'file-alt',
            text:'My Reviews',
            link:'/user/user-reviews',
            restricted:true
        },
        {
            type:'navItem',
            icon:'file-alt',
            text:'Add Reviews',
            link:'/user/add',
            restricted:true
        },
        {
            type:'navItem',
            icon:'sign-out-alt',
            text:'Logout',
            link:'/logout',
            restricted:true
        }
    ]

    const element = (item, i) => (
        <div key={i} className={item.type}>
            <Link to={item.link} onClick={() => props.onHideNav()} >
                <FontAwesomeIcon 
                    icon={item.icon}
                    style={{
                        marginRight:"10px"
                    }}
                 />
                {item.text}
            </Link>
        </div>
    )

    const showItems = () => (
        props.user.login ?
            items.map((item, i) => {
                if(props.user.login.isAuth){
                    return !item.exclude ?
                        element(item,i)
                    :null
                } else {
                    return !item.restricted ?
                        element(item,i)
                    :null
                }
            })
        :null
    )   

    return (
        <div>
            {showItems()}
        </div>
    );
};

function mapStateToProps(state){
    return {
        user:state.user
    }
}
export default connect(mapStateToProps)(SidenavItems);