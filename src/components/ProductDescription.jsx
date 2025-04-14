const ProductDescription = ({ part }) => {
    return (
      <div className="prod-desc-container">
        <div className="desc prod-title"><p className="desctxt">{part.part_type}</p></div>
        <div className="desc prod-stock"><p className="desctxt">In Stock</p></div>
        <div className="desc prod-price"><p className="desctxt">${part.price}</p></div>
        <div className="desc prod-desc"><p className="desctxt">Description: {part.part_description}</p></div>
        <div className="desc prod-dim"><p className="desctxt">Dimensions: {part.dimensions}</p></div>
        <div className="desc prod-weight"><p className="desctxt">Weight: {part.part_weight} lbs</p></div>
        <div className="desc prod-type"><p className="desctxt">Type: {part.part_type}</p></div>
        <div className="desc prod-category"><p className="desctxt">Category: {part.part_category}</p></div>
      </div>
    );
  };
  
  export default ProductDescription;
  