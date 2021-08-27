import { batch, connect } from "react-redux";
import MenuItem  from "./MenuItem";
import { add, undo, redo, fixPosition, clearScene } from "../../redux/actions/actionCreators";
import { getRandomColor, getRandomIntInclusive } from "../../utils";
import { useCallback, useEffect } from "react";

const Toggle = () => {

  useEffect(()=>{

    const toggle = document.querySelector('.Toggle');
    const navigation = document.querySelector('.Navigation');
    const app = document.querySelector('.App');

    toggle.onclick = function () {
      const token = 'active';
      this.classList.toggle(token);
      navigation.classList.toggle(token);
      app.classList.toggle(token);
    };

  },[]);

  return <div className="Toggle" />; 
};

const MainMenuItem = (props) => {

  const { callback, text, iconClassName } = props;

  return (
    <div className='MainMenuItem'>
      <a onClick={() => callback() } >
        <span>
          <i className= {iconClassName} style={{color:'white'}}></i>
        </span>
      </a>
      <p> {text} </p>
    </div>
  );
};

const SideMenu = (props) => {

    const { value, add, undo, redo, d, clear } = props;

    const newArrElements = value.map(
        (item,i) => {
            return <MenuItem key={item.id} text={item.text} id= {item.id} color= {item.color} index= {i}/>;
    });

    const createDataFromChildren = (childrens) => {

      if (!childrens) return null;

      const data = [];

      childrens.forEach(element => {
        const pos = element.getWorldPosition(element.position.clone());
        const q = element.getWorldQuaternion(element.quaternion.clone());
        data.push({
          name: element.name,
          position: [pos.x,pos.y,pos.z],
          quaternion: [q.x,q.y,q.z,q.w]
        });
      });
      return data;
    };

    const drop = useCallback((childrens) => {
      childrens.forEach(element => {
        element.api.applyImpulse([getRandomIntInclusive(-7,7), 
          getRandomIntInclusive(0,10), 
          getRandomIntInclusive(-7,7)], [0, 0, 0]);
      })
    },[]);

    return (
      <div className="Navigation">
        <Toggle />
        <div className='NavigationMenu'>
          <div className='ButtCont'>
            <MainMenuItem text='Add dice' iconClassName='fas fa-plus' 
              callback = {() => { add( { id: Date.now().toString(), color: getRandomColor() } ) }} />
            <MainMenuItem text= 'Clear scene' iconClassName='fas fa-trash' callback= {() => clear()}/>
            <MainMenuItem text= 'Undo' iconClassName='fas fa-undo' callback= {() => undo(createDataFromChildren(d.current.children))}/>
            <MainMenuItem text= 'Redo' iconClassName='fas fa-redo' callback= {() => redo(createDataFromChildren(d.current.children))}/>
            <MainMenuItem text= 'Drop all' iconClassName='fas fa-angle-double-up' callback= {() => drop(d.current.children)}/>
          </div>
          <div className='ItemPanel'>
            { newArrElements }
          </div>
        </div>
      </div>

    );
  };

  const mapStateToProps = (state) => {

    const { present } = state;

    return {
      value: present,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      add:  (payload) => dispatch(add(payload)),
      undo: (payload) => {
        batch(()=>{
          dispatch(fixPosition(payload));
          dispatch(undo());
        });
      }, 
      redo: (payload) => {
        batch(()=>{
          dispatch(fixPosition(payload));
          dispatch(redo());
        });
      }, 
      clear: (payload) => {
        dispatch(clearScene(payload));
      } 
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);



