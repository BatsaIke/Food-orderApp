
import classes from "./Modal.module.css"

import reactDom from "react-dom"

const BackDrop =props=>{
    return <div className={classes.backdrop} onClick={props.onHide}></div>



}

const ModalOverlay=props=>{
    return <div className={classes.modal}>
        <div className={classes.content}> 
        {props.children}
        </div>
         </div>
}
const PortalElement = document.getElementById("overlay")

const Modal =props=>{
    return(
        <>
       {reactDom.createPortal(<BackDrop onHide={props.onHide}/>,PortalElement )}
       {reactDom.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, PortalElement)}
        </>

    )
}
export default Modal;