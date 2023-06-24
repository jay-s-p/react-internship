import React, { useEffect, useState } from "react";
import ProductCard from './ProductCard'
import grocery from "./../assets/data/grocery.json";

let categoriesSet = new Set();
grocery.map(product => product.categories.map(categories => categoriesSet.add(categories)))
const category = Array.from(categoriesSet);

const DisplayProducts = props => {
  const [categories, setCategories] = useState("all");
  const [catProducts, setCatProducts] = useState(grocery);

  useEffect(() => {
    if (categories == "all") {
      setCatProducts(grocery);
    }
    else if (categories.includes("search"))
      setCatProducts(grocery.filter(item => {
        let search = categories.split("search")[1].toLowerCase();
        return item.product_name.toLowerCase().includes(search)
      }))
    else {
      setCatProducts(grocery.filter((item) => item.categories[0] == categories))
    }
    console.log(catProducts)
  }, [categories])

  return (
    <>
      <div className="col-lg-8 pt-3 px-0 pe-3 ps-3" style={{ height: "90vh" }}>
        <div className="card bg-transparent border-0" style={{ height: "100%" }}>
          <div className="card-body overflow-auto d-flex flex-column scrollbar-style-1 rounded-3 pb-0" >
            {/* Search bar */}
            <div className=" mx-auto mb-3 mt-3" style={{ width: "100%" }}>
              <input
                onChange={(event) => {
                  if (event.target.value == "") {
                    document.getElementById("catItemAll").checked = true;
                    return;
                  }
                  var ele = document.getElementsByName("btn-radio");
                  // Setting all categories unselectd
                  for (var i = 0; i < ele.length; i++)
                    ele[i].checked = false

                  setCategories("search" + event.target.value)
                }}
                type="text" className="form-control search-bar bg-transparent" id="product" placeholder="Enter Product Name" name="product" />

            </div>
            {/* Category bar */}
            <div className="d-flex flex-shrink-0 gap-3 " id="exp-2" style={{ height: "4em", alignItems: "center" }}>
              {/* <div style={{ height: "50%", width: "10px", margin: "auto 0", flexShrink: 0 }}></div> */}
              <input type="radio" className="btn-check" name="btn-radio" id="catItemAll" autoComplete="off" defaultChecked />
              <label className="btn btn-outline-dark" htmlFor="catItemAll" onClick={() => setCategories("all")}>All</label>
              <div style={{ height: "50%", width: "2px", background: "#aaa", margin: "auto 0", flexShrink: 0 }}></div>
              <div className="d-flex gap-3 overflow-auto  scrollbar-style-0">
                {
                  category.map((item) => {
                    // console.log(item);
                    return (
                      <>
                        {/* <div className="btn-group" role="group" aria-label="Basic checkbox toggle button group"> */}
                        <input type="radio" className="btn-check" name="btn-radio" id={"catItem" + item} autoComplete="off" />
                        <label className="btn btn-outline-dark " htmlFor={"catItem" + item} onClick={() => setCategories(item)}>{item}</label>
                        {/* </div> */}
                      </>
                    )
                  })
                }
              </div>
              <div style={{ height: "50%", width: "10px", margin: "auto 0", flexShrink: 0 }}></div>
            </div>
            {/* Products */}
            <div id="exp-1" className="d-flex justify-content-evenly flex-wrap overflow-auto scrollbar-style-0 px-1 rounded-4 pb-3">
              {catProducts.map(item => {
                console.log(item);
                return <ProductCard item={item} setTotalPrice={props.setTotalPrice} setCartItem={props.setCartItem} />
              }
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DisplayProducts;