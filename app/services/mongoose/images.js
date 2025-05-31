const Images = require('../../api/v1/images/model');
const { NotFoundError } = require('../../errors');

const createImage = async (req) => {
  const result = await Images.create({
    name: req.file?.path,
  });

  return result;
};

const getOneImage = async (id) => {
  const result = await Images.findById(id);

  if (!result) throw new NotFoundError(`Tidak ada gambar dengan id ${id}`);

  return result;
};

module.exports = { 
  createImage, 
  getOneImage, 
};
