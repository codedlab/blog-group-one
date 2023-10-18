import likeModels from "../models/likeModels.js";

// create like
const registerlike = async (req, res) => {
  try {
    const addCourse = req.body;
    const newlike = await likeModels.create(addCourse);
    if (newlike) {
      return res.status(201).json({ message: "succesful", newlike });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "unable to like" });
  }
};

// get like

// const getlike =async (req, res) =>{
//  try{
//        const{id} = req.params;
//        if (!id){
//         return res.status(409).json({
//            message:"like not found"
//         })
//        }
//        const like =await likeModels.findOne (id)
//        if (like) {
//           return res.status(200).json({message: "sucessful",like})
//         }
//    }catch(error){
//     consolee,log(error);
//     return res. status(500).json({message:"unable to like"})

//    }
// };

// get all likes

// const getAlllikes = async(req, res)=> {
//     try{
//         const likes = await likeModels.findAll()

//         if(!likes){
//             return res.status(409).json({message: " like not found"});
//         }
//         return res.status(200).json({message:"sucessful",likes})
// }  catch (error){
//     console.log(error);
//     return res. status(500).json({message:"server error" })
// }

// };

// get all likes by postid

const getAlllikesByPostId = async (req, res) => {
  try {
    const likes = await likeModels.findAll();
    return res.status(200).json({ message: "successful", likes });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
};

// update like records

// const updatelike= async(req,res) =>{
//     const{id} =req.params;
//     const updateInfo=req.body;
//     try{
//       if (!id) {
//           return res.status(409).json({message:"like not  found"});
//         }
//         const updatelike = await likeModels.update(updateInfo);
//         return res.status(200).json({message: "update successfully",updateInfo});
//     }
//     catch(error){
//         console.log(error);
//         return res.status(500).json({message: "unable to update like "})
//     }
// }
// delete like records

const deletelike = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(409).json({ message: "like not  found" });
    }
    const deletedlike = await likeModels.destroy({ where: { id } });
    return res
      .status(200)
      .json({ message: "delete successfully", deletedlike });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "unable to delete like" });
  }
};

export default { registerlike, getAlllikesByPostId, deletelike };
