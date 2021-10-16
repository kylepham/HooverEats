import React from "react";
import Footer from "../../components/Footer/Footer";
import MembersList from "../../components/MembersList/MembersList";
import styles from "./About.module.css";

export default function About() {
  return (
    <div>
      <div className={styles.About__container}>
        <div className={styles.About__description}>
          <h1>Hello from us!</h1>
          <p className={styles.About__intro}>We are...</p>
          <p>
            Hoover Eats is built to help DePauw Students connect with each
            others and involve more on campus. The App is the perfect tool for
            them to utilize all the oppoturnities at DePauw. Lorem ipsum dolor,
            sit amet consectetur adipisicing elit. Sapiente, distinctio?
            Voluptatem impedit facere voluptate adipisci nobis dolores
            consectetur accusamus! Quis aut animi distinctio illo officia,
            accusamus ad eveniet. Aspernatur, nostrum. Lorem ipsum dolor, sit
            amet consectetur adipisicing elit. Architecto culpa blanditiis, quis
            natus, et, commodi labore quibusdam maxime non ipsa quod hic
            voluptatum deleniti harum odit impedit quam quae deserunt. Lorem
            ipsum dolor sit, amet consectetur adipisicing elit. Modi cum facilis
            ipsam voluptatibus, iure, expedita numquam quis laboriosam
            consequatur iusto amet explicabo? Rerum, quo! Culpa excepturi
            maiores doloremque facilis doloribus.
          </p>
        </div>
        <MembersList />
        <div className={styles.About__feedback}></div>
      </div>
      <Footer />
    </div>
  );
}
