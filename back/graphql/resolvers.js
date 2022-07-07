import { User, Post } from '../db.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import { handleEmail, handlePassword } from '../functions/regex.js'

export const resolvers = {
    Query: {
        users: () => User.findAll(),
        user: async (root, {id}) => {
            const findUser = await User.findById(id)
            if(!findUser) return false
            return findUser
        },
        posts: () => Post.findAll() 
    },
    Mutation: {
        //Users
        createUser: async (root, {email, password, firstname, lastname}) => {
            if(email === "" || password === "" || firstname === "" || lastname === "") return false
            if(!handleEmail(email)) return false
            const findUser = await User.findOne((user) => user.email === email)
            if(findUser) return false
            if(!handlePassword(password)) return false
            const hash = await bcrypt.hash(password, 10)
            const avatar = "https://www.pphfoundation.ca/wp-content/uploads/2018/05/default-avatar-600x600.png"
            if(hash) return User.create({email, hash, firstname, lastname, avatar})
        },
        signInUser: async (root, {email, password}) => {
            const findUser = await User.findOne((user) => user.email === email)
            if(!findUser) return false
            const comparePass = await bcrypt.compare(password, findUser.hash)
            if(!comparePass) return false
            const token = jwt.sign(
                {userId: findUser.id},
                "IEUZJAIEOZAJIEOZAHJEIUOZHEUIZAHEUIZANIEHNZAIUOEJIZOJEIZAOEHJIOZUHEUZIAEHUZIJENZAKONEIO",
                {expiresIn: '24h'}
            )
            return {
                token: token,
                userId: findUser.id
            }
        },
        editUser: async(root, {id, email, firstname, lastname}) => {
            const findUser = await User.findById(id)
            if(!findUser) return false
            const avatar = findUser.avatar
            const hash = findUser.hash
            const editUser = await User.update({id, email, firstname, lastname, avatar, hash})
            if(!editUser) return false
            return editUser
        },
        //Publications
        createPost: async(root, {title, content, authorid}) => {
            if(title === "" || content === "") return false
            const author = await User.findById(authorid)
            if(!author) return false
            return Post.create({title, content, author})
        }
    }
}