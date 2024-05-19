import React from 'react'

const Card = (props) => {
   let options=props.options;
   let priceOptions=Object.keys(options);
   const handleAddToCart = () =>{
    
   }

    return (
        <div >
            <div >
                <div className="card m-4 " style={{ "width": "18rem", "maxHeight": "360px" }}>
                    <img src={props.imgSrc} className="card-img-top" alt="..." style={{height:"120px",objectFit:"fill"}}/>
                    <div className="card-body">
                        <h5 className="card-title">{props.foodName}</h5>
                        {/* <p className="card-text">This is some Important text.</p> */}
                        <div className="container w-100">
                            <select className="m-2 h-100 bg-success rounded">
                                {Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    )
                                })}
                            </select>

                            <select className="m-2 h-100 bg-success rounded">
                               {priceOptions.map((data)=>{
                                  return <option key={data} value={data}>{data}</option>
                               })}
                            </select>
                            
                            {/* <br/> */}
                            <div className="d-block fs-5 ">
                                Total Price
                            </div>
                        </div>
                    </div>
                    
                    <hr  className="ms-3" style={{ width: "260px" }}/>
                    <button className="btn btn-success justify-center ms-5 mb-3 " 
                     style={{ width: "115px" }} 
                    onClick={handleAddToCart}>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}

export default Card