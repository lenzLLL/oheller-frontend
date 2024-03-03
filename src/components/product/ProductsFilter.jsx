import { useEffect,useState } from "react";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import Checkbox from "./Checkbox";

export default function ProductsFilter({
  filters,
  checkboxHandler,
  volume,
  onProducts,
  interval,
  volumeHandler,
  storage,
  olData,
  categories,
  onCheckboxHandler,
  filterstorage,
  className,
  filterToggle,
  onCurrentCategory,
  filterToggleHandler,
}) {
  const [category,setCategory] = useState("Tout")
  useEffect(
    ()=>{
    },[interval]
  )
  const filter = (c = category) => {
    if(c)
    {
    setCategory(c)
    onCurrentCategory(c)
    }
    if(c !== "Tout")
    {
    let newData = olData.products.filter(p=>p.category === c)
    newData  = newData.filter(p=>parseInt(p.price)>=volume.min)
    newData  = newData.filter(p=>parseInt(p.price)<=volume.max)
    onProducts(newData)
    }
    else{
      let newData = olData.products
      newData  = newData.filter(p=>parseInt(p.price)>=volume.min)
      newData  = newData.filter(p=>parseInt(p.price)<=volume.max)
      onProducts(newData)  
    }


  }
  useEffect(
    ()=>{
    },[category,filter]
  )
  return (
    <>
      <div
        className={`filter-widget w-full fixed lg:relative left-0 top-0 h-screen z-10 lg:h-auto overflow-y-scroll lg:overflow-y-auto bg-white px-[30px] pt-[40px] ${
          className || ""
        }  ${filterToggle ? "block" : "hidden lg:block"}`}
      >
        <div className="filter-subject-item pb-10 mt-[90px] lg:mt-0 border-b border-qgray-border">
          <div className="subject-title mb-[30px]">
            <h1 className="text-black text-base font-500">
              Catégories
            </h1>
          </div>
          <div className="filter-items">
            <ul>
            <li className="item flex justify-between items-center mb-5">
                <div className="flex space-x-[14px] items-center">
                  <div onClick={()=>filter("Tout")}>
                    <Checkbox
                      id="mobileLaptop"
                      name="mobileLaptop"
                    
                      checked={"Tout" === category}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="mobileLaptop"
                      className="text-xs font-black font-400 capitalize"
                    >
                      Tout
                    </label>
                  </div>
                </div>
                <div>
                 
                </div>
              </li>
              {
               categories &&  categories.map(
                  (c,index)=>{
                    return (
                      <li onClick={()=>filter(c)} className="item flex justify-between items-center mb-5">
                <div className="flex space-x-[14px] items-center">
                  <div >
                    <Checkbox
                      id="mobileLaptop"
                      name="mobileLaptop"
                    
                      checked={c === category}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="mobileLaptop"
                      className="text-xs font-black font-400 capitalize"
                    >
                      {c}
                    </label>
                  </div>
                </div>
                <div>
                 
                </div>
              </li>
                    )
                  }
                )
              }
             
            </ul>
          </div>
        </div>
        <div className="filter-subject-item pb-10">
          <div className="subject-title mb-[30px]">
            <h1 className="text-black text-base font-500 mt-5">Interval de prix</h1>
          </div>
          <div className="price-range mb-5">
            <InputRange
              draggableTrack
              maxValue={parseInt(interval.max)}
              minValue={0}
              value={volume}
              onChange={volumeHandler}
            />
          </div>
          <p className="text-xs text-qblack font-400">
            Prix: {volume.min}XAF - {volume.max}XAF
          </p>
        </div>
        <button onClick={()=>onCheckboxHandler(false)} className="w-[100%] bg-blue-400 shadow-lg text-white rounded-md py-2 mb-5 lg:hidden">Appliquer</button>
         
      </div>
    </>
  );
}
