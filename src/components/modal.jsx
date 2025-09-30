

export default function Modal({
  isOpen,
//   onClose,
  title,
  children,
//   showCloseButton = true,
  width = "max-w-lg", 
}) {
  // Close on ESC key
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.key === "Escape") {
//         onClose?.();
//       }
//     };
//     if (isOpen) {
//       document.addEventListener("keydown", handleKeyDown);
//     }
//     return () => {
//       document.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        // onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div
        className={`relative z-50 w-full ${width} bg-white rounded-2xl shadow-lg p-6 animate-fadeIn`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {title && (
          <h2 className="text-xl text-center font-semibold text-gray-800 mb-4">{title}</h2>
        )}

        {/* Body */}
        <div className="text-gray-700 text-center">{children}</div>

        {/* Close Button */}
        {/* {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
        )} */}
      </div>
    </div>
  );
}
