"use client"

import { useState } from "react"
import { useOrderStore } from "../store/orderStore"
import { Link } from "react-router-dom"
import OrderForm from "../components/OrderForm"
import "./Orders.css"

function Orders() {
  const { orders, deleteOrder } = useOrderStore()
  const [filter, setFilter] = useState("All")
  const [showForm, setShowForm] = useState(false)

  // Filter orders by status
  const filteredOrders = filter === "All" ? orders : orders.filter((order) => order.status === filter)

  const handleDelete = (orderId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette commande ?")) {
      deleteOrder(orderId)
    }
  }

  return (
    <div className="orders-page">
      <div className="orders-header">
        <h1>Gestion des Commandes</h1>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Annuler" : "+ Nouvelle Commande"}
        </button>
      </div>

      {showForm && (
        <div className="form-container">
          <OrderForm onSuccess={() => setShowForm(false)} />
        </div>
      )}

      {/* Filter Buttons */}
      <div className="filter-buttons">
        {["All", "Pending", "Prepared", "Delivered"].map((status) => (
          <button
            key={status}
            className={`filter-btn ${filter === status ? "active" : ""}`}
            onClick={() => setFilter(status)}
          >
            {status === "All" ? "Toutes" : status}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="orders-list">
        {filteredOrders.length === 0 ? (
          <p className="no-orders">Aucune commande trouvée</p>
        ) : (
          filteredOrders.map((order) => {
            const total = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
            return (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <h3>Commande #{order.id}</h3>
                  <span className={`status-badge ${order.status.toLowerCase()}`}>{order.status}</span>
                </div>
                <div className="order-info">
                  <p>
                    <strong>Client:</strong> {order.customerName}
                  </p>
                  <p>
                    <strong>Téléphone:</strong> {order.phone}
                  </p>
                  <p>
                    <strong>Articles:</strong> {order.items.length}
                  </p>
                  <p>
                    <strong>Total:</strong> {total.toFixed(2)} DH
                  </p>
                </div>
                <div className="order-actions">
                  <Link to={`/orders/${order.id}`} className="btn-secondary">
                    Détails
                  </Link>
                  <button className="btn-danger" onClick={() => handleDelete(order.id)}>
                    Supprimer
                  </button>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default Orders
