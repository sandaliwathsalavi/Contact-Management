import React from "react";
import { Modal, Descriptions, Image, Button } from "antd";

// ContactDetailsModal component for displaying contact information in a modal
const ContactDetailsModal = ({ open, onClose, contact }) => {
  // If no contact is passed, return null to prevent rendering
  if (!contact) return null;

  return (
    <Modal
      title="Contact Details" // Modal title
      open={open} // Open state of the modal (controlled by parent component)
      onCancel={onClose} // Function to close the modal when cancel button is clicked
      footer={[ // Footer with buttons
        <Button key="close" onClick={onClose}> // Close button that triggers the onClose function
          Close
        </Button>,
      ]}
    >
      <Descriptions bordered column={1}> {/* Descriptions component for displaying contact info in a tabular form */}
        <Descriptions.Item label="First Name"> {/* Label and value for the first name */}
          {contact.firstName}
        </Descriptions.Item>
        <Descriptions.Item label="Last Name"> {/* Label and value for the last name */}
          {contact.lastName}
        </Descriptions.Item>
        <Descriptions.Item label="Email"> {/* Label and value for the email */}
          {contact.email}
        </Descriptions.Item>
        <Descriptions.Item label="Phone Number"> {/* Label and value for the phone number */}
          {contact.phoneNumber}
        </Descriptions.Item>
        <Descriptions.Item label="Birthday"> {/* Label and value for the birthday */}
          {contact.birthday}
        </Descriptions.Item>
        <Descriptions.Item label="Address"> {/* Label and value for the address */}
          {contact.address}
        </Descriptions.Item>
        <Descriptions.Item label="Notes"> {/* Label and value for additional notes */}
          {contact.notes}
        </Descriptions.Item>
        <Descriptions.Item label="Gender"> {/* Label and value for gender */}
          {contact.gender}
        </Descriptions.Item>
        <Descriptions.Item label="Category"> {/* Label and value for the contact's category */}
          {contact.category}
        </Descriptions.Item>
        <Descriptions.Item label="Image"> {/* Label and value for the contact's image */}
          <Image
            src={`http://localhost:5001/public${contact.imageUrl}`} // Image source URL
            alt="Contact Image" // Alt text for the image
            width={200} // Set image width
          />
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

// Export the ContactDetailsModal component for use in other parts of the application
export default ContactDetailsModal;
