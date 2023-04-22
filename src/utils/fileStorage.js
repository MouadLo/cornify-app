import RNFS from "react-native-fs";
import {Platform} from "react-native";
import {PDFDocument} from "react-native-pdf";

export const saveInvoice = async (pdfDocument, filename) => {
  // Check if external storage is available (for Android devices)
  if (Platform.OS === "android") {
    const externalStorage = await RNFS.getExternalStorageDirectory();
    if (!externalStorage) {
      throw new Error("External storage not available");
    }
  }

  // Convert the PDF document to a data URL
  const dataUrl = await pdfDocument.toDataUrl();

  // Create a file path for the invoice
  let filePath;
  if (Platform.OS === "ios") {
    filePath = `${RNFS.DocumentDirectoryPath}/${filename}`;
  } else {
    const externalStorage = await RNFS.getExternalStorageDirectory();
    filePath = `${externalStorage}/${filename}`;
  }

  // Write the PDF data to a file
  await RNFS.writeFile(filePath, dataUrl, "base64");

  return filePath;
};
