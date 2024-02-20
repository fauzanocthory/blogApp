import Links from "./links/Links";
import styles from "./navbar.module.css";
import Link from "next/link"

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Navbar() {

  const session = await getServerSession(authOptions)

    return (
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>PORTO1</Link>
        <div>
          <Links session={session}/>
        </div>
      </div>
    );
  }
  
