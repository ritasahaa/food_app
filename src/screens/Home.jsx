import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
// import Carousel from "../components/Carousel";
import { useEffect, useState } from "react";

const Home = () => {
  const [search,setSearch]=useState("")
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        let response = await fetch("http://localhost:5000/api/foodData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          }
        });
        response = await response.json();
        console.log(response);
        setFoodCat(response[1]);
        setFoodItem(response[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    loadData();
  }, []);

  return (
    <>
      <Navbar />

      {/* carousel component---- */}
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
        <div className="carousel-inner" id="carousel">

          <div className="carousel-caption" style={{ zIndex: "10" }}>
            <form className="d-flex justify-content-center">
              <input 
              className="form-control me-2" 
              type="search" 
              placeholder="search" 
              aria-label="search" 
              value={search}
              onChange={(e)=>{setSearch(e.target.value)}}
              />
              {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
            </form>
          </div>

          <div className="carousel-item active">
            <img src="https://source.unsplash.com/random/900*700?burger" className="d-block w-100" alt="..." style={{ filter: "brightness(30%)" }} />
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/random/900*700?pastry" className="d-block w-100" alt="..." style={{ filter: "brightness(30%)" }} />
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/random/900*700?barbeque" className="d-block w-100" alt="..." style={{ filter: "brightness(30%)" }} />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* card component---- */}
      <div className="container">
        {foodCat.length !== 0 ? (
          foodCat.map((data) => (
            <div key={data._id} className="row mb-3">
              <div className="col">
                <h1>{data.CategoryName}</h1>
                <hr />
                <div className="row">
                  {foodItem.length !== 0 ? (
                    foodItem
                      .filter((item) => item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search.toLowerCase()))    //search functionality
                      .map((filterItem) => (
                        <div key={filterItem._id} className="col-12 col-md-6 col-lg-3">
                          <Card
                            foodName={filterItem.name}
                            options={filterItem.options[0]}
                            imgSrc={filterItem.img}
                          />
                        </div>
                      ))
                  ) : (
                    <div className="col">
                      <h3>no data found</h3>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : null}
      </div>

      <Footer />
    </>
  );
};

export default Home;
