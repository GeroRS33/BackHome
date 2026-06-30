// Adapta el carrito recibido desde la API
// al formato que usan las páginas y componentes.
export function mapApiCartToFrontend(response) {
  const items = response?.items || [];

  return items.map((item) => {
    const data = item?.data || {};

    return {
      // ID real del producto en el backend.
      id: item.productoId,
      apiId: item.productoId,

      // ID original de BackHome.
      idBH: data.idBH ?? null,

      cantidad: item.cantidad || 1,

      name: data.nombre || "Producto",
      nombre: data.nombre || "Producto",

      price: Number(data.precio) || 0,
      precio: Number(data.precio) || 0,

      image: data.imagen || "",
      imagen: data.imagen || "",

      category: data.categoria || "",
      categoria: data.categoria || "",

      material: data.material || "",

      decade: Number(data.decada) || null,
      decada: Number(data.decada) || null,

      slug: data.slug || "",

      description: data.descripcion || "",
      descripcion: data.descripcion || "",
    };
  });
}

// Adapta el carrito del frontend
// a la estructura que espera la API.
export function mapFrontendCartToApi(cart) {
  return {
    items: cart.map((producto) => ({
      productoId: String(
        producto.apiId ||
          producto.backendId ||
          producto.id
      ),

      cantidad: producto.cantidad || 1,

      data: {
        idBH:
          producto.idBH ??
          producto.localId ??
          null,

        nombre:
          producto.name ||
          producto.nombre ||
          "Producto",

        precio: Number(
          producto.price ||
            producto.precio ||
            0
        ),

        imagen:
          producto.image ||
          producto.imagen ||
          "",

        categoria:
          producto.category ||
          producto.categoria ||
          "",

        material:
          producto.material || "",

        decada: Number(
          producto.decade ||
            producto.decada ||
            0
        ),

        slug: producto.slug || "",

        descripcion:
          producto.description ||
          producto.descripcion ||
          "",
      },
    })),
  };
}