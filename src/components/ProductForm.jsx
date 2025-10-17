"use client"

import { useState, useEffect } from "react"
import { useOrderStore } from "../store/orderStore"
import "./ProductForm.css"

function ProductForm({ product, onSuccess }) {
  const { addProduct, updateProduct } = useOrderStore()
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")

  useEffect(() => {
    if (product) {
      setName(product.name)
      setPrice(product.price)
      setCategory(product.category)
    }
  }, [product])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!name || !price || !category) {
      alert("Veuillez remplir tous les champs")
      return
    }

    if (product) {
      updateProduct(product.id, {
        name,
        price: Number.parseFloat(price),
        category,
      })
    } else {
      addProduct({
        name,
        price: Number.parseFloat(price),
        category,
      })
    }

    setName("")
    setPrice("")
    setCategory("")
    onSuccess()
  }

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h2>{product ? "Modifier le Produit" : "Ajouter un Nouveau Produit"}</h2>

      <div className="form-group">
        <label htmlFor="name">Nom du Produit</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex: Huile d'Olive Extra Vierge"
        />
      </div>

      <div className="form-group">
        <label htmlFor="price">Prix (DH)</label>
        <input
          id="price"
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Ex: 150"
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Catégorie</label>
        <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Sélectionner une catégorie</option>
          <option value="Huile">Huile</option>
          <option value="Olives">Olives</option>
          <option value="Savon">Savon</option>
          <option value="Autre">Autre</option>
        </select>
      </div>

      <button type="submit" className="btn-submit">
        {product ? "Mettre à Jour" : "Ajouter le Produit"}
      </button>
    </form>
  )
}

export default ProductForm
