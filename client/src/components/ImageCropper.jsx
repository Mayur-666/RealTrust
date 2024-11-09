import { useRef, useState, useEffect } from "react";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const ImageCropper = ({ handleImageChange, originalImageRef }) => {
  const [imgSource, setImgSource] = useState("");
  const [error, setError] = useState("");

  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  const [crop, setCrop] = useState({
    unit: "px",
    x: 0,
    y: 0,
    width: 475,
    height: 375,
  });

  const onSelectImage = (e) => {
    const image = e.target.files?.[0];

    if (!image) return;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageElement = new Image();
      const imgUrl = reader.result?.toString() || "";
      imageElement.src = imgUrl;

      imageElement.addEventListener("load", (e) => {
        if (error) setError("");

        const { naturalHeight, naturalWidth } = e.currentTarget;
        if (naturalHeight < 375 || naturalWidth < 475) {
          setError("Image is too small. Minimum size is 475 x 375 pixels.");
          setImgSource("");
          return;
        }

        setCrop(
          centerCrop(
            makeAspectCrop(
              { unit: "%", width: 50, aspect: 475 / 375 },
              475 / 375,
              naturalWidth,
              naturalHeight
            ),
            naturalWidth,
            naturalHeight
          )
        );
        setImgSource(imgUrl);
      });
    });
    reader.readAsDataURL(image);
  };

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    const cropWidthPercent = (475 / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthPercent,
      },
      475 / 375,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  const setCanvasPreview = (image, canvas, crop) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("2d context is not supported");
    }

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = 475; // Set canvas width to 475 pixels
    canvas.height = 375; // Set canvas height to 375 pixels

    ctx.imageSmoothingQuality = "high";
    ctx.save();

    const cropX = crop.x * scaleX;
    const cropY = crop.y * scaleY;

    ctx.drawImage(
      image,
      cropX,
      cropY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      475,
      375
    );
    ctx.restore();
  };

  useEffect(() => {
    const handleResize = () => {
      if (imageRef.current) {
        const { width, height } = imageRef.current;
        const cropWidthPercent = (475 / width) * 100;

        const crop = makeAspectCrop(
          {
            unit: "%",
            width: cropWidthPercent,
          },
          475 / 375,
          width,
          height
        );
        const centeredCrop = centerCrop(crop, width, height);
        setCrop(centeredCrop);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <label
        htmlFor="image"
        className="block text-sm font-medium text-gray-700"
      >
        <span>Choose photo</span>
        <input
          ref={originalImageRef}
          type="file"
          id="image"
          accept="image/*"
          onChange={onSelectImage}
          required
          className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        />
      </label>
      {error && <div className="text-red-500">{error}</div>}
      {imgSource && (
        <div className="t flex flex-col items-center justify-center bg-opacity-50 w-full h-full">
          <ReactCrop
            src={imgSource}
            crop={crop}
            aspect={475 / 375}
            minWidth={375}
            onChange={(newCrop) => setCrop(newCrop)}
            onComplete={(c) =>
              setCanvasPreview(imageRef.current, canvasRef.current, c)
            }
          >
            <img
              ref={imageRef}
              src={imgSource}
              alt=""
              style={{ maxHeight: "70vh" }}
              onLoad={onImageLoad}
            />
          </ReactCrop>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleImageChange(canvasRef.current.toDataURL());
              setImgSource("");
              canvasRef.current.getContext("2d").clearRect(0, 0, 475, 375);
            }}
          >
            Crop Image
          </button>
        </div>
      )}
      {crop && (
        <canvas
          className="t hidden"
          ref={canvasRef}
          style={{ width: "475px", height: "375px" }}
        ></canvas>
      )}
    </div>
  );
};
export default ImageCropper;
