"use client"

import { useState } from "react"
import { useOrderStore } from "../store/orderStore"
import "./OrderForm.css"

function OrderForm({ onSuccess }) {
  const { products, addOrder } = useOrderStore()
  const [customerName, setCustomerName] = useState("")
  const [phone, setPhone] = useState("")
  const [items, setItems] = useState([{ productId: "", quantity: 1 }])

  const handleAddItem = () => {
    setItems([...items, { productId: "", quantity: 1 }])
  }

  const handleRemoveItem = (index) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const handleItemChange = (index, field, value) => {
    const newItems = [...items]
    newItems[index][field] = field === "quantity" ? Number.parseInt(value) : value
    setItems(newItems)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!customerName || !phone || items.length === 0) {
      alert("Veuillez remplir tous les champs")
      return
    }

    // Validate that all items have a product selected
    if (items.some((item) => !item.productId)) {
      alert("Veuillez sélectionner un produit pour chaque article")
      return
    }

    // Create order with product prices
    const orderItems = items.map((item) => {
      const product = products.find((p) => p.id === Number.parseInt(item.productId))
      return {
        productId: Number.parseInt(item.productId),
        quantity: item.quantity,
        price: product.price,
      }
    })

    addOrder({
      customerName,
      phone,
      items: orderItems,
      status: "Pending",
    })

    // Reset form
    setCustomerName("")
    setPhone("")
    setItems([{ productId: "", quantity: 1 }])
    onSuccess()
  }

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <h2>Créer une Nouvelle Commande</h2>

      <div className="form-group">
        <label htmlFor="customerName">Nom du Client</label>
        <input
          id="customerName"
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="Ex: Ahmed Hassan"
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Téléphone</label>
        <input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Ex: 0612345678"
        />
      </div>

      <div className="items-section">
        <h3>Articles</h3>
        {items.map((item, index) => (
          <div key={index} className="item-row">
            <select value={item.productId} onChange={(e) => handleItemChange(index, "productId", e.target.value)}>
              <option value="">Sélectionner un produit</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} - {product.price.toFixed(2)} DH
                </option>
              ))}
            </select>
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
            />
            {items.length > 1 && (
              <button type="button" className="btn-remove" onClick={() => handleRemoveItem(index)}>
                Supprimer
              </button>
            )}
          </div>
        ))}
        <button type="button" className="btn-add-item" onClick={handleAddItem}>
          + Ajouter un Article
        </button>
      </div>

      <button type="submit" className="btn-submit">
        Créer la Commande
      </button>
    </form>
  )
}

export default OrderForm
