exports.fileupload = async (req,res)=>{
    res.json(req.file)
}