import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { useShoppingCart } from '@/hooks/use-shopping-cart';
import { formatCurrency } from '@/lib/utils';
import RatingNeon from '@/components/RatingNeon';

const ProductCard3D = props => {
  const { cartCount, addItem } = useShoppingCart();
  const [adding, setAdding] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const toastId = useRef();
  const firstRun = useRef(true);

  // 3D Tilt effect
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;
      
      setTilt({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
      setTilt({ x: 0, y: 0 });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleOnAddToCart = event => {
    event.preventDefault();
    event.stopPropagation();

    setAdding(true);
    toastId.current = toast.loading('Adding 1 item...');

    if (typeof props.onClickAdd === 'function') {
      props.onClickAdd();
    }

    addItem(props);
  };

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }

    if (adding) {
      setAdding(false);
      toast.success(`${props.name} added`, {
        id: toastId.current,
      });
    }

    if (typeof props.onAddEnded === 'function') {
      props.onAddEnded();
    }
  }, [cartCount]);

  return (
    <div
      ref={cardRef}
      className="product-card-3d"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(0)`,
        transition: 'transform 0.1s ease-out',
      }}
    >
      <Link href={`/products/${props.id}`}>
        <a className="product-card-3d__link">
          {/* Glow border effect */}
          <div className="product-card-3d__glow" />
          
          {/* Product image with 3D effect */}
          <div className="product-card-3d__image-wrapper">
            <div className="product-card-3d__image-glow" />
            <Image
              src={props.image}
              alt={props.name}
              layout="fill"
              objectFit="contain"
              className="product-card-3d__image"
            />
          </div>

          {/* Content */}
          <div className="product-card-3d__content">
            {/* Name + Rating */}
            <div className="product-card-3d__header">
              <h3 className="product-card-3d__title">{props.name}</h3>
              <RatingNeon rate={props?.rating?.rate} count={props?.rating?.count} />
            </div>

            {/* Price + CTA */}
            <div className="product-card-3d__footer">
              <div className="product-card-3d__price">
                <span className="product-card-3d__price-label">Price</span>
                <span className="product-card-3d__price-value">
                  {formatCurrency(props.price, props.currency)}
                </span>
              </div>

              <button
                type="button"
                onClick={handleOnAddToCart}
                disabled={adding || props.disabled}
                className={`product-card-3d__btn ${adding ? 'product-card-3d__btn--adding' : ''} ${props.disabled ? 'product-card-3d__btn--disabled' : ''}`}
              >
                <span className="product-card-3d__btn-text">
                  {adding ? 'Adding...' : 'Add to cart'}
                </span>
                <span className="product-card-3d__btn-glow" />
              </button>
            </div>
          </div>

          {/* Neon scanline effect */}
          <div className="product-card-3d__scanline" />
        </a>
      </Link>
    </div>
  );
};

export default ProductCard3D;
