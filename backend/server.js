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
    if (!studentName || !className || !mobile || !event) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields"
      });
    }

    const registration = new Registration({
      studentName,
      className,
      mobile,
      event,
      songName: songName || ""
    });

    await registration.save();

    res.status(201).json({
      success: true,
      message: "Registration successful!",
      data: registration
    });

  } catch (error) {
    console.log("Registration Error:", error);

    res.status(500).json({
      success: false,
      message: "Registration failed",
      error: error.message
    });
  }
});