import Products from "../data/products.json"
function ProductSelector() {
    return (
        <>
        <div className="products-holder">
            {Products.map((product) => (
                
                    <div key={product.id} className="card-product">
                        <h1>{product.name}</h1>
                        <h2>{product.quantity} qté</h2>
                        <input type="checkbox" />
                        
                        <p>{
                            Intl.NumberFormat("fr-MA", {
                                style: 'currency',
                                currency: "MAD"
                            }).format(product.price)
                        }</p>
                    </div>
            ))}
        </div>
        <button style={{padding:"20px",alignItems:"30px",marginLeft:"600px",marginTop:"30px",borderRadius:"20px",background:"blue",border:"1px solid black",color:"white"}}>Send dommend</button>
        </>
    )

}

export default ProductSelector 