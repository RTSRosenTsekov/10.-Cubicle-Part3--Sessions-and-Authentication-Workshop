const router = require("express").Router();
const cubeService = require("../services/cubeService");
const accessoryService = require("../services/accessoryService");
const { dificultyLevelOptionsViewData } = require("../utils/ViewData");
const { isAuth } = require("../middlewares/authMiddleware");

router.get("/create",isAuth, (req, res) => {
  res.render("cubes/create");
});

router.post("/create", async (req, res) => {
  const { name, description, imageUrl, difficultyLevel } = req.body;
  const { user } = req;

  await cubeService.create({
    name,
    description,
    imageUrl,
    difficultyLevel: Number(difficultyLevel),
    owner: req.user,
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

  const isOwner = cube.owner?.toString() === req.user._id;

  const accessories = cube.accessories;
  const hasAccessories =
    accessories === undefined ? false : accessories.length > 0; //accessories?.length > 0
  res.render("cubes/details", { ...cube, hasAccessories, isOwner });
});

router.get("/:cubeId/attach-accessory", async (req, res) => {
  //console.log(req.params.cubeId);
  const { cubeId } = req.params;

  const cube = await cubeService.getSingleCube(cubeId).lean();
  const accessoryIds = cube.accessories
    ? cube.accessories.map((a) => a._id)
    : [];

  const accessories = await accessoryService
    .getWithoutOwned(accessoryIds)
    .lean();

  const hasAccessories = accessories.length > 0; // Нещо като viewData, TempData;
  res.render("accessory/attach", { cube, accessories, hasAccessories });
});

router.post("/:cubeId/attach-accessory", async (req, res) => {
  const { cubeId } = req.params;

  const { accessory: accessoryId } = req.body;
  await cubeService.attachAccessory(cubeId, accessoryId);

  res.redirect(`/cubes/${cubeId}/details`);
});

router.get("/:cubeId/edit", async (req, res) => {
  const { cubeId } = req.params;
  const cube = await cubeService.getSingleCube(cubeId).lean();
    if(cube.owner?.toString() !== req.user._id){
      return res.redirect("/404");
    }
  const options = dificultyLevelOptionsViewData(cube.difficultyLevel);

  res.render("cubes/edit", { cube, options });
});

router.post("/:cubeId/edit", async (req, res) => {
  const { cubeId } = req.params;
  const { name, imageUrl, description, difficultyLevel } = req.body;
  const payload = { name, imageUrl, description, difficultyLevel };

  await cubeService.update(cubeId, payload);
  res.redirect(`/cubes/${cubeId}/details`);
});

router.get("/:cubeId/delete", async (req, res) => {
  const { cubeId } = req.params;
  const cube = await cubeService.getSingleCube(cubeId).lean();
  const options = dificultyLevelOptionsViewData(cube.difficultyLevel);

  res.render("cubes/delete", { cube, options });
});

router.post("/:cubeId/delete", async (req, res) => {
  const { cubeId } = req.params;
  await cubeService.delete(cubeId);

  res.redirect("/");
});

module.exports = router;
