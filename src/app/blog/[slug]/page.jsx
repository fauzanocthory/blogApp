import Image from "next/image";
import styles from "./singlePost.module.css";
import PostUser from "@/components/postUser/postUser";
import { Suspense } from "react";

//FETCH DATA LANGSUNG KE DATABASE MONGO
import { getSinglePosts } from "@/lib/getData";

//FETCH DATA MENGGUNAKAN API
const getData = async (slug) => {
  const res = await fetch(`http://localhost:3000/api/blog/${slug}`)
  if(!res.ok) {
    throw new Error("somethinng went wrong")
  }
  return res.json()
} 

export const generateMetadata = async ({params}) => {
  const {slug} = params
  const post = await getSinglePosts(slug)

  return {
    title: post.title,
    description: post.desc,
  }
};

export default async function singlePost({ params }) {
  const { slug } = params;

  //FETCH DATA MENGGUNAKAN API
  const post = await getData(slug);

  //FETCH DATA LANGSUNG KE DATABASE MONGO
  // const post = await getSinglePosts(slug);

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image src={post.img} alt="" priority fill className={styles.img} sizes="500px" />
      </div>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{post?.title}</h1>
        <div className={styles.detail}>
          {post && (
              <Suspense fallback={<div>Loading...</div>}>
                <PostUser userId={post.userId} />
              </Suspense>
          )}
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.detailValue}>{post.createdAt.toString().slice(4, 16)}</span>
          </div>
        </div>
          <div className={styles.content}>{post.desc}</div>
      </div>
    </div>
  );
}
