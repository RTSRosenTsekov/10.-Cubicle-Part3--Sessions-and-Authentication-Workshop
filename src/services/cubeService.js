const Cube = require("./../models/Cube");

const cubes = [
  {
    id: "kbyxdpcln7c7n7e",
    name: "pepi",
    description: "asd",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp3qrzOft1bpbwNn84yLrxrr6pLLtrwY4NzQ&usqp=CAU",
    difficultyLevel: 1,
  },
  {
    id: "kbyxdpcln7c86jj",
    name: "Gosho",
    description: "dsa",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp3qrzOft1bpbwNn84yLrxrr6pLLtrwY4NzQ&usqp=CAU",
    difficultyLevel: 5,
  },
];

exports.getAll = async (search, from, to) => {
  let filterCubes = await Cube.find().lean();

  if (search) {
    filterCubes = filterCubes.filter((cube) =>
      cube.name.toLowerCase().includes(search.toLowerCase())
    );
  }
  if (from) {
    filterCubes = filterCubes.filter(
      (cube) => cube.difficultyLevel >= Number(from)
    );
  }
  if (to) {
    filterCubes = filterCubes.filter(
      (cube) => cube.difficultyLevel <= Number(to)
    );
  }

  return filterCubes;
};

exports.create = async (cubeData) => {
  const cube = await Cube.create(cubeData);

  return cube;
};

exports.getSingleCube = (id) => {
  return Cube.findById(id).populate("accessories");
  //return cubes.find((cube) => cube.id === id);
};

exports.attachAccessory = async (cubeId, accessoryId) => {
  const cube = await this.getSingleCube(cubeId);
  cube.accessories.push(accessoryId);
  return cube.save();
};

exports.update = (id, cubeData) => {
 const cube =  Cube.findByIdAndUpdate(id, cubeData);
  return cube;
};

exports.delete = (id) => {
  const cube =  Cube.findByIdAndDelete(id);
   return cube;
 };
