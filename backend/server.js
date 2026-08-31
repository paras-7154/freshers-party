app.post("/api/registrations", async (req, res) => {

  try {

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


    const registration = new Registration({

      studentName: studentName.trim(),

      className: className.trim(),

      mobile: mobile.trim(),

      event: event.trim(),

      // Empty string allowed
      songName: songName
        ? songName.trim()
        : ""

    });


    await registration.save();


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