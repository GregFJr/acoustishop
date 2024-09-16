"use client";

import { useParams } from 'next/navigation';
import useSWR from 'swr';
import Link from 'next/link';

// Define TypeScript interfaces for your product data
interface ImageSet {
  mobile: string;
  tablet: string;
  desktop: string;
}

interface IncludeItem {
  quantity: number;
  item: string;
}

interface Gallery {
  first: ImageSet;
  second: ImageSet;
  third: ImageSet;
}

interface OtherProduct {
  slug: string;
  name: string;
  image: ImageSet;
}

interface Product {
  id: number;
  slug: string;
  name: string;
  image: ImageSet;
  category: string;
  categoryImage: ImageSet;
  new: boolean;
  price: number;
  description: string;
  features: string;
  includes: IncludeItem[];
  gallery: Gallery;
  others: OtherProduct[];
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function ProductPage() {
  const { id } = useParams();
  const { data: product, error } = useSWR<Product>(id ? `/api/post/${id}` : null, fetcher);
  
  if (error) {
    return <div>Error: Failed to fetch product</div>;
  }

  if (!product) {
    return <div className='bouncing-loader'>
      <div></div>
      <div></div>
      <div></div>
    </div>;
  }

  return (
    <div className='product-page-body'>
      <section className='single-product'>
      <img src={`/${product.image.desktop}`} alt={product.name} />
      <div className='single-product-info'>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <h5>$ {product.price.toLocaleString()}</h5>
      <div className='add-cart'>
      <input 
    type="number" 
    id="quantity" 
    name="quantity" 
    min="1" 
    max={product.includes[0].quantity} 
    defaultValue="1"
  />
  <button>add to cart</button>
      </div>
      </div>
      </section>

      <section className='feature-and-items'>
        <div className='features'>
          <h2>features</h2>
          {product.features.split('\n').map((line, index) => (
             <p key={index} className="mb-4">{line}</p> ))}
        </div>

        <div className='included-items'>
          <h2>In the box</h2>
          <ul>
            {product.includes.map((include) => (
              <li key={include.item}> <span>{include.quantity}x</span> {include.item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className='product-gallery'>
        <div className='gallery-images'>
          <div className='image-set-1'>
          <img src={`/${product.gallery.first.desktop}`} alt={product.name} />
          <img src={`/${product.gallery.second.desktop}`} alt={product.name} />
          </div>
          <div className='image-set-2'>
          <img src={`/${product.gallery.third.desktop}`} alt={product.name} />
          </div>
        </div>
      </section>

      <section className='also-like'>
        {product.others.map((otherProduct) => (
          <div key={otherProduct.slug} className='other-product'>
            <img src={`/${otherProduct.image.desktop}`} alt={otherProduct.name} />
            <h3>{otherProduct.name}</h3>
            <Link href={`/products/${otherProduct.slug}`}>
              <button>See product</button>
            </Link>
          </div>
        ))}
      </section>
      
      <div className='audio-categories'>
          <div>
          <img src="/assets/shared/desktop/image-category-thumbnail-headphones.png" alt="thumdnail headphones" />
            <h5>Headphones</h5>
            <a href="">Shop</a>
          </div>
          <div>
          <img src="/assets/shared/desktop/image-category-thumbnail-speakers.png" alt="thumdnail speakers" />
          <h5>Speakers</h5>
          <a href="">Shop</a>
          </div>
          <div>
          <img src="/assets/shared/desktop/image-category-thumbnail-earphones.png" alt="thumdnail earphones" />
          <h5>Earphones</h5>
          <a href="">Shop</a>
          </div>
        </div>


    </div>
  );
}


