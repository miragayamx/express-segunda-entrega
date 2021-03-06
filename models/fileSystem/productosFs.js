const { requiredData, validFields } = require("./validData");
const { readFile, saveFile } = require("../../utils/fileManager");
class Productos {
  constructor() {
    this.productos = [];
    this.productoKeys = [
      "nombre",
      "descripcion",
      "codigo",
      "foto",
      "precio",
      "stock",
    ];
  }
  //   setList(productList) {
  //     this.productos = productList;
  //   }
  async find() {
    try {
      const data = await readFile("./data/fs/productos.txt");
      const productos = !!data ? JSON.parse(data) : [];
      if (Array.isArray(productos)) this.productos = productos;
      return this.productos;
    } catch (err) {
      throw err;
    }
  }
  async findById(id) {
    try {
      const data = await readFile("./data/fs/productos.txt");
      const productos = !!data ? JSON.parse(data) : [];
      if (Array.isArray(productos)) this.productos = productos;
      const producto = this.productos.filter((el) => el._id === Number(id))[0];
      if (!producto) throw new Error("No se encontrĂ³ el producto solicitado");
      return producto;
    } catch (err) {
      throw err;
    }
  }
  async insert(item) {
    try {
      const data = await readFile("./data/fs/productos.txt");
      const productos = !!data ? JSON.parse(data) : [];
      if (Array.isArray(productos)) this.productos = productos;
      const validItem = requiredData(item, this.productoKeys);
      if (!validItem)
        throw new Error(
          "Los datos del producto proporcionado no son suficientes"
        );
      let newId = 1;
      if (!!this.productos.length)
        newId = this.productos[this.productos.length - 1]._id + 1;
      const itemWithId = {
        ...item,
        timestamp: Date.now(),
        precio: Number(item.precio),
        stock: Number(item.stock),
        _id: newId,
      };
      this.productos.push(itemWithId);
      const saveData = JSON.stringify(this.productos);
      await saveFile("./data/fs/productos.txt", saveData);
      return itemWithId;
    } catch (err) {
      throw err;
    }
  }
  async update(id, item) {
    try {
      const data = await readFile("./data/fs/productos.txt");
      const productos = !!data ? JSON.parse(data) : [];
      if (Array.isArray(productos)) this.productos = productos;
      const productToUpdate = validFields(item, this.productoKeys);
      const index = this.productos.findIndex((el) => el._id === Number(id));
      if (index < 0) throw new Error("No se encontrĂ³ el producto solicitado");
      this.productos[index] = {
        ...this.productos[index],
        ...productToUpdate,
      };
      const saveData = JSON.stringify(this.productos);
      await saveFile("./data/fs/productos.txt", saveData);
      return this.productos[index];
    } catch (err) {
      throw err;
    }
  }
  async delete(id) {
    try {
      const data = await readFile("./data/fs/productos.txt");
      const productos = !!data ? JSON.parse(data) : [];
      if (Array.isArray(productos)) this.productos = productos;
      const index = this.productos.findIndex((el) => el._id === Number(id));
      if (index < 0) throw new Error("No se encontrĂ³ el producto solicitado");
      const deleteProduct = this.productos[index];
      this.productos.splice(index, 1);
      const saveData = JSON.stringify(this.productos);
      await saveFile("./data/fs/productos.txt", saveData);
      return deleteProduct;
    } catch (err) {
      throw err;
    }
  }
}

const productos = new Productos();
// const prevData = readFile("./data/fs/productos.txt")
//   .then((data) => productos.setList(JSON.parse(data)))
//   .catch((err) => {
//     if ((err.code = "ENOENT")) return;
//     console.log(err);
//   });

module.exports = productos;
