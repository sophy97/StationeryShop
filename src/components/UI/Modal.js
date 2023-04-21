/**장바구니 모달창 구성을 위한 컴포넌트 (Modal이 메인 컴포넌트)
 * 후에 Cart 컴포넌트를 감싸는 태그로 이 UI 컴포넌트 사용
 */
import { Fragment } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

const Backdrop = (props) => {
  return <div onClick={props.onClick} className={classes.backdrop} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlay");

// <main> Modal Component
const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClick={props.modalCloseHandler} />,portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,portalElement
      )}
    </Fragment>
  );
};

export default Modal;
