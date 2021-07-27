const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../../Dbmodels/Users");
const Profile = require("../../Dbmodels/Profile");
const Post = require("../../Dbmodels/Posts");
const Auth = require("../../middleware/auth");
const { findById } = require("../../Dbmodels/Users");

//@route    post api/post
//@desc     Getting post of the user
//@acces    public

router.post(
  "/",
  [Auth, [check("text", "Enter the post").not().isEmpty()]],
  async (req, res) => {
    var err = validationResult(req);
    if (!err.isEmpty()) {
      return res.json({ msg: err.array() });
    }
    try {
      var user = await User.findById(req.user.id).select("-password");

      var newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });
      var post = await newPost.save();
      return res.json({ msg: post });
    } catch (err) {
      console.log("error from post path ../../api/post.js");
      return res.json({ msg: err.msg });
    }
  }
);

//@route    get api/post
//@desc     Getting all the posts
//@acces    public

router.get("/", Auth, async (req, res) => {
  try {
    var post = await Post.find().sort({ date: -1 });
    return res.json({ msg: post });
  } catch (error) {
    console.log("error from post path ../../api/post.js");
    return res.json({ msg: err.msg });
  }
});

//@route    get api/post/:userid
//@desc     Getting the specified user
//@acces    private

router.get("/:userid", Auth, async (req, res) => {
  try {
    var post = await Post.findById(req.params.userid);
    if (!post) {
      return res.json({ msg: "No post found for this user" });
    }
    return res.json({ msg: post });
  } catch (error) {
    console.log("error from get path ../../api/post.js/userid");
    if (error.kind == "objectId") {
      return res.json({ msg: "No post found for this user" });
    }
    return res.json({ msg: err.msg });
  }
});

//@route    Delete api/post/:userid
//@desc     Getting all the posts
//@acces    private
router.delete("/:userid", Auth, async (req, res) => {
  try {
    var post = await Post.findById(req.params.userid);
    //check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not Authorized" });
    }
    post.remove();
    return res.json({ msg: "post removed sucessfully" });
  } catch (error) {
    console.log("error from delete path ../../api/post.js/userid");
    if (error.kind == "objectId") {
      return res.json({ msg: "No post found for this user" });
    }
    return res.json({ msg: err.msg });
  }
});

//@route    put api/post/like/:userid
//@desc     liking the post Id or the post thats been liked
//@acces    private
router.put("/like/:userid", Auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.userid);

    // Check if the post has already been liked
    if (post.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: "Post already liked" });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
    return res.json(post);
  } catch (error) {
    console.log("error from put path ../../api/post.js/like/:userid");
    console.log(error.message);
    if (error.kind == "objectId") {
      return res.json({ msg: "No Like from this user" });
    }
    return res.status(400).send(error.message);
  }
});
//@route    put api/post/dislike/:userid
//@desc     disliking the post Id or the post thats been disliked
//@acces    private
router.delete("/dislike/:userid", Auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.userid);

    // Check if the post has already been disliked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "post has not been yet liked " });
    }
    const removeindex = post.likes
      .map((likes) => likes.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeindex, 1);
    await post.save();
    return res.json({ msg: post });
  } catch (error) {
    console.log("error from delete path ../../api/post.js/like/:userid");
    console.log(error.message);
    if (error.kind == "objectId") {
      return res.json({ msg: "No Like from this user" });
    }
    return res.status(400).send(error.message);
  }
});

//@route post/comments
//@desc  adding comments to the post
//access private
router.post(
  "/comments/:id",
  [Auth, [check("text", "Enter the post").not().isEmpty()]],
  async (req, res) => {
    var err = validationResult(req);
    if (!err.isEmpty()) {
      return res.json({ msg: err.array() });
    }
    try {
      var user = await User.findById(req.user.id).select("-password");

      var post = await Post.findById(req.params.id);

      var newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };
      post.comments.unshift(newComment);
      await post.save();
      return res.json({ msg: post.comments });
    } catch (err) {
      console.log("error from post path ../../api/post.js");
      console.log(err.message);
      return res.send(err.message);
    }
  }
);
//@route delete post/comments/:id/:comment_id(to know which coment to delete)
//@desc  delete comments to the post
//access private
router.delete("/comments/:id/:comment_id", [Auth], async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    if (!comment) {
      return res.status(400).send("Comment does not exist");
    }
    if (comment.user.toString() !== req.user.id) {
      return res.status(400).send("User not authorized");
    }
    const removeindex = post.comments.map((comments) =>
      comments.user.toString()
    );
    removeindex.indexOf(req.user.id);
    post.comments.splice(removeindex, 1);
    await post.save();
    return res.json({ msg: post });
  } catch (err) {
    console.log(
      "The error from path delete api/post/comments/:id/:comment_id "
    );
    return res.status(400).send(err.message);
  }
});

module.exports = router;
