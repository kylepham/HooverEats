import { useContext } from "react";
import { signOut } from "../../firebase";
import { AuthContext } from "../../contexts/AuthContext";
import { SocketContext } from "../../contexts/SocketContext";
import { Redirect } from "react-router";
import styles from "./Profile.module.css";
import PrioritySlider from "./PrioritySlider";
import {postUserInfo} from "../../utils";

export default function Profile() {
  const {
    userInfo, setUserInfo
  } = useContext(AuthContext);
  const {socketConnected} = useContext(SocketContext)

  const years = ["Freshman", "Sophomore", "Junior", "Senior", "Faculty"];
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const majors = [
    "Actuarial Science",
    "Africana Studies",
    "Anthropology",
    "Art History",
    "Asian Studies",
    "Biochemistry",
    "Biology",
    "Cellular and Molecular Biology",
    "Chemistry",
    "Chinese Studies",
    "Classical Civilization",
    "Communication",
    "Computer Science",
    "Earth Science",
    "Economics",
    "Education Studies",
    "English (Literature)",
    "English (Writing)",
    "Environmental Biology",
    "Environmental Geoscience",
    "Film Studies",
    "Geology",
    "German",
    "German Studies",
    "Global French Studies",
    "Global Health",
    "Greek",
    "Hispanic Studies",
    "History",
    "Independent Interdisciplinary",
    "Italian Cultural Studies",
    "Japanese Studies",
    "Kinesiology",
    "Latin",
    "Mathematics",
    "Music/School of Music",
    "Neuroscience",
    "Peace and Conflict Studies",
    "Philosophy",
    "Physics",
    "Political Science",
    "Pre-engineering",
    "Psychology",
    "Religious Studies",
    "Romance Languages",
    "Sociology",
    "Studio Art",
    "Theatre",
    "Women's, Gender, and Sexuality Studies",
  ];

  const hobbies = [
    "Writing",
    "Reading",
    "Photography",
    "Sports",
    "Drawing",
    "Cooking",
    "DIY",
    "Coding",
    "Content Creation",
    "Dancing",
    "Meditation",
    "Languages",
    "Music",
    "Volunteering",
  ];

  const onPriorityChange = (type, value) => {
    const userPriorities = userInfo?.priorities;
    if (type === "prefYear") {
      userPriorities[0] = value;
    } else if (type === "prefMajor") {
      userPriorities[1] = value;
    } else if (type === "hobby") {
      userPriorities[2] = value;
    }
    setUserInfo({ ...userInfo, priorities: userPriorities });
  };

  const getPriority = (type) => {
    if (type === "prefYear") {
      return userInfo?.priorities[0];
    } else if (type === "prefMajor") {
      return userInfo?.priorities[1];
    } else if (type === "hobby") {
      return userInfo?.priorities[2];
    }
  };

  const onTypeChange = (e) => {
    if (e.target.checked) setUserInfo({ ...userInfo, type: e.target.value });
  };

  const numericYearCollegeYearConvert = (year, numeric) => {
    if (year === -1) return "Faculty";
    if (year === "Faculty") return -1;
    if (numeric) {
      if (currentMonth > 6) {
        return years[3 - (year - currentYear - 1)];
      } else {
        return years[3 - (year - currentYear)];
      }
    } else {
      let index = years.indexOf(year);
      if (currentMonth > 6) {
        return 3 - index + currentYear + 1;
      } else {
        return 3 - index + currentYear;
      }
    }
  };

  const addPreference = (e) => {
    if (e.target.id === "prefYear") {
      const prefYears = userInfo.prefYear ?? [];
      const yearValue = numericYearCollegeYearConvert(e.target.value, false);
      if (!prefYears.includes(yearValue)) {
        prefYears.push(yearValue);
      }
      setUserInfo({ ...userInfo, prefYear: prefYears });
    } else if (e.target.id === "prefMajor") {
      const prefMajors = userInfo.prefMajor ?? [];
      if (!prefMajors.includes(e.target.value)) {
        prefMajors.push(e.target.value);
      }
      setUserInfo({ ...userInfo, prefMajor: prefMajors });
    } else if (e.target.id === "hobby") {
      const userHobbies = userInfo.hobbies ?? [];
      if (!userHobbies.includes(e.target.value)) {
        userHobbies.push(e.target.value);
      }
      setUserInfo({ ...userInfo, hobbies: userHobbies });
    }
  };

  const removePreference = (type, value) => {
    if (type === "prefYear") {
      const prefYears = userInfo.prefYear;
      const index = prefYears.indexOf(value);
      if (index !== -1) {
        prefYears.splice(index, 1);
      }
      setUserInfo({ ...userInfo, prefYear: prefYears });
    }
    else if (type === "prefMajor") {
      const prefMajors = userInfo.prefMajor;
      const index = prefMajors.indexOf(value);
      if (index !== -1) {
        prefMajors.splice(index, 1);
      }
      setUserInfo({ ...userInfo, prefMajor: prefMajors });
    } else if (type === "hobby") {
      const userHobbies = userInfo.hobbies ?? [];
      const index = userHobbies.indexOf(value);
      if (index !== -1) {
        userHobbies.splice(index, 1);
      }
      setUserInfo({ ...userInfo, hobby: userHobbies });
    }
  };

  if (!socketConnected) return <Redirect to="/" />;
  return (
    <div>
      <div className={styles.profile}>
        <div className={styles.profile__avatar}>
          <img src={userInfo?.photoUrl} alt="" />
          <p className={styles.profile__badge}>
            {userInfo?.gradYear!==-1 ? "STUDENT" : "FACULTY"}
          </p>
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
            <p>
              (decide who <u>should</u> get your swipe)
            </p>
          </div>
          <div>
            {/*PREF YEAR*/}
            <div className={styles.profile__preferences__topic}>
              <p>Year:</p>
              <div className={styles.profile__preferences__slider}>
                <PrioritySlider onChange={(e, val) => onPriorityChange("prefYear", val)} value={getPriority("prefYear")}/>
              </div>
            </div>
            <div className={styles.profile__preferences__selected}>
              {(!userInfo?.prefYear || userInfo?.prefYear?.length === 0) && <p style={{margin:"10px"}}><i>You don't have any year preferences</i></p> }
              {userInfo?.prefYear?.map((prefYear) => {
                return (
                  <div>
                    {numericYearCollegeYearConvert(prefYear, true)}
                    <span onClick={() => removePreference("prefYear", prefYear)}>&times;</span>
                  </div>
                );
              })}
            </div>
            <select id="prefYear" onChange={addPreference} value="" className={styles.profile__preferences__dropdown}>
              <option value="" disabled selected hidden>
                Add Years...
              </option>
              {years && years.length && years.map((year) => {
                return <option value={year}>{year}</option>;
              })}
            </select>
            <br/><br/><hr/><br/>
            {/*PREF MAJOR*/}
            <div className={styles.profile__preferences__topic}>
              <p>Major:</p>
              <div className={styles.profile__preferences__slider}>
                  <PrioritySlider onChange={(e, val) => onPriorityChange("prefMajor", val)} value={getPriority("prefMajor")}/>
              </div>
            </div>
            <div className={styles.profile__preferences__selected}>
              {(!userInfo?.prefMajor || userInfo?.prefMajor?.length === 0) && <p style={{margin:"10px"}}><i>You don't have any major preferences</i></p> }
            {userInfo?.prefMajor?.map((prefMajor) => {
              return (
                <div>
                  {prefMajor} <span onClick={() => removePreference("prefMajor", prefMajor)}>&times;</span>
                </div>
              );
            })}
            </div>
            <div>
              <select id="prefMajor" onChange={addPreference} value="" className={styles.profile__preferences__dropdown}>
                <option value="" disabled selected hidden>
                  Add Majors...
                </option>
                {majors.map((major) => {
                  return <option value={major}>{major}</option>;
                })}
              </select>
            </div>
            <br/><hr/><br/>
            {/*PREF HOBBY*/}
            <div className={styles.profile__preferences__topic}>
            <p>Hobbies:</p>
            <div className={styles.profile__preferences__slider}>
              <PrioritySlider onChange={(e, val) => onPriorityChange("hobby", val)} value={getPriority("hobby")}/>
            </div>
            </div>
            <div className={styles.profile__preferences__selected}>
            {(!userInfo?.hobbies || userInfo?.hobbies?.length === 0) && <p style={{margin:"10px"}}><i>You don't have any hobbies</i></p> }
            {userInfo?.hobbies?.map((hobby) => {
              return (
                <div>
                  {hobby} <span onClick={() => removePreference("hobby", hobby)}>&times;</span>
                </div>
              );
            })}
            </div>
            <select id="hobby" onChange={addPreference} value="" className={styles.profile__preferences__dropdown}>
              <option value="" disabled selected hidden>
                Add Hobbies...
              </option>
              {hobbies.map((hobby) => {
                return <option value={hobby}>{hobby}</option>;
              })}
            </select>
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
