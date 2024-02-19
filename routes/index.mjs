import express from "express";
import Url from "../models/Url.mjs";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        console.log("default path ...");
        return res.send("<div>Welcome to shorty</div>"); 
    } catch (error) {
        console.error(error);
        res.status(500).json("Server Error");
    }
})

router.get("/:urlId", async (req, res) => {
    try {
        const url = await Url.findOne({ urlId: req.params.urlId });

        if (url) {
            await Url.updateOne(
                { urlId: req.params.urlId },
                
                // avoid race condition and use the MongoDB's method to increment the clicks
                { $inc: { clicks: 1 } } 
            );

            return res.redirect(url.originalUrl);
        } else {
            res.status(404).json("Url is Not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json("Server Error");
    }
})


export default router;