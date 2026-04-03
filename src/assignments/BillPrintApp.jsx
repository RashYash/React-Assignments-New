import React, { useState } from "react";
import "./BillPrintApp.css";

export default function BillPrintApp() {
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const handlePrintBill = () => {
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";

    iframe.addEventListener("load", () => {
      const doc = iframe.contentDocument;

      doc.querySelector("#itemName").innerHTML = itemName || "N/A";
      doc.querySelector("#itemPrice").innerHTML = price || "0";
      doc.querySelector("#itemQty").innerHTML = quantity || "0";
      doc.querySelector("#itemTotal").innerHTML =
        Number(price || 0) * Number(quantity || 0);

      iframe.contentWindow.print();

      setTimeout(() => {
        iframe.remove();
      }, 100);
    });

    iframe.src = `${process.env.PUBLIC_URL}/bill-template.html`;

    document.body.appendChild(iframe);
  };

  return (
    <div className="bill-form-container">
      <h1 className="bill-title">Invoice Bill Generator</h1>

      <input
        type="text"
        placeholder="Enter Item Name"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        className="bill-input"
      />

      <input
        type="number"
        placeholder="Enter Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="bill-input"
      />

      <input
        type="number"
        placeholder="Enter Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        className="bill-input"
      />

      <button onClick={handlePrintBill} className="bill-button">
        Print Your Bill
      </button>
    </div>
  );
}
