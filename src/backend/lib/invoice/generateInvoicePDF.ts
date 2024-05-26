import { jsPDF } from 'jspdf';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';
import OrderModel, { IOrder } from "@/backend/schema/transaction/order.model";
import { calculatePrice } from '@/utils/price-utlis';

export const generateInvoicePDF = async (order: IOrder): Promise<string> => {
  const doc = new jsPDF();
  
  const fontSize = 12;
  const margin = 20;
  let yPosition = margin;

  // Draw Header
  doc.setFontSize(20);
  doc.text('INVOICE', 105, yPosition, { align: 'center' });
  yPosition += 20;

  // Draw Company Information
  doc.setFontSize(fontSize);
  doc.text('Lws Kart', margin, yPosition);
  yPosition += 10;
  doc.text('12/34A Uttor Badda', margin, yPosition);
  yPosition += 10;
  doc.text('Dhaka, Dhaka, 1212', margin, yPosition);
  yPosition += 10;
  doc.text('Phone: +1 234 567 890', margin, yPosition);
  yPosition += 10;
  doc.text('Email: info@lwskart.com', margin, yPosition);
  yPosition += 20;

  // Draw Customer Information
  doc.setFont('times', 'bold');
  doc.text('Bill To:', margin, yPosition);
  doc.setFont("times", 'normal');
  yPosition += 10;
  doc.text(order.user.name, margin, yPosition);
  yPosition += 10;
  doc.text(order.user.address, margin, yPosition);
  yPosition += 10;
  doc.text(`${order.user.city}, ${order.user.state}, ${order.user.postalCode}`, margin, yPosition);
  yPosition += 10;
  doc.text(order.user.country, margin, yPosition);
  yPosition += 10;
  doc.text(`Phone: ${order.user.phoneNumber}`, margin, yPosition);
  yPosition += 10;
  doc.text(`Email: ${order.user.email}`, margin, yPosition);
  yPosition += 20;

  // Draw Order Information
  doc.text(`Order ID: ${order._id}`, margin, yPosition);
  yPosition += 10;
  doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, margin, yPosition);
  yPosition += 10;
  doc.text(`Payment Method: ${order.paymentMethod}`, margin, yPosition);
  yPosition += 10;
  doc.text(`Status: ${order.status}`, margin, yPosition);
  yPosition += 20;

  // Draw Product Table Header
  doc.setFont("times", 'bold');
  doc.text('Description', margin, yPosition);
  doc.text('Quantity', 105, yPosition);
  doc.text('Price', 160, yPosition);
  doc.setFont("", 'normal');
  yPosition += 10;

  // Draw Product Table Rows
  order.products.forEach((item) => {
    doc.text(item.name, margin, yPosition);
    doc.text(`${item.quantity}`, 105, yPosition);
    doc.text(`$${item.price.toFixed(2)}`, 160, yPosition);
    yPosition += 10;
  });

  // Draw Total Price
  yPosition += 10;
  doc.setFont("times", 'bold');
  doc.text(`Total: $${order.totalPrice.toFixed(2)}`, 160, yPosition);

  // Draw Footer
  yPosition += 20;
  doc.setFontSize(10);
  doc.text('Thank you for your business!', 105, yPosition, { align: 'center' });

  const pdfBytes = doc.output('arraybuffer');
  const tempDir = tmpdir();
  const filePath = join(tempDir, `invoice-${order._id}.pdf`);

  await writeFile(filePath, Buffer.from(pdfBytes));
  console.log("PDF file written successfully");

  return filePath;
};
