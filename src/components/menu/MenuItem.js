
import { connect } from "react-redux";
import { changeColor, remove } from "../../redux/actions/actionCreators";
import { getRandomColor } from "../../utils";

const MenuItem = (props) => {

    const { text, id, color, colorUpdate, remove } = props;

    // return (
    //     <div className='MenuItem'>
    //         {/* <span>
    //             <i class="fas fa-dice-two"></i>
    //         </span> */}
    //         <p> {text} </p>
    //         <button className='colorButton' 
    //                 onClick = {() => colorUpdate(id)}
    //                 style={{color:'white',backgroundColor: color}}>
    //                 Color
    //         </button>
    //         <button className='deleteButton'
    //                 onClick = {() => remove(id)}>
    //                 Delete
    //         </button>
    //     </div>
    // );
    return (
        <div className='MenuItem'>
            <a id='color' onClick = {() => colorUpdate(id)}>
                <span>
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