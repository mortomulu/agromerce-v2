import { Product } from "@/types/product";
import Action from "./Action";
import { getProducts } from "@/lib/crudProduct/dbData";
import Image from "next/image";
import { formatToRupiah } from "@/lib/formatPrice";

const TableAllProduct = async () => {
  const todos = await getProducts();

  return (
    <div className="w-fit  rounded-sm border-stroke  shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Product Name</p>
        </div>
        <div className="col-span-1 hidden items-center sm:flex">
          <p className="font-medium">Category</p>
        </div>
        <div className="col-span-1 flex items-center justify-center">
          <p className="font-medium">Price</p>
        </div>
        <div className="col-span-2 flex items-center ml-8">
          <p className="font-medium">Description</p>
        </div>
        <div className="col-span-1 flex items-center justify-center ml-[120px]">
          <p className="font-medium">Action</p>
        </div>
      </div>

      {todos.length > 0 ? (
        todos.map((product: Product, key: number) => (
          <div
            className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
            key={key}
          >
            <div className="col-span-2 flex items-center">
              <div className="flex items-center gap-4 sm:flex-row sm:items-center">
                <div className="h-12.5! w-15 flex rounded-md">
                  <Image
                    src={product.url_image}
                    width={50}
                    height={50}
                    alt="Product"
                    className="overflow-hidden w-auto h-auto"
                  />
                </div>
                <p className="text-sm text-black dark:text-white">
                  {product.product_name}
                </p>
              </div>
            </div>
            <div className="col-span-1 hidden items-center sm:flex">
              <p className="text-sm text-black dark:text-white">
                {product.product_category}
              </p>
            </div>
            <div className="col-span-1 flex items-center justify-center">
              <p className="text-sm text-black dark:text-white">
              {formatToRupiah(product.price)}
              </p>
            </div>
            <div className="col-span-2 flex items-center ml-8">
              <p className="text-sm text-black dark:text-white truncate">
                {product.desc}
              </p>
            </div>
            <Action product={product} id={product.id} />
          </div>
        ))
      ) : (
        <div className="px-4 py-4.5">
          <p className="text-sm text-black dark:text-white">
            No products available.
          </p>
        </div>
      )}
    </div>
  );
};

export default TableAllProduct;
