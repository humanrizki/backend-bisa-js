import {Courses, Subcribes, Users} from "../models/course_user.js"
import Joi from "joi"
import argon2 from 'argon2'
import Roles from "../models/roles.js"

export const login = async(req, res) => {
    const registerSchema = Joi.object().keys({ 
        email: Joi.string().email({
            minDomainSegments: 1,
            tlds: {
                allow: ['com']
            }
        }).required().messages({
            "string.empty":"Email tidak boleh kosong",
            "string.email":"Email tidak valid"
        }),
        password: Joi.string().required().messages({
            "string.empty":"Password tidak boleh kosong",
        }),
    })
    const result = registerSchema.validate(req.body, {abortEarly: false})
    const { value, error } = result; 
    const valid = error == null; 
    if (!valid) { 
        return res.status(422).json({ 
            msg: 'Gagal Login!', 
            data: value,
            error: error.details
        }) 
    } 
    const user = await Users.findOne({
        where: {
            email: value.email
        }, 
        include: {
            model: Roles,
            as: 'role'
        }
    });
    if(!user) return res.status(404).json({
        msg: "Gagal Login!", 
        error: [
            {
                message: 'User tidak ditemukan!'
            }
        ]
    });
    const match = await argon2.verify(user.password, value.password);
    if(!match) return res.status(400).json({
        msg: "Gagal Login!",
        error: [
            {
                message: 'Password akun salah!'
            }
        ]
    });
    req.session.userId = user.id
    res.status(200).json({msg: "Login berhasil",
    user: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role.type,
    }});
}

export const register = async(req, res) => {
    if(req.session.userId) return res.status(403).json({
        msg: 'Akses register ditolak, karena anda sudah login!'
    })
    const {body} = req
    const registerSchema = Joi.object().keys({ 
        name: Joi.string().required().messages({
            "string.empty":"Name tidak boleh kosong"
        }),
        email: Joi.string().email({
            minDomainSegments: 1,
            tlds: {
                allow: ['com']
            }
        }).required().messages({
            "string.empty":"Email tidak boleh kosong",
            "string.email":"Email tidak valid"
        }),
        username: Joi.string().required().alphanum().messages({
            "string.empty":"Username tidak boleh kosong",
            "string.alphanum":"Username hanya boleh berisi angka dan huruf tanpa simbol"
        }),
        password: Joi.string().required().alphanum().messages({
            "string.empty":"Password tidak boleh kosong",
            "string.alphanum":"Password hanya boleh berisi angka dan huruf tanpa simbol"
        }),
    }); 
    const result = registerSchema.validate(body, {abortEarly: false})
    const { value, error } = result; 
    const valid = error == null; 
    if (!valid) { 
        return res.status(422).json({ 
            msg: 'Gagal registrasi!', 
            data: body,
            error: error
        }) 
    } 
    try{
        const hashPassword = await argon2.hash(value.password)
        await Users.create({
            name: value.name,
            email: value.email,
            username: value.username,
            password: hashPassword,
            roleId: 2
        })
        const user = await Users.findOne({
            where: {
                email: value.email
            },
            include: {
                model: Roles,
                as: "role",
                attributes: ['type']
            }
        })
        req.session.userId = user.id
        return res.status(201).json({
            msg: "User berhasil daftar!"
        })
    }catch(e){
        return res.status(500).json({msg: "Gagal Registrasi", 
        error: e.errors})
    }
}

export const me = async(req, res) => {
    if(!req.session.userId) return res.status(401).json({
        msg: "Mohon login ke akun anda!"
    })
    const user = await Users.findOne({
        attributes: ['id','name','username','email','roleId'],
        where: {
            id: req.session.userId,
        },
        include: {
            model: Roles,
            as: 'role'
        }
    })
    if(!user) return res.status(404).json({
        msg: "User tidak ditemukan!"
    })
    res.status(200).json({msg: "Credentials user",user})
}

export const logout = async(req, res) => {
    req.session.destroy((err)=>{
        if(err) return res.status(400).json({
            msg: 'Tidak dapat Logout!'
        })
        res.status(200).json({
            msg: 'Anda berhasil logout!'
        })
    })
}