"use client"
import { useParams, useNavigate } from "react-router-dom"
import { useOrderStore } from "../store/orderStore"
import "./OrderDetails.css"

function OrderDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { orders, products, updateOrderStatus, deleteOrder } = useOrderStore()

  const order = orders.find((o) => o.id === Number.parseInt(id))

  if (!order) {
    return (
      <div className="order-details">
        <button className="btn-back" onClick={() => navigate("/orders")}>
          ← Retour
        </button>
        <p className="not-found">Commande non trouvée</p>
      </div>
    )
  }

  const handleStatusChange = (newStatus) => {
    updateOrderStatus(order.id, newStatus)
  }

  const handleDelete = () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette commande ?")) {
      deleteOrder(order.id)
      navigate("/orders")
    }
  }

  const total = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="order-details">
      <button className="btn-back" onClick={() => navigate("/orders")}>
        ← Retour aux Commandes
      </button>

      <div className="details-container">
        <div className="details-header">
          <h1>Commande #{order.id}</h1>
          <span className={`status-badge ${order.status.toLowerCase()}`}>{order.status}</span>
        </div>

        {/* Customer Information */}
        <div className="details-section">
          <h2>Informations Client</h2>
          <div className="info-grid">
            <div className="info-item">
              <label>Nom du Client</label>
              <p>{order.customerName}</p>
            </div>
            <div className="info-item">
              <label>Téléphone</label>
              <p>{order.phone}</p>
            </div>
            <div className="info-item">
              <label>Date de Commande</label>
              <p>{new Date(order.date).toLocaleDateString("fr-FR")}</p>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="details-section">
          <h2>Articles Commandés</h2>
          <div className="items-table">
            <table>
              <thead>
                <tr>
                  <th>Produit</th>
                  <th>Quantité</th>
                  <th>Prix Unitaire</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, index) => {
                  const product = products.find((p) => p.id === item.productId)
                  return (
                    <tr key={index}>
                      <td>{product?.name || "Produit supprimé"}</td>
                      <td>{item.quantity}</td>
                      <td>{item.price.toFixed(2)} DH</td>
                      <td className="item-total">{(item.price * item.quantity).toFixed(2)} DH</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Summary */}
        <div className="details-section summary">
          <div className="summary-item">
            <span>Sous-total:</span>
            <span>{total.toFixed(2)} DH</span>
          </div>
          <div className="summary-item total">
            <span>Total:</span>
            <span>{total.toFixed(2)} DH</span>
          </div>
        </div>

        {/* Status Management */}
        <div className="details-section">
          <h2>Gérer le Statut</h2>
          <div className="status-buttons">
            {["Pending", "Prepared", "Delivered"].map((status) => (
              <button
                key={status}
                className={`status-btn ${order.status === status ? "active" : ""}`}
                onClick={() => handleStatusChange(status)}
              >
                {status === "Pending" && "⏳ En Attente"}
                {status === "Prepared" && "✓ Préparée"}
                {status === "Delivered" && "🚚 Livrée"}
              </button>
            ))}
          </div>
        </div>

        {/* Delete Button */}
        <div className="details-section">
          <button className="btn-delete" onClick={handleDelete}>
            Supprimer cette Commande
          </button>
        </div>
      </div>
    </div>
  )
}

export default OrderDetails
