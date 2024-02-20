import { getUser } from "@/lib/getData";
import styles from "./postUser.module.css";
import Image from "next/image";
import { session } from "@/lib/session";

export default async function PostUser({ userId }) {

  const user = session()

  return (
    <div className={styles.container}>
      <Image
        className={styles.avatar}
        src={user.img ? user.img : "/noavatar.png"}
        alt=""
        width={50}
        height={50}
      />
      <div className={styles.texts}>
        <span className={styles.title}>Author</span>
        <span className={styles.username}>{user.username}</span>
      </div>
    </div>
  );
};