import React from "react";
import Footer from "../../components/Footer/Footer";
import styles from "./Contact.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhoneAlt,
  faEnvelope,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

export default function Contact() {
  return (
    <div>
      <div className={styles.contact}>
        <h1>Contact us</h1>
        <div className={styles.contact__container}>
          <div>
            <div className={styles.contact__info}>
              <FontAwesomeIcon
                className={styles.contact__icon}
                icon={faPhoneAlt}
              />
              <div>
                <h3 className={styles.contact__title}>Phone</h3>
                <span className={styles.contact__subtitle}>
                  (+1) 765-712-2204
                </span>
              </div>
            </div>
            <div className={styles.contact__info}>
              <FontAwesomeIcon
                className={styles.contact__icon}
                icon={faEnvelope}
              />
              <div>
                <h3 className={styles.contact__title}>Email</h3>
                <span className={styles.contact__subtitle}>
                  anhle_2023@depauw.edu
                </span>
              </div>
            </div>
            <div className={styles.contact__info}>
              <FontAwesomeIcon
                className={styles.contact__icon}
                icon={faMapMarkerAlt}
              />
              <div>
                <h3 className={styles.contact__title}>Location</h3>
                <span className={styles.contact__subtitle}>
                  101 E Hanna St, Greencastle, IN 46135
                </span>
              </div>
            </div>
          </div>
          <form
            acceptCharset="utf-8"
            action=""
            className={styles.contact__form}
            method="POST"
          >
            <input type="text" placeholder="Your Full Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea
              placeholder="Write your message here..."
              name="message"
              id=""
              cols="30"
              rows="10"
            ></textarea>
            <input type="submit" value="Send" name="" id="" />
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
