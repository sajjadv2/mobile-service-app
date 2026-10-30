const express = require("express");
const prisma = require("../prisma");
const validate = require("../middlewares/validate");
const { serviceSchema } = require("../schemas/service.schema");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const services = await prisma.service.findMany({
      include: {
        customer: true,
      },
    });
    res.json(services);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      message: "invalid service Id",
    });
  }

  try {
    const service = await prisma.service.findUnique({
      where: { id },
      include: {
        customer: true,
      },
    });
    if (!service) {
      return res.status(404).json({
        message: "service not found",
      });
    }
    res.status(200).json(service);
  } catch (error) {
    next(error);
  }
});

router.post("/", validate(serviceSchema), async (req, res, next) => {
  const { customerId, device, serviceType, status, cost } = req.validatedData;

  try {
    const customer = await prisma.customer.findUnique({
      where: { id: customerId },
    });

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    const service = await prisma.service.create({
      data: {
        customerId,
        device,
        serviceType,
        status,
        cost,
      },
      include: {
        customer: true,
      },
    });

    res.status(201).json(service);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", validate(serviceSchema), async (req, res, next) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      message: "invalid service Id",
    });
  }
  const { customerId, device, serviceType, status, cost } = req.validatedData;

  try {
    const customer = await prisma.customer.findUnique({
      where: {
        id: customerId,
      },
    });

    if (!customer) {
      return res.status(404).json({
        message: "service not found!",
      });
    }

    const service = await prisma.service.update({
      where: { id },
      data: {
        customerId,
        device,
        serviceType,
        status,
        cost,
      },
      include: {
        customer: true,
      },
    });
    res.status(200).json(service);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({
        message: "customer not found",
      });
    }
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      message: "invalid service Id",
    });
  }
  try {
    const service = await prisma.service.delete({
      where: { id },
    });
    res.json({
      message: "service deleted successfully",
      service,
    });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({
        message: "service not found",
      });
    }
    next(error);
  }
});

module.exports = router;
