import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { SocketContext } from "../../contexts/SocketContext";
import styles from "./Matching.module.css";
import {getMatchings} from "../../utils";
import {UserTag} from "../../components/MembersList/MembersList";
import Dialog from '@mui/material/Dialog';
import {Alert, Fade} from "@mui/material";
import Grid from "@mui/material/Grid";
import {Link} from "react-router-dom";

export default function Profile() {
  const {
    userInfo
  } = useContext(AuthContext);

  const {
    client,socketConnected
  } = useContext(SocketContext);

  const [openPopup, setOpenPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("Hi! I would like to connect");
  const [otherUser, setOtherUser] = useState(null);
  const [userMatching, setUserMatching] = useState(null);
  const [messageSentAlert, setMessageSentAlert] = React.useState(false);

  useEffect(() => {
    const getMatching = async () => {
      setUserMatching(await getMatchings());
    };
    const interval = setInterval(() => {
      if (socketConnected && userInfo)
        getMatching();
    }, 5000);
    return () => clearInterval(interval);
  }, [socketConnected, userInfo]);

  const mainColor = "#e4bb4a"
  const handleClickOpen = (matching) => {
    setOpenPopup(true);
    setOtherUser(matching.user);
    setPopupMessage("Hi! I would like to connect");
  };

  const handleClose = () => {
    setOpenPopup(false);
  };

  const getReason = (reason) => {
    if (reason && reason.length > 0)
      return "Matched based on: " + reason.toString();
  }

  const sendMessage = (text) => {
    if (!text) return;
    const message = {
      senderUid: userInfo.uid,
      recipientUid: otherUser.uid,
      content: text,
      timestamp: new Date().getTime(),
    };

    setOpenPopup(false);
    setMessageSentAlert(true);
    setTimeout(() => {
      setMessageSentAlert(false)
    }, 2000)
    client.publish({
      destination: "/app/chat",
      body: JSON.stringify(message),
    });
  };

  if (userInfo.type === "NEITHER") return <div>You are currently neither</div>

  if (userInfo.type === "RECEIVER") return <div>You are currently receiver, go to <Link to ="/chat">chat</Link></div>

  return (<div>
      {userMatching && userMatching.map((matching, index) => {
          return <div onClick={() => handleClickOpen(matching)} key={index}><UserTag
          image={matching.user.photoUrl}
          title={matching.user.name}
          content={getReason(matching.reason)}
        /></div>
      })}
      <Dialog open={openPopup} onClose={handleClose} fullWidth
              PaperProps={{style:{backgroundColor: mainColor
                  , borderRadius: 10, maxWidth: "300px"}}}>
        <div className={styles.test}>
          <p>Send a message to <b>{otherUser?.name}</b></p>
        </div>
        <input
          type="text"
          value={popupMessage}
          className={styles.textBox}
          onChange={(e) => setPopupMessage(e.target.value)}
          onKeyDown={(e) => {
            if (!(e.key === "Enter")) return;
            sendMessage(popupMessage);
          }}
          autoFocus
        />
      </Dialog>
      <Grid container justifyContent="center" alignItems="center">
        <Fade in={messageSentAlert} timeout={2000}>
          <Alert sx={{ width:"170px", backgroundColor: mainColor}}>
            Message sent!
          </Alert>
        </Fade>
      </Grid>

    </div>
  );
}
