import PostCard from "@/components/postCard/postCard";
import styles from "./blog.module.css"

//FETCH DATA LANGSUNG KE DATABASE MONGO
import {getPosts} from "@/lib/getData";

//FETCH DATA MENGGUNAKAN API
const getData = async () => {
  const res = await fetch("http://localhost:3000/api/blog", {next:{revalidate:3600}})
  if(!res.ok) {
    throw new Error("somethinng went wrong")
  }
  return res.json()
} 

export default async function Blog() {

  //FETCH DATA MENGGUNAKAN API
  const posts = await getData()

  //FETCH DATA LANGSUNG KE DATABASE MONGO
  // const posts = await getPosts()

    return (
      <div className={styles.container}>
        {posts.map((post) => (
          <div className={styles.post} key={post.id}>
            <PostCard post={post}/>
          </div>
        ))}
        
      </div>
    );
  }
  