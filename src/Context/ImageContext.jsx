// ImageContext.js
import { createContext, useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

const ImageContext = createContext();

export function ImageProvider({ children }) {
  const [image, setImage] = useState(null);
  const [imageSelected, setImageSelected] = useState([]);
  const [advanced, setAdvanced] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [advanced, setAdvanced] = useState(false);
  // const [advanced, setAdvanced] = useState(false);
  //  const { setImage } = useImage();
  const location = useLocation();
  // const previousLocationRef = useRef(location.pathname);

  useEffect(() => {
    // if (previousLocationRef.current === location.pathname) {
    //   setImage(null);
    // }
    // previousLocationRef.current = location.pathname; // Cập nhật giá trị trước đó

    // Thiết lập setImage(null) khi đường dẫn thay đổi
    // console.log("test");
    setImage(null);
  }, [location]);

  useEffect(() => {
    // console.log(image);
  }, [image]);
  return (
    <ImageContext.Provider
      value={{
        image,
        setImage,
        advanced,
        setAdvanced,
        imageSelected,
        setImageSelected,
        loading,
        setLoading,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
}

export function useImage() {
  return useContext(ImageContext);
}
