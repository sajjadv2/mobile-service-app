// const { z } = require("zod");

// const customerSchema = z.object({
//   name: z.string().trim().min(1, { message: "نام مشتری الزامی سات" }),
//   phone: z.string().refine(/^09\d{9}$/, { message: " شماره تلفن الزامی سات" }),
//   city: z.string().trim().min(1, { message: "نام شهر الزامی سات" }),
// });

// module.exports = {
//   customerSchema,
// };

const { z } = require("zod");

const customerSchema = z.object({
  name: z.string().trim().min(1, {
    message: "نام مشتری الزامی است",
  }),

  phone: z.string().regex(/^09\d{9}$/, {
    message: "شماره موبایل معتبر نیست",
  }),

  city: z.string().trim().min(1, {
    message: "شهر الزامی است",
  }),
});

module.exports = {
  customerSchema,
};
