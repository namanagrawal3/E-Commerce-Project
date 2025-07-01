const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../../middleware');
const User = require('../../models/User');


router.post('/products/:productId/like' , isLoggedIn , async (req,res) => {
    const { productId } = req.params;
    const user = req.user;
    const isLiked = user.wishList.includes(productId);

    if (isLiked) {
        await User.findByIdAndUpdate(user._id , { $pull: { wishList: productId }})
    } else {
        await User.findByIdAndUpdate(user._id , { $addToSet: { wishList: productId }})
    }

    // const option = isLiked ? '$pull' : '$addToSet';
    // req.user = await User.findByIdAndUpdate(req.user._id , {[option]:{wishList:productId}} , {new:true} )
    res.send('like done api'); 
})


module.exports = router;