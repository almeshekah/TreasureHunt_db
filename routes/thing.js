const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");

const {
    thingList,
    thingCreate,
    fetchThing,
} = require("../controllers/thingController");

router.param("thingId", async (req, res, next, thingId) => {
    const foundThing = await fetchThing(thingId, next);
    if (foundThing) {
      req.thing = foundThing;
      next();
    } else {
      next({
        status: 404,
        message: "Thing not found",
      });
    }
});

router.get("/",thingList);

router.post("/",upload.single("image"), thingCreate);

module.exports = router;