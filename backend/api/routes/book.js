const express = require('express')

const Book = require('../../models/Book')

const router = express.Router()

router.get('/books', async (req,res) => {
    await Book.find({}).then((book) => {
        res.send(book)
    }).catch(e => {
        console.log(e)
    })
})

router.post('/books', async (req, res, next) => {
    await Book.create(req.body).then((book) => {
        res.send(book)
    }).catch(next)
})

router.delete('/books/:id', async (req, res) => {
    const id = req.params.id;
    await Book.findByIdAndDelete({_id: id}).then(book => {
        res.send(book)
    })
})

router.put('/books/:id', async (req, res) => {
    const id = req.params.id;
    await Book.findByIdAndUpdate({_id: id}, req.body).then(book => {
        res.send(book)
    })

})

module.exports = router