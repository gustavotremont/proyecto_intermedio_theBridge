const User = require("../models/user");
const jwt = require("jsonwebtoken");
const getEmailByToken = require('../utils/getEmailByToken')

const createUser = async (req, res) => {
    try {
        const result = await User.createUser(req.body);
        res.status(201).redirect('/login'); 
    } catch (err) {
        res.status(400).redirect('/signup',{"error":err})
    }    
};

const getUser = async (req, res) => {
    try {
        if (req.params.action === 'create') {
            res.status(200).render('userCreate');
        } 

        else if(req.params.action === 'edit'){

            if (req.query.currentUserEmail) {
                result = await User.getUser(req.query.currentUserEmail);
                res.status(200).render('userEdit', {user: result});
            } 
            else {
                res.status(400).redirect('/');
            }
        }
    
        else {
            result = await User.getAllUsers()
            res.status(200).render('users', {users:result});

        }      
    } catch (err) {
        res.status(400).redirect('/');
    }
};

const getProfile = async (req, res) => {
    try {
        if (req.params.email) {
                const result = await User.getUser(req.params.email);
                const data = {
                    name: result.user_name,
                    email: result.user_email,
                    age: result.user_age,
                    tlf: result.user_tlf,
                    dni: result.user_dni
                }
                if (req.params.action==='edit') {
                    res.status(200).render('profileEdit', data);
                }else {
                    res.status(200).render('profile', data);
                }
        } else {
            const email = getEmailByToken(req.cookies.access_token)
            res.redirect(`/profile/${email}/`);
        }        
    } catch (err) {
        res.status(400).redirect('/')
    }
};

const deleteUser = async (req, res) => {
    try {     
        if(req.query.currentUserEmail){
            await User.deleteUser(req.query.currentUserEmail);
            res.status(200).redirect('/user')
        } else {
            res.status(400).redirect('/')
        }  
    } catch (err) {
        res.status(400).redirect('/')
    }
};

const updateUser = async (req, res) => {
    try {    
        if(req.query.currentUserEmail){
            await User.updateUser(req.body, req.query.currentUserEmail);
            res.status(200).redirect('/');
        }else {
            res.status(400).redirect('/')
        }     
    } catch (err) {
        res.status(400).redirect('/')
    }
};

const users = {
    createUser,
    getUser,
    getProfile,
    deleteUser,
    updateUser,
};

module.exports = users;