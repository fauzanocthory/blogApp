"use client";

import { useState } from "react";
import styles from "./links.module.css";
import NavLink from "./navLink/navLink";

import {signIn, signOut} from "next-auth/react"

export default function Links({session}) {
  const [open, setOpen] = useState(false);

  const links = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "About",
      path: "/about",
    },
    {
      title: "Contact",
      path: "/contact",
    },
    {
      title: "Blog",
      path: "/blog",
    },
  ];

  //TEMPORARY
  // const sesi = session()
  const isAdmin = true;

  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {links.map((link) => (
          <NavLink item={link} key={link.title} />
        ))}
        {session?.user ? (
          <>
            {session.user.isAdmin && <NavLink item={{ title: "Admin", path: "/admin" }} />}
            <button onClick={() => signOut()} className={styles.logout}>Log Out</button>
          </>
        ) : (
          // <NavLink item={{ title: "Login", path: "/login" }} />
          <button onClick={() => signIn()} className={styles.logout}>Log In</button>
        )}
      </div>
      <button
        className={styles.menuButton}
        onClick={() => setOpen((prev) => !prev)}
      >
        Menu
      </button>
      {open && (
        <div className={styles.mobileLinks}>
          {links.map((link) => (
            <NavLink item={link} key={link.title} />
          ))}
        </div>
      )}
    </div>
  );
}
