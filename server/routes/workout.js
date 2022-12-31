const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const { createWorkout } = require("../controllers/workout");
const Workout = require("../models/Workout");



//--------------------------- post 

router.post('/', async (req, res) => {
    const {title, load, reps} = req.body

    let emptyFields = [];

    if(!title) { emptyFields.push('title') }
    if(!load) { emptyFields.push('load') }
    if(!reps) { emptyFields.push('reps') }
    if(emptyFields.length > 0) { return res.status(400).json({ error: 'Please fill in all the fields', emptyFields})}

    try {

        const workout = await Workout.create({ title, load, reps})
        res.status(200).json(workout)

    } catch (e) {
        res.status(400).json({error: e.message})

    }
});

//---------------------------- get 

router.get('/', async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})
    res.status(200).json(workouts)
});

//----------------------- get one 

router.get('/:id', async (req, res) => {
    const { id } = req.params
    
    //check if id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "not valid id"})
    }
    // find doc by id
    const workout = await Workout.findById(id)

    //check if doc exists
    if (!workout) {
        return res.status(404).json({error: "doc doesnt exist"})
    }

    res.status(200).json(workout);
    
});

//--------------------------------------- delete one

router.delete('/:id', async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "no valid workout id"})
    }

    const workout = await Workout.findOneAndDelete({_id: id})

    if (!workout) {
        return res.status(400).json({error: "this document doesn't exist"})
    }

    res.status(200).json(workout)

});

//-------------------------------------------- update one 


router.patch('/:id', async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "no valid workout id"})
    }

    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!workout) {
        return res.status(400).json({error: "this document doesn't exist"})
    }

    res.status(200).json(workout)
})

module.exports = router