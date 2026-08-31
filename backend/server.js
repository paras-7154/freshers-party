const dns = require("dns");

dns.setDefaultResultOrder("ipv4first");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const Registration = require("./models/Registration");

const app = express();


// =====================================
// MIDDLEWARE
// =====================================

app.use(cors());

app.use(express.json());


// =====================================
// MONGODB CONNECTION
// =====================================

console.log(
  "MONGO_URI exists:",
  !!process.env.MONGO_URI
);

console.log(
  "MONGO_URI starts with:",
  process.env.MONGO_URI
    ? process.env.MONGO_URI.substring(0, 20)
    : "undefined"
);


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.error(
      "MongoDB Connection Error:",
      error
    );
  });


// =====================================
// POST - CREATE REGISTRATION
// =====================================

app.post("/api/registrations", async (req, res) => {

  try {

    console.log(
      "Registration Request:",
      req.body
    );


    // Get data from request
    const {
      studentName,
      className,
      mobile,
      event,
      songName
    } = req.body;


    // Required fields
    if (
      !studentName ||
      !className ||
      !mobile ||
      !event
    ) {

      return res.status(400).json({
        success: false,
        message: "Please fill all required fields"
      });

    }


    // Create registration
    const registration = new Registration({

      studentName: studentName.trim(),

      className: className.trim(),

      mobile: mobile.trim(),

      event: event.trim(),

      songName: songName
        ? songName.trim()
        : ""

    });


    // Save to MongoDB
    await registration.save();


    console.log(
      "Registration Saved:",
      registration._id
    );


    return res.status(201).json({

      success: true,

      message: "Registration successful!",

      data: registration

    });


  } catch (error) {

    console.error(
      "Registration Error:",
      error
    );


    return res.status(500).json({

      success: false,

      message: "Registration failed",

      error: error.message

    });

  }

});


// =====================================
// GET - ALL REGISTRATIONS
// =====================================

app.get("/api/registrations", async (req, res) => {

  try {

    const registrations =
      await Registration
        .find()
        .sort({ createdAt: -1 });


    return res.json({

      success: true,

      data: registrations

    });


  } catch (error) {

    console.error(
      "Fetch Registration Error:",
      error
    );


    return res.status(500).json({

      success: false,

      message: "Failed to fetch registrations",

      error: error.message

    });

  }

});


// =====================================
// DELETE - REGISTRATION
// =====================================

app.delete(
  "/api/registrations/:id",
  async (req, res) => {

    try {

      const deleted =
        await Registration.findByIdAndDelete(
          req.params.id
        );


      if (!deleted) {

        return res.status(404).json({

          success: false,

          message: "Registration not found"

        });

      }


      return res.json({

        success: true,

        message:
          "Registration deleted successfully"

      });


    } catch (error) {

      console.error(
        "Delete Error:",
        error
      );


      return res.status(500).json({

        success: false,

        message:
          "Failed to delete registration",

        error: error.message

      });

    }

  }
);


// =====================================
// PUT - UPDATE REGISTRATION
// =====================================

app.put(
  "/api/registrations/:id",
  async (req, res) => {

    try {

      const {
        studentName,
        className,
        mobile,
        event,
        songName
      } = req.body;


      if (
        !studentName ||
        !className ||
        !mobile ||
        !event
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Please fill all required fields"

        });

      }


      const updated =
        await Registration.findByIdAndUpdate(

          req.params.id,

          {
            studentName: studentName.trim(),

            className: className.trim(),

            mobile: mobile.trim(),

            event: event.trim(),

            songName: songName
              ? songName.trim()
              : ""
          },

          {
            new: true,

            runValidators: true
          }

        );


      if (!updated) {

        return res.status(404).json({

          success: false,

          message:
            "Registration not found"

        });

      }


      return res.json({

        success: true,

        message:
          "Registration updated successfully",

        data: updated

      });


    } catch (error) {

      console.error(
        "Update Error:",
        error
      );


      return res.status(500).json({

        success: false,

        message:
          "Failed to update registration",

        error: error.message

      });

    }

  }
);


// =====================================
// HOME
// =====================================

app.get("/", (req, res) => {

  res.send(
    "Freshers Party Backend Running"
  );

});


// =====================================
// START SERVER
// =====================================

app.listen(5000, () => {

  console.log(
    "Server running on port 5000"
  );

});