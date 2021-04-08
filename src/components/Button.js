import PropTypes from 'prop-types'

const Button = ({ color, text, onClick }) => {

    // const onClick = (e) => {
    //     console.log(e);
    // }

    return (
        <button onClick={onClick} style={{ backgroundColor: color }} className='btn'>{text}</button>
    )
}

export default Button

Button.defaultProps = {
    color: 'steelblue'
}

// Giving the Type of Props
Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func // because it is the function
}
