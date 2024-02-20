import Image from "next/image"
import styles from "./postCard.module.css"
import Link from "next/link"

export default function PostCard({post}) {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        
        {post.img && <div className={styles.imgContainer}>
          <Image src={post.img} alt="" fill className={styles.img}/>
        </div>}

        <span className={styles.date}>{post.timestamp}</span>
      </div>
      <div className={styles.bottom}>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.desc}>{post.desc.slice(0, 150)} ...</p>
        <Link className={styles.link} href={`/blog/${post.slug}`}>READ MORE</Link>
      </div>
    </div>
  )
}