//import React from 'react' --> NOT REQUIRED
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import Button from './Button'

// {{title}} -> destructuring
const Header = ({ title, onAdd, showAdd }) => {

    // const onClick = () => {
    //     console.log('Click');
    // }
    const location = useLocation()
    return (
        <header className='header'>
            <h1>{title}</h1>
            {location.pathname === '/' && (<Button color={showAdd ? 'red' : 'green'} text={showAdd ? 'Close' : 'Add'} onClick={onAdd} />)}
        </header>
    );
}

// Default props
Header.defaultProps = {
    title: 'Task Tracker',
}


// Giving the Type of Props
Header.propTypes = {
    title: PropTypes.string.isRequired,
}


// // CSS in JS, React
// const headingStyle = {
//     color: 'blue',
//     backgroundColor: 'gray'
// }

export default Header