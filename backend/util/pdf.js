const { generate } = require("@pdfme/generator");
const fs = require("fs");
const invoice = require("../templates/invoice.json");

// custom hebrew enabled font - assistant
const font = {
  serif: {
    data: fs.readFileSync("fonts/Assistant.ttf"),
    fallback: true,
  },
  sans_serif: {
    data: fs.readFileSync("fonts/Assistant.ttf"),
  },
};

async function createInvoice(
  fullName,
  email,
  phoneNumber,
  issueDate,
  dueDate,
  description,
  paymentType,
  amount,
  paymentDate,
  paymentMethod,
  boardFullName,
  address
) {
  const today = new Date(Date.now());

  const inputs = [
    {
      fullName,
      email,
      phoneNumber,
      printDate: today.toLocaleDateString("he-il").toString(),
      issueDate: issueDate.toLocaleDateString("he-il").toString(),
      dueDate: dueDate.toLocaleDateString("he-il").toString(),
      description,
      paymentType,
      amount: amount.toString(),
      paymentDate: paymentDate.toLocaleDateString("he-il").toString(),
      paymentMethod,
      boardFullName,
      address,
    },
  ];
  const pdf = await generate({ template: invoice, inputs, options: { font } });
  return pdf;
}

module.exports = {
  createInvoice,
};
