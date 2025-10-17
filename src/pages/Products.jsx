"use client"

import { useState } from "react"
import { useOrderStore } from "../store/orderStore"
import ProductForm from "../components/ProductForm"
import "./Products.css"

function Products() {
  const { products, deleteProduct } = useOrderStore()
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)

  const handleEdit = (product) => {
    setEditingProduct(product)
    setShowForm(true)
  }

  const handleDelete = (productId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      deleteProduct(productId)
    }
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingProduct(null)
  }

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>Gestion des Produits</h1>
        <button
          className="btn-primary"
          onClick={() => {
            setEditingProduct(null)
            setShowForm(!showForm)
          }}
        >
          {showForm ? "Annuler" : "+ Nouveau Produit"}
        </button>
      </div>

      {showForm && (
        <div className="form-container">
          <ProductForm product={editingProduct} onSuccess={handleFormClose} />
        </div>
      )}

      {/* Products Grid */}
      <div className="products-grid">
        {products.length === 0 ? (
          <p className="no-products">Aucun produit pour le moment</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-icon">🫒</div>
              <h3>{product.name}</h3>
              <p className="category">{product.category}</p>
              <p className="price">{product.price.toFixed(2)} DH</p>
              <div className="product-actions">
                <button className="btn-edit" onClick={() => handleEdit(product)}>
                  Modifier
                </button>
                <button className="btn-delete-small" onClick={() => handleDelete(product.id)}>
                  Supprimer
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Products
