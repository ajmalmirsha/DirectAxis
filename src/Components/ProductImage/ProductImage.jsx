import placeholderImg from "../../assets/placeholder-image.png";

/**
 * ProductImage Component
 *
 * This component displays a product image. If the provided image URL is unavailable
 * or fails to load, it defaults to a placeholder image.
 *
 * @param {string} props.image - The URL of the product image. If not provided,
 *                               the placeholder image will be used.
 *
 * @returns {JSX.Element} - A JSX element displaying the product image or a placeholder.
 *
 * Usage:
 * <ProductImage image={productImageUrl} />
 */
export default function ProductImage({ image }) {
  return (
    <img
      className="w-100 h-100"
      src={image || placeholderImg}
      onError={(e) => {
        e.target.src = placeholderImg;
      }}
    />
  );
}
