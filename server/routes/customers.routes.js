const express = require("express");
const prisma = require("../prisma");
const validate = require("../middlewares/validate");
const { customerSchema } = require("../schemas/customer.schema");

const router = express.Router();

// GET: دریافت همه مشتریان
router.get("/", async (req, res, next) => {
  try {
    const customers = await prisma.customer.findMany();
    res.json(customers);
  } catch (error) {
    next(error);
  }
});

// GET: دریافت یک مشتری
router.get("/:id", async (req, res, next) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      message: "Invalid customer ID",
    });
  }

  try {
    const customer = await prisma.customer.findUnique({
      where: { id },
    });

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    res.json(customer);
  } catch (error) {
    next(error);
  }
});

// POST: ثبت مشتری
router.post("/", validate(customerSchema), async (req, res, next) => {
  const { name, phone, city } = req.validatedData;

  try {
    const customer = await prisma.customer.create({
      data: { name, phone, city },
    });

    res.status(201).json(customer);
  } catch (error) {
    next(error);
  }
});

// PUT: ویرایش مشتری
router.put("/:id", validate(customerSchema), async (req, res, next) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      message: "Invalid customer ID",
    });
  }

  const { name, phone, city } = req.validatedData;

  try {
    const customer = await prisma.customer.update({
      where: { id },
      data: { name, phone, city },
    });

    res.status(200).json(customer);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    next(error);
  }
});

// DELETE: حذف مشتری
router.delete("/:id", async (req, res, next) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      message: "Invalid customer ID",
    });
  }

  try {
    const customer = await prisma.customer.findUnique({
      where: { id },
    });

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    const serviceCount = await prisma.service.count({
      where: { customerId: id },
    });

    if (serviceCount > 0) {
      return res.status(409).json({
        message: "This customer has registered services",
      });
    }

    await prisma.customer.delete({
      where: { id },
    });

    res.json({
      message: "Customer deleted successfully",
      customer,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
