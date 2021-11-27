import axios from "axios";
import {getIdToken} from "../firebase";

export const postAuthInfo = async () => {
  try {
    await axios.post(
      "https://twiki.csc.depauw.edu/api/auth",
      {},
      {
        headers: {
          authorization: await getIdToken(),
        },
      }
    );
  } catch (e) {
    console.warn(e);
  }
};

export const getAllConversations = async () => {
  try {
    return (
      await axios.get(`https://twiki.csc.depauw.edu/api/conversations`, {
        headers: {
          authorization: await getIdToken(),
        },
      })
    ).data;
  } catch (e) {
    console.warn(e);
  }
};

export const getAllMessagesByConversationId = async (id) => {
  try {
    return (
      await axios.get(`https://twiki.csc.depauw.edu/api/conversations/${id}`, {
        headers: {
          authorization: await getIdToken(),
        },
      })
    ).data;
  } catch (e) {
    console.warn(e);
  }
};

export const getProfile = async () => {
  try {
    return (
      await axios.get("https://twiki.csc.depauw.edu/api/profile", {
        headers: {
          authorization: await getIdToken(),
        },
      })
    ).data;
  } catch (e) {
    console.warn(e);
  }
};

export const postUserInfo = async (userInfo) => {
  await axios.post(
    "https://twiki.csc.depauw.edu/api/profile/update",
    userInfo,
    {
      headers: {
        authorization: await getIdToken(),
      },
    }
  );
};

export const setLocalStorage = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(e);
  }
};

export const getLocalStorage = (key) => {
  try {
    return JSON.parse(window.localStorage.getItem(key));
  } catch (e) {
    console.warn(e);
  }
};

export const getMatchings = async () => {
  try {
    return (
      await axios.get("https://twiki.csc.depauw.edu/api/matching", {
        headers: {
          authorization: await getIdToken(),
        },
      })
    ).data;
  } catch (e) {
    console.warn(e);
  }
};

export const getMatchingPreferencesData = async () => {
  try {
    return (
      await axios.get("https://twiki.csc.depauw.edu/api/matching-preferences-data", {
        headers: {
          authorization: await getIdToken(),
        },
      })
    ).data;
  } catch (e) {
    console.warn(e);
  }
};
