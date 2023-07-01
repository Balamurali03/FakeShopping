import { useState, useEffect } from 'react';
function Items() {
    let [data, setData] = useState([]);
    useEffect(() => {
        fetch('https://fakestoreapi.com/products') 
            .then(res => res.json())
            .then(data => { console.log(data); setData(data) })


    }, [])
    console.log("the data are" + data);
    return (
        <div>
            {data != null && <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(19rem, 1fr))", rowGap: "2rem", overflowWrap: "break-word" }}>
                {
                    data.map((datum) => {
                        return (
                            <div>
                                <div class="card" style={{ width: "18rem" }}>
                                    <img src={datum.image} class="card-img-top" alt="..." />
                                    <div class="card-body">
                                        <h5 class="card-title">{datum.category}</h5>
                                        <p class="card-text">{datum.description
                                        }</p>
                                        
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>}</div>
    )
}
export default Items;