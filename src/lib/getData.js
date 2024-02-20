import { connectToDb } from './utils'
import {Post, User} from './models'
import { unstable_noStore as noStore } from 'next/cache'

export const getPosts = async () => {
    try {
      connectToDb()
      const posts = await Post.find()
      return posts

    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

export const getSinglePosts = async (slug) => {
  try {
    connectToDb()
    const post = await Post.findOne({slug})
    return post

  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
  }

export const getUser = async (id) => {
  noStore()
  try {
    connectToDb()
    const user = await User.findById(id)
    return user

  } catch (error) {
    console.log(error)
    throw new Error('failed to fetch user')
  }
}

export const getUsers = async () => {
  try {
    connectToDb()
    const users = await User.find()
    return users

  } catch (error) {
    console.log(error)
    throw new Error('failed to fetch user')
  }
}