
import { connect } from "react-redux";
import { changeColor, remove } from "../../redux/actions/actionCreators";
import { getRandomColor } from "../../utils";

const MenuItem = (props) => {

    const { id, color, colorUpdate, remove } = props;

    return (
        <div className='MenuItem'>
            <a id='color' onClick = {() => colorUpdate(id)}>
                <span >
                    <i className="fas fa-dice-two" style={{color:color}}></i>
                </span>
            </a>
            <a id='remove' onClick = {() => remove(id)}>
                <span>
                    <i className="fas fa-backspace"></i>
                </span>
            </a>
        </div>
    );
};

  const mapDispatchToProps = (dispatch) => {
    return {
        remove: (id) => dispatch(remove(id)),
        colorUpdate: (id) => dispatch(changeColor({
            id,
            color: getRandomColor()
        }))
    };
};

export default connect(null, mapDispatchToProps)(MenuItem);