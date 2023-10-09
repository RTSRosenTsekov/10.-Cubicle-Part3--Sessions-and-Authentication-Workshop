const router = require("express").Router();
const cubeService = require("../services/cubeService");
const accessoryService = require("../services/accessoryService");

router.get("/create", (req, res) => {
  res.render("cubes/create");
});

router.post("/create", async (req, res) => {
  const { name, description, imageUrl, difficultyLevel } = req.body;
  await cubeService.create({
    name,
    description,
    imageUrl,
    difficultyLevel: Number(difficultyLevel),
  });
  res.redirect("/");
});

router.get("/:cubeId/details", async (req, res) => {
  const { cubeId } = req.params;
  const cube = await cubeService.getSingleCube(cubeId).lean();

  if (!cube) {
    res.redirect("/404");
    return;
  }

  const accessories = cube.accessories;
  const hasAccessories =
    accessories === undefined ? false : accessories.length > 0; //accessories?.length > 0
  res.render("cubes/details", { ...cube, hasAccessories });
});

router.get("/:cubeId/attach-accessory", async (req, res) => {
  //console.log(req.params.cubeId);
  const { cubeId } = req.params;

  const cube = await cubeService.getSingleCube(cubeId).lean();
  const accessoryIds =cube.accessories 
  ? cube.accessories.map((a) => a._id)
  :[];
  
  const accessories = await accessoryService.getWithoutOwned(accessoryIds).lean();

  const hasAccessories = accessories.length > 0; // Нещо като viewData, TempData;
  res.render("accessory/attach", { cube, accessories, hasAccessories });
});

router.post("/:cubeId/attach-accessory", async (req, res) => {
  const { cubeId } = req.params;

  const { accessory: accessoryId } = req.body;
  await cubeService.attachAccessory(cubeId, accessoryId);

  res.redirect(`/cubes/${cubeId}/details`);
});

module.exports = router;
