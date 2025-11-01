const form_router= require("express").Router()
const uploadFiles = require("../multer")
const verifyToken = require("../middlewares/authMiddleware")
const formData = require("../model/formModel")
const authData = require("../model/authModel")
const authorizeRole = require("../middlewares/roleMiddleware")


form_router.post("/create",uploadFiles,async(req,res)=>{
    try {
        const {userName, email,phone,experience,education} = req.body
        const skills = JSON.parse(req.body.skills)
        console.log(skills)
        const resumePath = req.file?req.file.path:null

const newApplication = new formData({
    userName,
      email,
      phone,
      skills,
      experience,
      education,
      resume: resumePath,
})

await newApplication.save()
        res.status(200).json({message:"Form submitted successfully"})
    } catch (error) {
        console.error("Error saving applicant:", error);
        res.status(500).json({ error: "Server error" });
    }

})

form_router.get("/get",verifyToken,authorizeRole("admin","executive"), async(req,res)=>{
  try {
    const findData = await formData.find()

    if (findData) {
        res.status(200).json(findData)
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})




form_router.put("/update/:id",verifyToken, async (req, res) => {
  try {
    let param = req.params;
    let { email, status } = req.body;

    console.log(param.id, email, status);

    let findAuthUser = await authData.findOne({ email });
    if (!findAuthUser) {
      return res.status(404).json({ message: "User not found" });
    }

   
    let findFormData = await formData.findOne({ _id: param.id });
    if (!findFormData) {
      return res.status(404).json({ message: "Form data not found" });
    }

    findFormData.authUserId = findAuthUser._id;
    findFormData.status = status;
    await findFormData.save();


    if (!Array.isArray(findAuthUser.formIds)) {
      findAuthUser.formIds = [];
    }

    if (!findAuthUser.formIds.includes(param.id)) {
      findAuthUser.formIds.push(param.id);
      await findAuthUser.save();
    }

    res.status(200).json({ 
      message: "Interview scheduled successfully", 
      formData: findFormData,  
      authUser: findAuthUser  
    });

  } catch (error) {
    console.error("Error:", error); 
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
});




module.exports = form_router