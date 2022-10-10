import  express  from "express";
import { createPost, deletePost, getPost, getTimeLinePost, likePost, updatePost } from "../Controller/PostController.js";

const router = express.Router();

router.post('/',createPost);
router.get('/:id',getPost);
router.put('/:id',updatePost);
router.delete('/:id',deletePost);
router.put('/:id',likePost);
router.get('/:id',getTimeLinePost);
export default router