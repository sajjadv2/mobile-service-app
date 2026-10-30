const { z } = require("zod");

const serviceSchema = z.object({
  customerId: z.preprocess(
    (value) =>
      value === "" || value === null || value === undefined
        ? NaN
        : Number(value),
    z
      .number({ message: "شناسه مشتری باید عدد باشد" })
      .int({ message: "شناسه مشتری باید عدد صحیح باشد" })
      .positive({ message: "شناسه مشتری معتبر نیست" }),
  ),

  device: z.string().trim().min(1, { message: "نام دستگاه الزامی است" }),
  serviceType: z.string().trim().min(1, { message: "نوع خدمت الزامی است" }),
  status: z.string().trim().min(1, { message: "وضعیت خدمت الزامی است" }),

  cost: z.preprocess(
    (value) =>
      value === "" || value === null || value === undefined
        ? NaN
        : Number(value),
    z
      .number({ message: "هزینه باید عدد باشد" })
      .int({ message: "هزینه باید عدد صحیح باشد" })
      .min(0,{message: "هزینه نمی تواند منفی باشد"}),
  ),
});

module.exports = {
  serviceSchema,
};
