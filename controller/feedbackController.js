const feedback_router = require("express").Router()
const verifyToken = require("../middlewares/authMiddleware")
const formData = require("../model/formModel")
const authData = require("../model/authModel")
const authorizeRole = require("../middlewares/roleMiddleware")


feedback_router.get("/get/:id",verifyToken, async (req, res) => {
    try {
        let params = req.params
        let findFormData = await formData.find({ authUserId: params.id })
        if (!findFormData) {
          return res.status(400).json({ message: "Data not found" })
        }
        res.status(200).json(findFormData)
    } catch (error) {
        res.status(500).json({ message: "Somthing problem" })
    }

})

feedback_router.put("/update/:id",verifyToken, async (req, res) => {
    try {
        let { id } = req.params;
        let {status,strengths, weaknesses, rating, decision } = req.body;

        let updatedData = await formData.findByIdAndUpdate(
            id,
            { status,strengths, weaknesses, rating, decision },
            { new: true } 
        );

        res.status(200).json({message:"Data updated successfully"})
    } catch (error) {
        res.status(500).json({ message: "Somthing problem" })
    }
})

feedback_router.put("/final-status",verifyToken,async(req,res)=>{
    try {
        const {id,status} = req.body
        const findForm = await formData.findByIdAndUpdate(id,{status},{new:true})
        res.status(200).json({message:"Data updated successfully"})
        
    } catch (error) {
        res.status(500).json({ message: "Somthing problem" }) 
    }
})
module.exports = feedback_router