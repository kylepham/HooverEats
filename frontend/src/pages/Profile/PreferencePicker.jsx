import React from "react";
import Slider from "react-slick";
import styles from "./Profile.module.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
  const {className, style, onClick} = props;
  return (
    <div
      className={className}
      style={{...style, display: "block", right: "0", top: "10px", "zIndex": "1"}}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const {className, style, onClick} = props;
  return (
    <div
      className={className}
      style={{...style, display: "block", left: "0", top: "10px", "zIndex": "1"}}
      onClick={onClick}
    />
  );
}

const settings = {
  infinite: true,
  nextArrow: <SampleNextArrow/>,
  prevArrow: <SamplePrevArrow/>
};

const selectPreference = (userInfo, setUserInfo, index, value, popupState) => {
  const newUserInfo = userInfo;
  if (typeof index !== "undefined" ) {
    for (const preference of newUserInfo["preferences"]) {
      if (preference["preference"] === value) {
        popupState.close();
        return;
      }
    }
    if (index < newUserInfo["preferences"].length) {
      newUserInfo["preferences"][index]["preference"] = value;
    } else {
      newUserInfo["preferences"][index] = {"preference": value, "priority": 1};
    }
  } else {
    if (!newUserInfo["tags"]) newUserInfo["tags"] = []
    if (!newUserInfo["tags"].includes(value))
      newUserInfo["tags"].push(value);
  }
  setUserInfo({...newUserInfo})
  popupState.close();
}

export default function PreferencePicker({matchingPreferencesData, userInfo, setUserInfo, index, popupState}) {

  return (
    <div className={styles.container}>
      <Slider {...settings} key={matchingPreferencesData}>
        {matchingPreferencesData && Object.keys(matchingPreferencesData).map((key) => {
          return (
            <div className={styles.slide}>
              <span>{key}</span>
              <select id="preferences" size="7">
                {matchingPreferencesData[key].map((preference) => {
                  return <option value={preference}
                                 onClick={() => selectPreference(userInfo, setUserInfo, index, preference, popupState)}> {preference} </option>;
                })}
              </select>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
