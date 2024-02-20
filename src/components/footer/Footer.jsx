import styles from "./footer.module.css"

export default function Footer() {
    return (
      <div>
        <div className={styles.container}>
          <div className={styles.logo}>PORTO1</div>
          <div className={styles.text}>
            Porto1 Creative @ All Right Reserved.
          </div>
        </div>
      </div>
    );
  }
  