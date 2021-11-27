import React, {useContext, useEffect, useState} from "react";
import {signOut} from "../../firebase";
import {AuthContext} from "../../contexts/AuthContext";
import {SocketContext} from "../../contexts/SocketContext";
import {Redirect} from "react-router";
import styles from "./Profile.module.css";
import PrioritySlider from "./PrioritySlider";
import {getMatchingPreferencesData, postUserInfo} from "../../utils";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Popover} from "@mui/material";
import PopupState, {bindTrigger, bindPopover} from 'material-ui-popup-state';
import PreferencePicker from "./PreferencePicker";
import {PreferenceInput} from "./PreferenceInput";

export default function Profile() {
  const {
    userInfo, setUserInfo
  } = useContext(AuthContext);
  const {socketConnected} = useContext(SocketContext)
  const [matchingPreferencesData, setMatchingPreferencesData] = useState(null);

  useEffect(() => {
    const getMatchingPreferences = async () => {
      setMatchingPreferencesData(await getMatchingPreferencesData());
      //remove from prefdata
    };
    getMatchingPreferences();
  }, []);

  const onTypeChange = (e) => {
    if (e.target.checked) setUserInfo({...userInfo, type: e.target.value});
  };

  const onPriorityChange = (index, val) => {
    const newUserInfo = userInfo;
    newUserInfo["preferences"][index]["priority"] = val;
    console.log(newUserInfo);
    setUserInfo({...newUserInfo})
  }

  if (!socketConnected) return <Redirect to="/"/>;

  const removePreference = (index) => {
    const newUserInfo = userInfo;
    newUserInfo["preferences"].splice(index, 1);
    setUserInfo({...newUserInfo})
  }

  const removeTag = (value) => {
    const newUserInfo = userInfo;
    let index = newUserInfo["tags"].indexOf(value)
    newUserInfo["tags"].splice(index, 1);
    setUserInfo({...newUserInfo})
  }

  return (
    <div>
      <div className={styles.profile}>
        <div className={styles.profile__avatar}>
          <img src={userInfo?.photoUrl} alt=""/>
          <p className={styles.profile__badge}>
            {userInfo?.gradYear !== -1 ? "STUDENT" : "FACULTY"}
          </p>
          <div className={styles.profile__tags}>Let others know about you:</div>
          <div className={styles.profile__preferences__selected}>
            {(!userInfo?.tags || userInfo?.tags?.length === 0) && <p style={{margin:"10px"}}><i>Tell us more about yourself</i></p> }
            {userInfo?.tags?.map((tag) => {
              return (
                <div>
                  {tag}
                  <span onClick={() => removeTag(tag)}>&times;</span>
                </div>
              );
            })}
          </div>
          <PopupState variant="popover" popupId="demo-popup-popover">
            {(popupState) => (
              <div>
                <button  {...bindTrigger(popupState)}>Add things...</button>
                <Popover {...bindPopover(popupState)}
                         anchorOrigin={{
                           vertical: 'bottom',
                           horizontal: 'center',
                         }}
                         transformOrigin={{
                           vertical: 'top',
                           horizontal: 'center',
                         }}>
                  <PreferencePicker matchingPreferencesData={matchingPreferencesData}
                                    userInfo={userInfo} setUserInfo={setUserInfo} popupState={popupState}/>
                </Popover>
              </div>
            )}
          </PopupState>
        </div>
        <div className={styles.profile__bio}>
          <h1>{userInfo?.name}</h1>
          <div className={styles.profile__info}>
            <p>
              Class: <span>{userInfo?.gradYear}</span>
            </p>
            <p>
              Major: <span>{userInfo?.major || "Undefined"}</span>
            </p>
          </div>
          <div className={styles.profile__status}>
            <p>Current Status: </p>
            <div>
              <input
                type="radio"
                id="giver"
                name="status"
                value="GIVER"
                checked={userInfo?.type === "GIVER"}
                onChange={onTypeChange}
              />
              <label htmlFor="giver">Giver</label>
            </div>
            <div>
              <input
                type="radio"
                id="receiver"
                name="status"
                value="RECEIVER"
                checked={userInfo?.type === "RECEIVER"}
                onChange={onTypeChange}
              />
              <label htmlFor="receiver">Receiver</label>
            </div>
            <div>
              <input
                type="radio"
                id="neither"
                name="status"
                value="NEITHER"
                checked={userInfo?.type === "NEITHER"}
                onChange={onTypeChange}
              />
              <label htmlFor="neither">Neither</label>
            </div>
          </div>
          <div className={styles.profile__preferences__title}>
            <h2>Matching Preferences</h2>
            <p>(decide who <u>should</u> get your swipe)</p>
          </div>
          <div>
            {userInfo?.preferences.map((preference, index) => {
              return (
                <div className={styles.profile__preferences__topic}>
                  <PopupState variant="popover" popupId="demo-popup-popover">
                    {(popupState) => (
                      <div>
                        <PreferenceInput
                          focused
                          label={"Preference " + (index + 1)}
                          value={preference["preference"]}
                          InputProps={{readOnly: true}} // font size of input text
                          {...bindTrigger(popupState)}
                        />
                        <Popover {...bindPopover(popupState)}
                                 anchorOrigin={{
                                   vertical: 'top',
                                   horizontal: 'center',
                                 }}
                                 transformOrigin={{
                                   vertical: 'bottom',
                                   horizontal: 'center',
                                 }}>
                          <PreferencePicker matchingPreferencesData={matchingPreferencesData} userInfo={userInfo}
                                        setUserInfo={setUserInfo}
                                        index={index} popupState={popupState}/>
                        </Popover>
                      </div>
                    )}
                  </PopupState>
                  <div className={styles.profile__preferences__slider}>
                    <PrioritySlider onChange={(e, val) => onPriorityChange(index, val)} value={preference["priority"]}/>
                  </div>
                  <div>
                    <button onClick={() => removePreference(index)}>&times;</button>
                  </div>
                </div>
              );
            })}
          </div>

          <div>
            {userInfo && [...Array(3 - userInfo?.preferences.length).keys()].map((index) => {
              return (
                <PopupState variant="popover" popupId="demo-popup-popover">
                  {(popupState) => (
                    <div>
                      <PreferenceInput
                        focused
                        label={"Preference " + (userInfo?.preferences.length + index + 1)}
                        value="Add a preference"
                        InputProps={{readOnly: true}}
                        {...bindTrigger(popupState)}
                      />
                      <Popover {...bindPopover(popupState)}
                               anchorOrigin={{
                                 vertical: 'top',
                                 horizontal: 'center',
                               }}
                               transformOrigin={{
                                 vertical: 'bottom',
                                 horizontal: 'center',
                               }}>
                        <PreferencePicker matchingPreferencesData={matchingPreferencesData} userInfo={userInfo}
                                      setUserInfo={setUserInfo}
                                      index={userInfo?.preferences.length + index} popupState={popupState}/>
                      </Popover>
                    </div>
                  )}
                </PopupState>
              );
            })}
          </div>

          <div className={styles.profile__update}>
            <button type="submit" onClick={() => postUserInfo(userInfo)}>
              Update My Profile
            </button>
            <p>5 times left</p>
          </div>
        </div>
      </div>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
