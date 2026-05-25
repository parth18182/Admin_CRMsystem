import axios from "axios";
import { useEffect, useState } from "react";
import ProductForm from "../components/ProductForm";

function Products() {
  const [products, setProducts] = useState([]);

  const [open, setOpen] = useState(false);

  const [editData, setEditData] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProducts();
  }, [open]);

  const getProducts = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "https://asgcrm-production.up.railway.app/admin/products",
      );

      setProducts(res.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(
        `https://asgcrm-production.up.railway.app/admin/products/${id}`,
      );

      getProducts();
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Products</h1>

        <button
          onClick={() => {
            setEditData(null);

            setOpen(true);
          }}
          className="
          rounded-xl
          bg-violet-600
          px-6 py-3
          text-white
          hover:bg-violet-700
          cursor-pointer
          "
        >
          + Add Product
        </button>
      </div>

      {loading ? (
        <h1 className="text-white">Loading...</h1>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {products?.map((product) => (
            <div
              key={product.id}
              className="
                rounded-3xl
                border border-white/10
                bg-white/5
                p-6
                hover:border-violet-500/30
                "
            >
              <h2 className="text-xl font-bold text-white">
                💊 {product.product_name}
              </h2>

              <div className="mt-5 flex gap-3">
                <button
                  onClick={() => {
                    setEditData(product);

                    setOpen(true);
                  }}
                  className="
                    flex-1
                    rounded-xl
                    bg-cyan-600
                    py-2
                    text-white
                    cursor-pointer
                    "
                >
                  Update
                </button>

                <button
                  onClick={() => deleteProduct(product.id)}
                  className="
                    flex-1
                    rounded-xl
                    bg-red-600
                    py-2
                    text-white
                    cursor-pointer
                    "
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {open && (
        <ProductForm
          setOpen={setOpen}
          editData={editData}
          refresh={getProducts}
        />
      )}
    </div>
  );
}

export default Products;
