import express from "express";
import { nanoid } from "nanoid";

import Url from "../models/Url.mjs";
import { validateUrl } from "../utils/utils.js";

import dotenv from "dotenv";
dotenv.config({path: "../.env"});


const router = express.Router();

router.post("/shorty", async (req, res) => {
    const { originalUrl }= req.body;
    const BASE_URL = process.env.BASE_URL;


    const urlId = nanoid();

    console.log({request_body: req.body});

    if (validateUrl(originalUrl)) {
        try {
            let url = await Url.findOne({originalUrl});

            if (url) {
                res.json(url);
            } else {
                const shortUrl = `${BASE_URL}/${urlId}`;

                url = new Url({
                    originalUrl,
                    shortUrl,
                    urlId,
                    date: new Date(),
                });


                await url.save();
                res.json(url);
            }
        } catch (err) {
            console.error(err);
            res.status(500).json("Server Error");
        }
    } else {
        res.status(400).json("Invalid Original Url");
    }
})

export default router;