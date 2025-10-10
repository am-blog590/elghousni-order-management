import React, { useState } from "react";

export default function OrderForm({ products }) {
  const [clientName, setClientName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [orders, setOrders] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!clientName || !phone || !selectedProduct) {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    const product = products.find((p) => p.id === parseInt(selectedProduct));

    const newOrder = {
      id: Date.now(),
      clientName,
      phone,
      productName: product.name,
      quantity,
      total: product.price * quantity,
      status: "En attente",
    };

    setOrders([...orders, newOrder]);

                                  // Remettre le formulaire à zéro
    setClientName("");
    setPhone("");
    setSelectedProduct("");
    setQuantity(1);
  };

  return (
    <div className="order-form">
      <h2>Nouvelle Commande</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom du client :</label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Ex: Fatima"
          />
        </div>

        <div>
          <label>Téléphone :</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Ex: 0612345678"
          />
        </div>

        <div>
          <label>Produit :</label>
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
          >
            <option value="">-- Sélectionner un produit --</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} — {p.price} MAD
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Quantité :</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </div>

        <button type="submit">Ajouter la commande</button>
      </form>

                                  {/* Affichage rapide des commandes ajoutées */}
      <h3>Commandes enregistrées</h3>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            {order.clientName} - {order.productName} ({order.quantity}) ={" "}
            <strong>{order.total} MAD</strong> [{order.status}]
          </li>
        ))}
      </ul>
    </div>
  );
}
