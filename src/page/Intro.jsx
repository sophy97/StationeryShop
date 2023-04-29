/** Home 부분 베스트 리스트 위에 보여줄 영상 컴포넌트 */
import React from "react";
import classes from "./Intro.module.css";

const Intro = () => {
  return (
    <>
      <video
        className={classes.video}
        src={process.env.PUBLIC_URL + `/Video/main.mp4`}
        width="100%"
        height="100%"
        autoPlay
        muted
        loop
      />
      <div className={classes.overlay}>
        <h1>Stationery Station</h1>
      </div>
    </>
  );
};

export default Intro;
