import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

let users = []

app.post('/register', (req, res) => {
    const { login, password } = req.body

    if (users.find(u => u.login === login)) {
        return res.status(400).json({ message: 'Пользователь с таким логином уже зарегистрирован' })
    }

    let id
    if (users.length === 0) {
        id = 0
    } else {
        id = users.at(-1).id + 1
    }
    const newUser = { id, login, password }
    users.push(newUser)

    res.status(201).json({ message: 'Пользователь зарегистрирован' })
})

app.post('/login', (req, res) => {
    const { login, password } = req.body

    const user = users.find(u => u.login === login && u.password === password)

    if (user) {
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' })
        res.status(201).json({ token, message: 'Вход выполнен успешен' })
    } else {
        res.status(401).json({ message: 'Неверный логин или пароль' })
    }

})

const authJWT = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (authHeader) {
        const token = authHeader.split(' ')[1]

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Доступ запрещён' })
            }
            next()
        })
    } else {
        return res.status(401).json({ message: 'Неверный токен' })
    }
}

app.get('/protected', authJWT, (req, res) => {
    res.json({ message: 'Доступ разрешён' })
})


app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000")
})