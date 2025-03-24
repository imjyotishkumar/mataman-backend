const express = require("express");
const crypto = require("crypto");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

// \uD83D\uDD17 Cashfree Production URLs
const CASHFREE_API_BASE = "https://api.cashfree.com/pg/orders";

// ✅ Check if environment variables are set
if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET) {
    console.error("\u274C Missing Cashfree CLIENT_ID or CLIENT_SECRET in environment variables.");
}

// \uD83D\uDD10 API Headers
const cashfreeHeaders = {
    "Content-Type": "application/json",
    "x-client-id": process.env.CLIENT_ID,
    "x-client-secret": process.env.CLIENT_SECRET,
    "x-api-version": "2021-05-21"
};

// \uD83C\uDFB2 Generate Unique Order ID
function generateOrderId() {
    return "order_" + Date.now();
}

// ✅ Step 1: Create Payment Order
router.post("/payment", async (req, res) => {
    try {
        const { customer_id, customer_name, customer_email, customer_phone } = req.body.customer_details;
        
        if (!customer_id || !customer_name || !customer_email || !customer_phone) {
            return res.status(400).json({ error: "All customer details are required" });
        }

        const orderId = generateOrderId();
        const requestData = {
            "order_amount": req.body.order_amount || 1.00,
            "order_currency": req.body.order_currency || "INR",
            "order_id": orderId,
            "customer_details": { customer_id, customer_name, customer_email, customer_phone }
        };

        const response = await axios.post(CASHFREE_API_BASE, requestData, { headers: cashfreeHeaders });

        console.log("\u2705 Order Created:", response.data);
        res.json(response.data);
    } catch (error) {
        console.error("\u274C Error:", error.response?.data || error.message);
        res.status(500).json({ error: error.response?.data || error.message });
    }
});

// ✅ Step 2: Verify Payment
router.post("/verify", async (req, res) => {
    try {
        const { orderId } = req.body;
        const response = await axios.get(`${CASHFREE_API_BASE}/${orderId}/payments`, { headers: cashfreeHeaders });

        console.log("\u2705 Payment Verified:", response.data);
        res.json(response.data);
    } catch (error) {
        console.error("\u274C Error:", error.response?.data || error.message);
        res.status(500).json({ error: error.response?.data || error.message });
    }
});

module.exports = router;
