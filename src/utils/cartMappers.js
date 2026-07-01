// Adapta el carrito recibido desde la API
// al formato que usan las páginas y componentes.
export function mapApiCartToFrontend(response) {
  const items = Array.isArray(response?.items)
    ? response.items
    : [];

  return items.map((item) => {
    const data = item?.data || {};

    return {
      // ID real del producto en el backend.
      id: String(item.productoId),

      cantidad:
        Number(item.cantidad) || 1,

      name:
        data.nombre ||
        data.name ||
        "Producto",

      nombre:
        data.nombre ||
        data.name ||
        "Producto",

      price: Number(
        data.precio ||
          data.price ||
          0
      ),

      precio: Number(
        data.precio ||
          data.price ||
          0
      ),

      image:
        data.imagen ||
        data.image ||
        "",

      imagen:
        data.imagen ||
        data.image ||
        "",

      category:
        data.categoria ||
        data.category ||
        "",

      categoria:
        data.categoria ||
        data.category ||
        "",

      material:
        data.material || "",

      decade: Number(
        data.decada ||
          data.decade ||
          0
      ),

      decada: Number(
        data.decada ||
          data.decade ||
          0
      ),

      slug:
        data.slug || "",

      description:
        data.descripcion ||
        data.description ||
        "",

      descripcion:
        data.descripcion ||
        data.description ||
        "",
    };
  });
}

// Adapta el carrito del frontend
// a la estructura que espera la API.
export function mapFrontendCartToApi(cart) {
  const items = Array.isArray(cart)
    ? cart
    : [];

  return {
    items: items.map((product) => ({
      productoId: String(product.id),

      cantidad:
        Number(product.cantidad) || 1,

      data: {
        nombre:
          product.name ||
          product.nombre ||
          "Producto",

        precio: Number(
          product.price ||
            product.precio ||
            0
        ),

        imagen:
          product.image ||
          product.imagen ||
          "",

        categoria:
          product.category ||
          product.categoria ||
          "",

        material:
          product.material || "",

        decada: Number(
          product.decade ||
            product.decada ||
            0
        ),

        slug:
          product.slug || "",

        descripcion:
          product.description ||
          product.descripcion ||
          "",
      },
    })),
  };
}