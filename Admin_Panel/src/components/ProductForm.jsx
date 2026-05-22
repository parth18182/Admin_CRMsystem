import axios from "axios";
import { useState } from "react";

function ProductForm({ setOpen }) {
  const [productName, setProductName] = useState("");

  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!productName) {
      alert("Product name required");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "https://asgcrm-production.up.railway.app/admin/products",
        {
          product_name: productName,
        },
      );

      console.log("success:", res.data);

      setProductName("");

      setOpen(false);
    } catch (error) {
      console.log(error.response?.data || error.message);

      alert("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70">
      <div className="w-full max-w-lg rounded-3xl bg-[#161625] p-8 border border-white/10">
        <div className="mb-6 flex justify-between">
          <h1 className="text-2xl font-bold text-white">Add Product</h1>

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
            onClick={submit}
            disabled={loading}
            className="
            w-full
            rounded-xl
            bg-violet-600
            py-4
            text-white
            hover:bg-violet-700
            disabled:opacity-50
            "
          >
            {loading ? "Saving..." : "Save Product"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductForm;
