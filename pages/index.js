import { useState } from 'react';
import ProductCard3D from '@/components/ProductCard3D';
import NeonHero from '@/components/NeonHero';
import products from 'products';

export default function Home() {
  const [disabled, setDisabled] = useState(false);

  return (
    <div className="container xl:max-w-screen-xl mx-auto py-12 px-6">
      <NeonHero primaryCtaHref="#drops" secondaryCtaHref="#drops" />
      
      <div id="drops" className="drops-section">
        <div className="drops-section__header">
          <h2 className="drops-section__title">
            <span className="drops-section__title-cyan">LATEST</span>
            <span className="drops-section__title-pink"> DROPS</span>
          </h2>
          <p className="drops-section__subtitle">
            Ultra limited. Drop culture. No fluff.
          </p>
        </div>
        
        <div className="drops-section__grid">
          {products.map(product => (
            <ProductCard3D
              key={product.id}
              disabled={disabled}
              onClickAdd={() => setDisabled(true)}
              onAddEnded={() => setDisabled(false)}
              {...product}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
