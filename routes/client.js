const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const verifyTenant = require("../middleware/verifyTenant");
const router = express.Router();
const Invoice = require("../models/Invoice");
const Payment = require("../models/Payment");
const { Op } = require("sequelize");
const Bill = require("../models/Bill");
const House = require("../models/House");

//get payments
router.post("/payments", verifyToken, verifyTenant, (req, res) => {
	Payment.findAll({
		where: {
			instLinker: req.body.instLinker,
			invoiceLinker: { [Op.in]: req.body.invoiceLinkers },
		},
	})
		.then((payments) => {
			res.json({ payments, status: 200 });
		})
		.catch((err) =>
			res.json({
				status: 500,
				message: "Unknown error",
			})
		);
});

//get invoices
router.post("/invoices", verifyToken, verifyTenant, (req, res) => {
	Invoice.findAll({
		where: {
			instLinker: req.body.instLinker,
			tenantLinker: req.credLinker,
		},
	})
		.then((invoices) => {
			res.json({ invoices, status: 200 });
		})
		.catch((err) =>
			res.json({
				status: 500,
				message: "Unknown error",
			})
		);
});

//get bills
router.post("/bills", verifyToken, verifyTenant, (req, res) => {
	Bill.findAll({
		where: {
			instLinker: req.body.instLinker,
		},
	})
		.then((bills) => {
			res.json({ bills, status: 200 });
		})
		.catch((err) =>
			res.json({
				status: 500,
				message: "Unknown error",
			})
		);
});

//get tenant house
router.post("/house", verifyToken, verifyTenant, (req, res) => {
	House.findOne({
		where: {
			linker: req.body.houseLinker,
		},
		order: [["linker", "DESC"]],
	})
		.then((house) => {
			res.json({ house, status: 200 });
		})
		.catch((err) =>
			res.json({
				status: 500,
				message: "Unknown error",
			})
		);
});

module.exports = router;
