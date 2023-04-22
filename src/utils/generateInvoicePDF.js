import PDFLib, {PDFDocument, PDFPage} from "react-native-pdf-lib";

const generateInvoicePDF = async () => {
  const pdfDoc = PDFDocument.create();
  const page = await pdfDoc.addPage();

  page.drawText("Invoice", {
    x: 10,
    y: page.getHeight() - 50,
    color: "#000000",
    fontSize: 24,
  });

  // Add customer details
  page.drawText("Customer Details:", {
    x: 10,
    y: page.getHeight() - 100,
    color: "#000000",
    fontSize: 16,
  });

  page.drawText(`Name: Mouad Lousimi`, {
    x: 10,
    y: page.getHeight() - 125,
    color: "#000000",
    fontSize: 12,
  });

  page.drawText(`Address: Ain Diab La Corniche`, {
    x: 10,
    y: page.getHeight() - 150,
    color: "#000000",
    fontSize: 12,
  });

  // Add order details
  page.drawText("Order Details:", {
    x: 10,
    y: page.getHeight() - 200,
    color: "#000000",
    fontSize: 16,
  });

  page.drawText(`Product: Juice Head 5k puff`, {
    x: 10,
    y: page.getHeight() - 225,
    color: "#000000",
    fontSize: 12,
  });

  page.drawText(`Quantity: 1`, {
    x: 10,
    y: page.getHeight() - 250,
    color: "#000000",
    fontSize: 12,
  });

  // Add billing information
  page.drawText("Billing Information:", {
    x: 10,
    y: page.getHeight() - 300,
    color: "#000000",
    fontSize: 16,
  });

  page.drawText(`Subtotal: 200`, {
    x: 10,
    y: page.getHeight() - 325,
    color: "#000000",
    fontSize: 12,
  });

  page.drawText(`Tax: 10%`, {
    x: 10,
    y: page.getHeight() - 350,
    color: "#000000",
    fontSize: 12,
  });

  page.drawText(`Total: 220`, {
    x: 10,
    y: page.getHeight() - 375,
    color: "#000000",
    fontSize: 12,
  });

  const pdfBytes = await pdfDoc.save();
  const path = `${RNFS.DocumentDirectoryPath}/invoice.pdf`;
  await RNFS.writeFile(path, pdfBytes, "base64");
  console.log(`PDF invoice saved to ${path}`);
};

export default generateInvoicePDF;
