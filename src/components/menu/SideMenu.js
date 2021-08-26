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
        element.api.applyImpulse([getRandomIntInclusive(-7,7), getRandomIntInclusive(0,10), getRandomIntInclusive(-7,7)], [0, 0, 0]);
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

    // return (
    //     <div className='SideMenu'>
    //         <div className='MainMenu'> 
    //           <h1>Scene plan</h1>
    //           <button style={{width:'100px',height:'30px'}}
    //                   className='AddButton' 
    //                   onClick={() => clear() }>
    //                   Clear scene
    //           </button>
    //         </div>
    //         <div className='MenuButtons'>
    //           {/* <button 
    //               className='AddButton' 
    //               onClick={() => add( { id: Date.now().toString(),color: getRandomColor() } ) }>
    //               Add Dice
    //           </button> */}
    //           <div className='ButtCont' 
    //              onClick={() => add( { id: Date.now().toString(),color: getRandomColor() } ) }>
    //           <a>
    //             <span>Add Dice</span>
    //           </a>
    //         </div>
    //         <div className='ButtCont' 
    //               onClick={ () => undo(createDataFromChildren(d.current.children)) }>
    //           <a>
    //             <span>Undo</span>
    //           </a>
    //         </div>
    //         <div className='ButtCont' 
    //               onClick={ () => redo(createDataFromChildren(d.current.children)) }>
    //           <a>
    //             <span>Redo</span>
    //           </a>
    //         </div>
    //           {/* <button 
    //               className='UndoButton'
    //               onClick={ () => undo(createDataFromChildren(d.current.children)) }>
    //               Undo
    //           </button>
    //           <button 
    //               className='RedoButton'
    //               onClick={ () => redo(createDataFromChildren(d.current.children)) }>
    //               Redo
    //           </button> */}
    //         </div>
    //         <div className='itemList'>
    //             { newArrElements }
    //         </div>
    //     </div>
    // );
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



