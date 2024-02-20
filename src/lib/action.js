"use server"

import { revalidatePath } from "next/cache"
import bcrypt from "bcryptjs"
import { signIn } from "next-auth/react"

const { Post, User } = require("./models")
const { connectToDb } = require("./utils")


export const addPost = async (formData) => {
    const { title, desc, slug, userId } = Object.fromEntries(formData)

    try {
        connectToDb()
        const newPost = new Post({
            title,
            desc,
            slug,
            userId
        })

        await newPost.save()
        console.log("save to db")

        revalidatePath("/blog");

    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

export const deletePost = async (formData) => {
    const { id } = Object.fromEntries(formData)

    try {
        connectToDb()

        await Post.findByIdAndDelete(id)
        console.log("delete to db")

        revalidatePath("/blog");

    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

export const register = async (previousState, formData) => {
    const { username, email, password, img, passwordRepeat } = Object.fromEntries(formData)
    
    // console.log(formData)
    
    if (password !== passwordRepeat) {
        return { error: "Passwords do not match" };
    }

    try {
        connectToDb()

        const user = User.findOne({ username })

        if (user != username) {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)
            
            const newUser = new User({
                username,
                email,
                password: hashedPassword,
                img
            })
            await newUser.save()
            console.log("save to db")
        } else {
            return { error: "Username already exists" };
        }

        
    } catch (error) {
        return { error: "Username already exists" };
        // return { error: "something went wrong" }
    }
}

// export const login = async (formData) => {
//     const { username, password } = Object.fromEntries(formData)

//     try {
//         await signIn("credentials", {username, password})

//     } catch (error) {
//         console.log(error, "something went wrongmm")
//         // return { error: "something went wrong" }
//     }
// }