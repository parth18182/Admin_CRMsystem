import axios from "axios";
import { useEffect, useState } from "react";

function ProductForm({ setOpen, editData, refresh }) {
  const [productName, setProductName] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editData) {
      setProductName(editData.product_name);
    }
  }, [editData]);

  const submit = async () => {
    if (!productName) {
      return alert("Product required");
    }

    try {
      setLoading(true);

      if (editData) {
        await axios.put(
          `https://asgcrm-production.up.railway.app/admin/products/${editData.id}`,
          {
            product_name: productName,
          },
        );
      } else {
        await axios.post(
          "https://asgcrm-production.up.railway.app/admin/products",
          {
            product_name: productName,
          },
        );
      }

      refresh();

      setOpen(false);
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70">
      <div
        className="
        w-full
        max-w-lg
        rounded-3xl
        border border-white/10
        bg-[#161625]
        p-8
        "
      >
        <div className="mb-6 flex justify-between">
          <h1 className="text-2xl font-bold text-white">
            {editData ? "Update Product" : "Add Product"}
          </h1>

          <button onClick={() => setOpen(false)} className="text-red-400">
            ✕
          </button>
        </div>

        <div className="space-y-5">
          <input
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Product Name"
            className="
            w-full
            rounded-xl
            border border-white/10
            bg-white/5
            p-4
            text-white
            "
          />

          <button
            disabled={loading}
            onClick={submit}
            className="
            w-full
            rounded-xl
            bg-violet-600
            py-4
            text-white
            cursor-pointer
            "
          >
            {loading
              ? "Saving..."
              : editData
                ? "Update Product"
                : "Save Product"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductForm;
