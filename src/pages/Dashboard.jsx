import { useOrderStore } from "../store/orderStore"
import { Link } from "react-router-dom"
import "./Dashboard.css"

function Dashboard() {
  const { orders, products } = useOrderStore()

  // Calculate statistics
  const totalOrders = orders.length
  const pendingOrders = orders.filter((o) => o.status === "Pending").length
  const preparedOrders = orders.filter((o) => o.status === "Prepared").length
  const deliveredOrders = orders.filter((o) => o.status === "Delivered").length

  const totalRevenue = orders.reduce((sum, order) => {
    const orderTotal = order.items.reduce((itemSum, item) => itemSum + item.price * item.quantity, 0)
    return sum + orderTotal
  }, 0)

  const recentOrders = orders.slice(-5).reverse()

  return (
    <div className="dashboard">
      <h1>Tableau de Bord</h1>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-content">
            <h3>Total Commandes</h3>
            <p className="stat-number">{totalOrders}</p>
          </div>
        </div>

        <div className="stat-card pending">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <h3>En Attente</h3>
            <p className="stat-number">{pendingOrders}</p>
          </div>
        </div>

        <div className="stat-card prepared">
          <div className="stat-icon">✓</div>
          <div className="stat-content">
            <h3>Préparées</h3>
            <p className="stat-number">{preparedOrders}</p>
          </div>
        </div>

        <div className="stat-card delivered">
          <div className="stat-icon">🚚</div>
          <div className="stat-content">
            <h3>Livrées</h3>
            <p className="stat-number">{deliveredOrders}</p>
          </div>
        </div>

        <div className="stat-card revenue">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <h3>Revenu Total</h3>
            <p className="stat-number">{totalRevenue.toFixed(2)} DH</p>
          </div>
        </div>

        <div className="stat-card products">
          <div className="stat-icon">🫒</div>
          <div className="stat-content">
            <h3>Produits</h3>
            <p className="stat-number">{products.length}</p>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="recent-orders">
        <h2>Commandes Récentes</h2>
        {recentOrders.length === 0 ? (
          <p className="no-data">Aucune commande pour le moment</p>
        ) : (
          <div className="orders-table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Client</th>
                  <th>Téléphone</th>
                  <th>Statut</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => {
                  const total = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
                  return (
                    <tr key={order.id}>
                      <td>#{order.id}</td>
                      <td>{order.customerName}</td>
                      <td>{order.phone}</td>
                      <td>
                        <span className={`status-badge ${order.status.toLowerCase()}`}>{order.status}</span>
                      </td>
                      <td>{total.toFixed(2)} DH</td>
                      <td>
                        <Link to={`/orders/${order.id}`} className="btn-small">
                          Voir
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
