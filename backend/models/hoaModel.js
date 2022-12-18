const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const associationSchema = new Schema(
  {
    hoaDetails: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      managerEmail: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      address:{
        type: String,
        required:true,
      },
      membersMonthlyFee: {
        type: String,
      },
    },
    tenants: [
      {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
        buildingNumber: {
          type: String,
          required: true,
        },
        houseNumber: {
          type: String,
          required: true,
        },
        parkingSpot: {
          type: String,
        },
        tenantPhoneNumber: {
          type: String,
          required: true,
        },
        tenantEmail: {
          type: String,
          required: true,
        },
        password: {
          //TODO: later make it filled by a tenant on first login
          type: String,
        },
        tenantType: {
          type: String,
          required: true,
        },
        ownerLastName: {
          type: String,
          required: true,
        },
        ownerPhoneNumber: {
          type: String,
          required: true,
        },
        ownerEmail: {
          type: String,
          required: true,
        },
      },
    ],
    suppliers: [
      {
        supplierName: {
          type: String,
          required: true,
        },
        supplierType: {
          type: String,
          required: true,
        },
        supplierCategory: {
          type: String,
          required: true,
        },
        email: {
          type: String,
        },
        phoneNumber: {
          type: String,
        },
      },
    ],
    maintenanceReminders: [
      {
        title: {
          type: String,
          required: true,
        },
        body: {
          type: String,
          required: true,
        },
        dateAndTime: {
          type: Date,
          required: true,
        },
      },
    ],
    announcements: [
      {
        title: {
          type: String,
          required: true,
        },
        body: {
          type: String,
          required: true,
        },
        buildingNumber: {
          type: String,
          required: true,
        },
      },
    ],
    maintenanceRequests: [
      {
        refNumber: {
          type: Number,
          required: true,
        },
        tenant: {
          type: String,
          required: true,
        },
        subject: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        status: {
          type: String,
          required: true,
        },
        pictures: {
          //TODO: Refine in the next stage.
          type: Buffer,
        },
        response: {
          type: String,
        },
      },
    ],
    inquiries: [
      {
        refNumber: {
          type: Number,
          required: true,
        },
        tenant: {
          type: String,
          required: true,
        },
        subject: {
          type: String,
          required: true,
        },
        body: {
          type: String,
          required: true,
        },
        status: {
          type: String,
          required: true,
        },
        response: {
          type: String,
        },
      },
    ],
    billing: [
      {
        invoiceNumber: {
          type: Number,
          required: true,
        },
        tenant: {
          type: String,
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
        paymentType: {
          type: String,
          required: true,
        },
        dueDate: {
          type: Date,
          required: true,
        },
        issueDate: {
          type: Date,
          required: true,
        },
        paymentStatus: {
          type: String,
          required: true,
        },
        paymentDetails: {
          type: Object,
        },
      },
    ],
    expenses: [
      {
        refNumber: {
          type: Number,
          required: true,
        },
        payableTo: {
          type: String,
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
        paymentType: {
          type: String,
          required: true,
        },
        details: {
          type: String,
          required: true,
        },
        paymentCategory: {
          type: String,
          required: true,
        },
        paymentMethod: {
          type: String,
          required: true,
        },
      },
    ],
    documents: [
      {
        fileName: {
          type: String,
          required: true,
        },
        fileDescription: {
          type: String,
          required: true,
        },
        uploadDate: {
          type: Date,
          required: true,
        },
        file: {
          //TODO: Refine in the next stage.
          type: Buffer,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Association", associationSchema);
