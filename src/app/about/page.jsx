import Image from "next/image";
import styles from "./about.module.css";

export const metadata = {
  title: "About Page",
  description: "About description",
};

export default function About() {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h2 className={styles.subtitle}>About Us</h2>
        <h1 className={styles.title}>
          Selamat datang di PORTO1, tempat di mana kami berbagi.
        </h1>
        <p className={styles.desc}>
          PORTO1 lahir dari hasrat kami untuk menginspirasi dan memberikan
          wawasan baru kepada pembaca. Di sini, kami berkomitmen untuk
          menyajikan konten berkualitas tinggi yang menghibur, mendidik, dan
          memotivasi.
        </p>
        <div className={styles.boxes}>
          <div className={styles.box}>
            <h1>-10 K+</h1>
            <p>Year of experience</p>
          </div>
          <div className={styles.box}>
            <h1>-10 K+</h1>
            <p>Year of experience</p>
          </div>
          <div className={styles.box}>
            <h1>-10 K+</h1>
            <p>Year of experience</p>
          </div>
        </div>
      </div>
      <div className={styles.imgContainer}>
        <Image src="/22.jpg" alt="About Image" fill className={styles.img} />
      </div>
    </div>
  );
}
