function errorHandler(err, req, res, next) {
  console.error("Server error :", err);

  if (res.headerSent) {
    return next(err);
  }

  if (err.code === "P2025"){
    res.status(400).json({
      message : "Record not found"
    })
  }

  if(err.code ==="P2002"){
    res.status(409).json({
      message : "This record already exist"
    })
  }

  
  res.status(500).json({
    message : "Internla server error"
  })
}

module.exports = errorHandler;
