
function ProductCard(props){ 

    return (
        <ul className={props.data.length > 0 ? "list-group container grid gap-4 grid-cols-1 sm:grid-cols-2 p-8":' container'}>
            { props.data.length > 0 ? props.data.map((listitem, idx)=> ( <li key={idx} className="w-full  overflow-hidden rounded-lg shadow-lg sm:flex flex-col">
                <a href={listitem.url}>
                    {listitem.img &&<div className="w-full">
                        <img className="object-cover w-full h-48" src="https://images.pexels.com/photos/853199/pexels-photo-853199.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="Flower and sky"/>
                    </div> }
                    <div className=" w-full flex-1  px-6 py-4">
                        <h4 className="text-m font-semibold flex-wrap tracking-tight w-full text-gray-800">{listitem.title}</h4>
                        <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full mb-3 ">Sentiment Score: {Math.round(listitem.sentimentScore * 100)}</span>
                        <p className="leading-normal text-gray-700 max-w-md text-ellipsis max-h-full truncate ">{listitem.selftext}</p>
                    </div>
                </a>
            </li>)) : <li  className="w-full text-center p-10"> <span className=" ">No Results Found :(</span> </li>
            }
        </ul>
    )
}   
export default ProductCard;
