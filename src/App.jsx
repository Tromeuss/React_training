import {useState} from 'react'
import {Input} from './components/forms/input.jsx'
import { Checkbox } from './components/forms/checkbox.jsx'
import {ProductCategorieRow} from './components/forms/products/productCategorieRow.jsx'
import {ProductRow} from './components/forms/products/productRow.jsx'
import {Range} from './components/forms/range.jsx'


const PRODUCTS = [  
    {category: "Fruits", price: "$1", stocked: true, name: "Apple", prices: 1},  
    {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit", prices: 1},  
    {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit", prices: 2},  
    {category: "Vegetables", price: "$2", stocked: true, name: "Spinach", prices: 2},  
    {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin", prices: 4},  
    {category: "Vegetables", price: "$1", stocked: true, name: "Peas", prices: 1},  
]

function App() {
    const [showStockOnly, setShowStockOnly] = useState(false)
    const [search, setSearch] = useState('')
    const [range, setRange] = useState(0)
    const visibleProducts = PRODUCTS.filter(product => {
        if (showStockOnly && !product.stocked) {
            return false
        }
        if (search && !product.name.toLowerCase().includes(search.toLowerCase())) {
            return false
        } if (range && product.prices > range) {
            return false
        }
        return true
    })



     return <div className='container my-3'>
        <SearchBar 
        showStockOnly={showStockOnly} 
        onStockOnlyChanged={setShowStockOnly}
        search={search}
        onSearchChange={setSearch}
        range={range}
        onRangeChange={setRange}/>
        <ProductTable products={visibleProducts}/>
    </div> 
}



function SearchBar({showStockOnly, onStockOnlyChanged, search, onSearchChange, range, onRangeChange}) {
    return <div>
        <div className='mb-3'>
            <Input 
            value={search}
            onChange={onSearchChange } 
            placeholder="Rechercher..."/>
            <Range 
            value={range} 
            onChange={onRangeChange}/>
            <Checkbox 
            id='stocked' 
            checked={showStockOnly} 
            onChange={onStockOnlyChanged} 
            label="N'affichez que les produits en stock"/>
        </div>
    </div>
}

function ProductTable ({products}) {
    const rows = []
    let lastCategory = null

    for (let product of products) {
        if (product.category !== lastCategory) {
            rows.push(<ProductCategorieRow key={product.category} name={product.category}/>)
        }
        lastCategory = product.category
        rows.push(<ProductRow key={product.name} product={product}/>)

    }   


    return <table className='table'>
        <thead>
            <tr>
                <th>Nom</th>
                <th>Prix</th>
            </tr>
        </thead>
        <tbody>
            {rows}
        </tbody>
    </table>
}



export default App