import axios from "axios";
import { useEffect, useState } from "react";
import ProductForm from "../components/ProductForm";

function Products() {

  const [products, setProducts] =
    useState([]);

  const [open, setOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts =
    async () => {

      try {

        setLoading(true);

        const res =
          await axios.get(
            "https://asgcrm-production.up.railway.app/admin/products"
          );

        console.log(
          res.data
        );

        setProducts(
          res.data
        );

      } catch (error) {

        console.log(
          error.response?.data ||
          error.message
        );

      } finally {

        setLoading(false);

      }
    };

  return (
    <div>

      <div className="mb-8 flex items-center justify-between">

        <h1 className="text-3xl font-bold text-white">
          Products
        </h1>

        <button
          onClick={() =>
            setOpen(true)
          }
          className="
          rounded-xl
          bg-violet-600
          px-6 py-3
          text-white
          hover:bg-violet-700
          "
        >
          + Add Product
        </button>

      </div>

      {loading ? (

        <h1 className="text-white">
          Loading...
        </h1>

      ) : (

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {products?.map(
            (product) => (

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

              </div>

            )
          )}

        </div>

      )}

      {open && (
        <ProductForm
          setOpen={setOpen}
        />
      )}

    </div>
  );
}

export default Products;