import React from "react";
import { useNavigate } from "react-router-dom";

const SolarSystem = () => {
  const navigate = useNavigate();
  const backgroundImageUrl =
    "https://img.freepik.com/free-vector/realistic-space-background-with-all-planets_1284-19221.jpg?t=st=1741093015~exp=1741096615~hmac=f8f453ef016af6617cadf8186d917e30a79938435fd8db00e55fb8a9146ef8c9&w=1380";

  const handleClick = () => {
    navigate("/Earth");
  };

  const handleClick2 = () => {
    navigate("/Mars");
  };

  return (
    <div
      className="solar-system"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
        backgroundColor: "black",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", gap: "20px" }}>
        

        <button
          onClick={handleClick2}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            color: "white",
            backgroundColor: "red",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "0.3s",
          }}
        >
          MARS
        </button>

        <button
          onClick={handleClick}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            color: "white",
            marginTop:"10px",
            marginRight:"-120px",
            backgroundColor: "blue",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "0.3s",
          }}
        >
          EARTH
        </button>
      </div>
    </div>
  );
};

export default SolarSystem;
