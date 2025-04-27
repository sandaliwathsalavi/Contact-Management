const Contact = require("../models/Contact");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { ensureUploadDir } = require("../utils");

// Ensure the upload directory exists
const uploadDir = "public/uploads";
ensureUploadDir(uploadDir);

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB file size limit
  },
}).single("image"); // Ensure the field name is 'image'

// Create a new contact
const createContact = async (req, res) => {
  return new Promise((resolve, reject) => {
    upload(req, res, async (err) => {
      if (err) {
        console.error("Multer error:", err);
        return reject(err);
      }

      try {
        const contactData = req.body;

        // Check if a file was uploaded
        if (req.file) {
          // Save the relative path to the image
          contactData.imageUrl = `/uploads/${req.file.filename}`;
          console.log("File uploaded successfully:", contactData.imageUrl);
        }

        // Create the contact
        const contact = new Contact(contactData);
        await contact.save();

        resolve(contact);
      } catch (error) {
        console.error("Error creating contact:", error);
        reject(error);
      }
    });
  });
};

// Get all contacts
const getContacts = async () => {
  try {
    return await Contact.find();
  } catch (error) {
    console.error("Error fetching contacts:", error); // Log the error for debugging
    throw error;
  }
};

// Get a contact by ID
const getContactById = async (id) => {
  try {
    const contact = await Contact.findById(id);
    if (!contact) {
      throw new Error("Contact not found");
    }
    return contact;
  } catch (error) {
    console.error("Error fetching contact by ID:", error); // Log the error for debugging
    throw error;
  }
};

// Update a contact by ID (including image)
const updateContact = async (req, res) => {
  return new Promise((resolve, reject) => {
    upload(req, res, async (err) => {
      if (err) {
        console.error("Multer error:", err);
        return reject(err);
      }

      try {
        const { id } = req.params;
        const contactData = req.body;

        // Check if a file was uploaded
        if (req.file) {
          // Save the relative path to the image
          contactData.imageUrl = `/uploads/${req.file.filename}`;
          console.log("File uploaded successfully:", contactData.imageUrl);
        }

        // Find the contact and update it
        const contact = await Contact.findByIdAndUpdate(id, contactData, {
          new: true,
        });
        
        if (!contact) {
          return reject(new Error("Contact not found"));
        }

        resolve(contact);
      } catch (error) {
        console.error("Error updating contact:", error);
        reject(error);
      }
    });
  });
};

// Delete a contact by ID
const deleteContact = async (id) => {
  try {
    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) {
      throw new Error("Contact not found");
    }
    return contact;
  } catch (error) {
    console.error("Error deleting contact:", error); // Log the error for debugging
    throw error;
  }
};

module.exports = {
  createContact,
  getContacts,
  getContactById,
  updateContact,
  deleteContact,
};
