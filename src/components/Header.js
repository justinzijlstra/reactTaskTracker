import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({ title, onAdd, showAdd }) => { //same as props

    return (
        <header className='header'>
        {/* same as props.title */}
            <h1>{title}</h1> 
            <Button 
            color={showAdd ? 'red':'green'} 
            text={showAdd ? 'Close':'Add'} 
            onClick={onAdd} 
            />
        </header>
  )
}

Header.defaultProps = {
    title: 'Task Trackers',
}

Header.propTypes={
    title: PropTypes.string.isRequired,
}

//CSS in JS
// const headingStyle = {
//     color :"red", 
//     backgroundColor: "black"
// }

export default Header
