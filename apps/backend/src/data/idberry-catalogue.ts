/**
 * IDBERRY Beauty catalogue (71 products), generated from idberry_catalogue_clean.json.
 * Names are the cleaned, compliance-safe titles (no "whitening" / "shades lighter" claims).
 * price_usd is the current USD list price from idberrybeauty.com.
 * NGN prices are derived in the seed script (see NGN_PER_USD) and are PLACEHOLDERS.
 */
export type IdberryCatalogueItem = {
  title: string
  handle: string
  price_usd: number
  collection: string
  concerns: string[]
  type: string
  image: string
  source_url: string
}

export const IDBERRY_CATALOGUE: IdberryCatalogueItem[] = [
  {
    "title": "Half Cast Golden Glow Facial Package",
    "handle": "half-cast-golden-glow-facial-package",
    "price_usd": 35.0,
    "collection": "Half Cast",
    "concerns": [
      "Glow & Even Tone"
    ],
    "type": "Set",
    "image": "/images/products/half-cast-golden-glow-facial-package.webp",
    "source_url": "https://idberrybeauty.com/product/half-cast-smooth-fair-in-7days-10x-extra-whitening-facial-package-copy/"
  },
  {
    "title": "Half Cast Golden Glow Body Soap 1kg",
    "handle": "half-cast-golden-glow-body-soap-1kg",
    "price_usd": 60.0,
    "collection": "Half Cast",
    "concerns": [
      "Glow & Even Tone"
    ],
    "type": "Soap",
    "image": "/images/products/half-cast-golden-glow-body-soap-1kg.webp",
    "source_url": "https://idberrybeauty.com/product/half-cast-smooth-fair-in-7days-10x-extra-whitening-body-soap-1000g/"
  },
  {
    "title": "Snow White Plus Radiance Facial Cream 100g",
    "handle": "snow-white-plus-radiance-facial-cream-100g",
    "price_usd": 30.0,
    "collection": "Snow White",
    "concerns": [
      "Glow & Even Tone"
    ],
    "type": "Cream",
    "image": "/images/products/snow-white-plus-radiance-facial-cream-100g.webp",
    "source_url": "https://idberrybeauty.com/product/exclusive-snow-white-plus-20x-extra-whitening-facial-cream-100g/"
  },
  {
    "title": "Snow White Plus Radiance Facial Cream 50g",
    "handle": "snow-white-plus-radiance-facial-cream-50g",
    "price_usd": 15.0,
    "collection": "Snow White",
    "concerns": [
      "Glow & Even Tone"
    ],
    "type": "Cream",
    "image": "/images/products/snow-white-plus-radiance-facial-cream-50g.webp",
    "source_url": "https://idberrybeauty.com/product/exclusive-snow-white-plus-20x-extra-whitening-facial-cream-50g/"
  },
  {
    "title": "Snow White Plus Radiance Face Soap",
    "handle": "snow-white-plus-radiance-face-soap",
    "price_usd": 20.0,
    "collection": "Snow White",
    "concerns": [
      "Glow & Even Tone"
    ],
    "type": "Soap",
    "image": "/images/products/snow-white-plus-radiance-face-soap.webp",
    "source_url": "https://idberrybeauty.com/product/exclusive-snow-white-plus-20x-extra-whitening-face-soap/"
  },
  {
    "title": "Snow White Plus Radiance Scrub 250g",
    "handle": "snow-white-plus-radiance-scrub-250g",
    "price_usd": 15.0,
    "collection": "Snow White",
    "concerns": [
      "Glow & Even Tone"
    ],
    "type": "Scrub",
    "image": "/images/products/snow-white-plus-radiance-scrub-250g.webp",
    "source_url": "https://idberrybeauty.com/product/exclusive-snow-white-plus-20x-extra-whitening-scrub-250g/"
  },
  {
    "title": "Snow White Plus Radiance Scrub 500g",
    "handle": "snow-white-plus-radiance-scrub-500g",
    "price_usd": 30.0,
    "collection": "Snow White",
    "concerns": [
      "Glow & Even Tone"
    ],
    "type": "Scrub",
    "image": "/images/products/snow-white-plus-radiance-scrub-250g.webp",
    "source_url": "https://idberrybeauty.com/product/exclusive-snow-white-plus-20x-extra-whitening-scrub-500g/"
  },
  {
    "title": "Snow White Plus Radiance Soap 1kg",
    "handle": "snow-white-plus-radiance-soap-1kg",
    "price_usd": 80.0,
    "collection": "Snow White",
    "concerns": [
      "Glow & Even Tone"
    ],
    "type": "Soap",
    "image": "/images/products/snow-white-plus-radiance-soap-1kg.webp",
    "source_url": "https://idberrybeauty.com/product/exclusive-snow-white-plus-20x-extra-whitening-soap-1000g/"
  },
  {
    "title": "Snow White Plus Radiance Soap 250g",
    "handle": "snow-white-plus-radiance-soap-250g",
    "price_usd": 20.0,
    "collection": "Snow White",
    "concerns": [
      "Glow & Even Tone"
    ],
    "type": "Soap",
    "image": "/images/products/snow-white-plus-radiance-soap-250g.webp",
    "source_url": "https://idberrybeauty.com/product/exclusive-snow-white-plus-20x-extra-whitening-soap-250g/"
  },
  {
    "title": "Snow White Plus Radiance Soap 500g",
    "handle": "snow-white-plus-radiance-soap-500g",
    "price_usd": 40.0,
    "collection": "Snow White",
    "concerns": [
      "Glow & Even Tone"
    ],
    "type": "Soap",
    "image": "/images/products/snow-white-plus-radiance-soap-500g.webp",
    "source_url": "https://idberrybeauty.com/product/exclusive-snow-white-plus-20x-extra-whitening-soap-500g/"
  },
  {
    "title": "Snow White Radiance Full Set + Lurlu Hitam Scrub",
    "handle": "snow-white-radiance-full-set-plus-lurlu-hitam-scrub",
    "price_usd": 210.0,
    "collection": "Snow White",
    "concerns": [
      "Glow & Even Tone"
    ],
    "type": "Set",
    "image": "/images/products/snow-white-radiance-full-set-plus-lurlu-hitam-scrub.webp",
    "source_url": "https://idberrybeauty.com/product/exclusive-snow-white-10x-extra-whitening-full-set-lurlu-hitam-scrub/"
  },
  {
    "title": "Snow White Plus Radiance Full Package + Lurlu Hitam Scrub",
    "handle": "snow-white-plus-radiance-full-package-plus-lurlu-hitam-scrub",
    "price_usd": 260.0,
    "collection": "Snow White",
    "concerns": [
      "Glow & Even Tone"
    ],
    "type": "Set",
    "image": "/images/products/snow-white-plus-radiance-full-package-plus-lurlu-hitam-scrub.webp",
    "source_url": "https://idberrybeauty.com/product/exclusive-snow-white-plus-20x-extra-whitening-full-package-lurlu-hitam-scrub/"
  },
  {
    "title": "Lurlu Hitam Radiance Scrub",
    "handle": "lurlu-hitam-radiance-scrub",
    "price_usd": 40.0,
    "collection": "Targeted Care",
    "concerns": [
      "Glow & Even Tone"
    ],
    "type": "Scrub",
    "image": "/images/products/lurlu-hitam-radiance-scrub.webp",
    "source_url": "https://idberrybeauty.com/product/lurlu-hitam-whitening-scrub/"
  },
  {
    "title": "Snow White Radiance Black Soap 250g",
    "handle": "snow-white-radiance-black-soap-250g",
    "price_usd": 15.0,
    "collection": "Snow White",
    "concerns": [
      "Glow & Even Tone"
    ],
    "type": "Soap",
    "image": "/images/products/snow-white-radiance-black-soap-250g.webp",
    "source_url": "https://idberrybeauty.com/product/exclusive-snow-white-10x-extra-whitening-black-soap-250g/"
  },
  {
    "title": "Snow White Radiance Black Soap 500g",
    "handle": "snow-white-radiance-black-soap-500g",
    "price_usd": 30.0,
    "collection": "Snow White",
    "concerns": [
      "Glow & Even Tone"
    ],
    "type": "Soap",
    "image": "/images/products/snow-white-radiance-black-soap-500g.webp",
    "source_url": "https://idberrybeauty.com/product/exclusive-snow-white-10x-extra-whitening-black-soap-500g/"
  },
  {
    "title": "Snow White Plus Radiance Oil",
    "handle": "snow-white-plus-radiance-oil",
    "price_usd": 20.0,
    "collection": "Snow White",
    "concerns": [
      "Glow & Even Tone"
    ],
    "type": "Oil",
    "image": "/images/products/snow-white-plus-radiance-oil.webp",
    "source_url": "https://idberrybeauty.com/product/exclusive-snow-white-plus-20x-extra-whitening-oil/"
  },
  {
    "title": "Snow White Plus Radiance Facial Cleanser",
    "handle": "snow-white-plus-radiance-facial-cleanser",
    "price_usd": 20.0,
    "collection": "Snow White",
    "concerns": [
      "Glow & Even Tone"
    ],
    "type": "Cleanser & Bath",
    "image": "/images/products/snow-white-plus-radiance-facial-cleanser.webp",
    "source_url": "https://idberrybeauty.com/product/exclusive-snow-white-plus-20x-extra-whitening-facial-cleanser/"
  },
  {
    "title": "Flawless Brightening Kids Lotion & Shower Bath",
    "handle": "flawless-brightening-kids-lotion-and-shower-bath",
    "price_usd": 20.0,
    "collection": "Little Ones",
    "concerns": [
      "Kids"
    ],
    "type": "Lotion",
    "image": "/images/products/flawless-brightening-kids-lotion-and-shower-bath.webp",
    "source_url": "https://idberrybeauty.com/product/flawless-brightening-kids-lotion-shower-bath/"
  },
  {
    "title": "Flawless Brightening Kids Shower Bath",
    "handle": "flawless-brightening-kids-shower-bath",
    "price_usd": 8.0,
    "collection": "Little Ones",
    "concerns": [
      "Kids"
    ],
    "type": "Cleanser & Bath",
    "image": "/images/products/flawless-brightening-kids-shower-bath.webp",
    "source_url": "https://idberrybeauty.com/product/flawless-brightening-kids-shower-bath/"
  },
  {
    "title": "Kids Skin & Hair Multi-Purpose Oil",
    "handle": "kids-skin-and-hair-multi-purpose-oil",
    "price_usd": 15.0,
    "collection": "Little Ones",
    "concerns": [
      "Kids"
    ],
    "type": "Oil",
    "image": "/images/products/kids-skin-and-hair-multi-purpose-oil.webp",
    "source_url": "https://idberrybeauty.com/product/kids-skin-hair-multi-purpose-oil/"
  },
  {
    "title": "Flawless Brightening Kids Set",
    "handle": "flawless-brightening-kids-set",
    "price_usd": 25.0,
    "collection": "Little Ones",
    "concerns": [
      "Kids"
    ],
    "type": "Set",
    "image": "/images/products/flawless-brightening-kids-set.webp",
    "source_url": "https://idberrybeauty.com/product/flawless-brightening-kids-set/"
  },
  {
    "title": "Flawless Brightening Kids Lotion",
    "handle": "flawless-brightening-kids-lotion",
    "price_usd": 10.0,
    "collection": "Little Ones",
    "concerns": [
      "Kids"
    ],
    "type": "Lotion",
    "image": "/images/products/flawless-brightening-kids-lotion.webp",
    "source_url": "https://idberrybeauty.com/product/flawless-brightening-kids-lotion/"
  },
  {
    "title": "Half Cast Golden Glow Body Soap 250g",
    "handle": "half-cast-golden-glow-body-soap-250g",
    "price_usd": 15.0,
    "collection": "Half Cast",
    "concerns": [
      "Glow & Even Tone"
    ],
    "type": "Soap",
    "image": "/images/products/half-cast-golden-glow-body-soap-250g.webp",
    "source_url": "https://idberrybeauty.com/product/10x-half-cast-smooth-fair-in-7days-body-soap-250g/"
  },
  {
    "title": "Half Cast Golden Glow Body Soap 500g",
    "handle": "half-cast-golden-glow-body-soap-500g",
    "price_usd": 30.0,
    "collection": "Half Cast",
    "concerns": [
      "Glow & Even Tone"
    ],
    "type": "Soap",
    "image": "/images/products/half-cast-golden-glow-body-soap-500g.webp",
    "source_url": "https://idberrybeauty.com/product/10x-half-cast-smooth-fair-in-7days-body-soap-500g/"
  },
  {
    "title": "Half Cast Golden Glow Full Package + Lurlu Hitam Scrub",
    "handle": "half-cast-golden-glow-full-package-plus-lurlu-hitam-scrub",
    "price_usd": 180.0,
    "collection": "Half Cast",
    "concerns": [
      "Glow & Even Tone"
    ],
    "type": "Set",
    "image": "/images/products/half-cast-golden-glow-full-package-plus-lurlu-hitam-scrub.webp",
    "source_url": "https://idberrybeauty.com/product/halfcastfullpackage/"
  },
  {
    "title": "Half Cast Golden Glow Oil",
    "handle": "half-cast-golden-glow-oil",
    "price_usd": 12.0,
    "collection": "Half Cast",
    "concerns": [
      "Glow & Even Tone"
    ],
    "type": "Oil",
    "image": "/images/products/half-cast-golden-glow-oil.webp",
    "source_url": "https://idberrybeauty.com/product/10x-half-cast-smooth-fair-in-7days-oil/"
  },
  {
    "title": "Half Cast Golden Glow Body Scrub 250g",
    "handle": "half-cast-golden-glow-body-scrub-250g",
    "price_usd": 10.0,
    "collection": "Half Cast",
    "concerns": [
      "Glow & Even Tone"
    ],
    "type": "Scrub",
    "image": "/images/products/half-cast-golden-glow-body-scrub-250g.webp",
    "source_url": "https://idberrybeauty.com/product/10x-half-cast-smooth-fair-in-7days-body-scrub-250g/"
  },
  {
    "title": "Half Cast Golden Glow Body Scrub 500g",
    "handle": "half-cast-golden-glow-body-scrub-500g",
    "price_usd": 20.0,
    "collection": "Half Cast",
    "concerns": [
      "Glow & Even Tone"
    ],
    "type": "Scrub",
    "image": "/images/products/half-cast-golden-glow-body-scrub-500g.webp",
    "source_url": "https://idberrybeauty.com/product/10x-half-cast-smooth-fair-in-7days-body-scrub/"
  },
  {
    "title": "Half Cast Golden Glow Facial Soap",
    "handle": "half-cast-golden-glow-facial-soap",
    "price_usd": 12.0,
    "collection": "Half Cast",
    "concerns": [
      "Glow & Even Tone"
    ],
    "type": "Soap",
    "image": "/images/products/half-cast-golden-glow-facial-soap.webp",
    "source_url": "https://idberrybeauty.com/product/10x-half-cast-smooth-fair-in-7days-facial-soap/"
  },
  {
    "title": "Half Cast Golden Glow Facial Cream 50g",
    "handle": "half-cast-golden-glow-facial-cream-50g",
    "price_usd": 12.0,
    "collection": "Half Cast",
    "concerns": [
      "Glow & Even Tone"
    ],
    "type": "Cream",
    "image": "/images/products/half-cast-golden-glow-facial-cream-50g.webp",
    "source_url": "https://idberrybeauty.com/product/10x-half-cast-smooth-fair-in-7days-facial-cream-50g/"
  },
  {
    "title": "Half Cast Golden Glow Full Set",
    "handle": "half-cast-golden-glow-full-set",
    "price_usd": 140.0,
    "collection": "Half Cast",
    "concerns": [
      "Glow & Even Tone"
    ],
    "type": "Set",
    "image": "/images/products/half-cast-golden-glow-full-set.webp",
    "source_url": "https://idberrybeauty.com/product/10x-half-cast-smooth-fair-in-7days-full-set/"
  },
  {
    "title": "Magic Perfect Skin Concentrated Body Serum",
    "handle": "magic-perfect-skin-concentrated-body-serum",
    "price_usd": 15.0,
    "collection": "Targeted Care",
    "concerns": [
      "Dark Spots & Breakouts"
    ],
    "type": "Serum",
    "image": "/images/products/magic-perfect-skin-concentrated-body-serum.webp",
    "source_url": "https://idberrybeauty.com/product/magic-perfect-skin-concentrated-body-serum/"
  },
  {
    "title": "7-Day Smooth & Clear Vitamin C Facial Serum",
    "handle": "7-day-smooth-and-clear-vitamin-c-facial-serum",
    "price_usd": 15.0,
    "collection": "Targeted Care",
    "concerns": [
      "Dark Spots & Breakouts"
    ],
    "type": "Serum",
    "image": "/images/products/7-day-smooth-and-clear-vitamin-c-facial-serum.webp",
    "source_url": "https://idberrybeauty.com/product/idberry-vitamin-c-facial-serum/"
  },
  {
    "title": "Scar Care Set",
    "handle": "scar-care-set",
    "price_usd": 60.0,
    "collection": "Targeted Care",
    "concerns": [
      "Scars & Stretch Marks"
    ],
    "type": "Set",
    "image": "/images/products/scar-care-set.webp",
    "source_url": "https://idberrybeauty.com/product/scar-remover-set/"
  },
  {
    "title": "Pure Herbal Skinglow Black Soap",
    "handle": "pure-herbal-skinglow-black-soap",
    "price_usd": 15.0,
    "collection": "Herbal",
    "concerns": [
      "Glow & Even Tone"
    ],
    "type": "Soap",
    "image": "/images/products/pure-herbal-skinglow-black-soap.webp",
    "source_url": "https://idberrybeauty.com/product/herbal-black-soap/"
  },
  {
    "title": "Magic Hair Booster",
    "handle": "magic-hair-booster",
    "price_usd": 15.0,
    "collection": "Herbal",
    "concerns": [
      "Glow & Even Tone"
    ],
    "type": "Other",
    "image": "/images/products/magic-hair-booster.webp",
    "source_url": "https://idberrybeauty.com/product/herbal-hair-booster/"
  },
  {
    "title": "Magic Skin Repair Cream",
    "handle": "magic-skin-repair-cream",
    "price_usd": 25.0,
    "collection": "Targeted Care",
    "concerns": [
      "Dark Spots & Breakouts"
    ],
    "type": "Cream",
    "image": "/images/products/magic-skin-repair-cream.webp",
    "source_url": "https://idberrybeauty.com/product/skin-repair-cream/"
  },
  {
    "title": "Snow White Radiance Face Cream",
    "handle": "snow-white-radiance-face-cream",
    "price_usd": 13.0,
    "collection": "Snow White",
    "concerns": [
      "Glow & Even Tone"
    ],
    "type": "Cream",
    "image": "/images/products/snow-white-radiance-face-cream.webp",
    "source_url": "https://idberrybeauty.com/product/arabian-day-face-cream/"
  },
  {
    "title": "Radiance Glow Bar Soap",
    "handle": "radiance-glow-bar-soap",
    "price_usd": 15.0,
    "collection": "Targeted Care",
    "concerns": [
      "Glow & Even Tone"
    ],
    "type": "Soap",
    "image": "/images/products/radiance-glow-bar-soap.webp",
    "source_url": "https://idberrybeauty.com/product/whitening-glow-bar-soap/"
  },
  {
    "title": "Snow White Bar Soap",
    "handle": "snow-white-bar-soap",
    "price_usd": 20.0,
    "collection": "Snow White",
    "concerns": [
      "Glow & Even Tone"
    ],
    "type": "Soap",
    "image": "/images/products/snow-white-bar-soap.webp",
    "source_url": "https://idberrybeauty.com/product/snow-white-bar-soap/"
  },
  {
    "title": "Half Cast Golden Glow Facial Cleanser",
    "handle": "half-cast-golden-glow-facial-cleanser",
    "price_usd": 12.0,
    "collection": "Half Cast",
    "concerns": [
      "Glow & Even Tone"
    ],
    "type": "Cleanser & Bath",
    "image": "/images/products/half-cast-golden-glow-facial-cleanser.webp",
    "source_url": "https://idberrybeauty.com/product/half-cast-face-cleanser/"
  },
  {
    "title": "Snow White Radiance Face Cleanser",
    "handle": "snow-white-radiance-face-cleanser",
    "price_usd": 13.0,
    "collection": "Snow White",
    "concerns": [
      "Glow & Even Tone"
    ],
    "type": "Cleanser & Bath",
    "image": "/images/products/snow-white-radiance-face-cleanser.webp",
    "source_url": "https://idberrybeauty.com/product/snow-white-face-cleanser/"
  },
  {
    "title": "Snow White Radiance Face Soap",
    "handle": "snow-white-radiance-face-soap",
    "price_usd": 13.0,
    "collection": "Snow White",
    "concerns": [
      "Glow & Even Tone"
    ],
    "type": "Soap",
    "image": "/images/products/snow-white-radiance-face-soap.webp",
    "source_url": "https://idberrybeauty.com/product/snow-white-face-soap/"
  },
  {
    "title": "Snow White Radiance Facial Set",
    "handle": "snow-white-radiance-facial-set",
    "price_usd": 38.0,
    "collection": "Snow White",
    "concerns": [
      "Glow & Even Tone"
    ],
    "type": "Set",
    "image": "/images/products/snow-white-radiance-facial-set.webp",
    "source_url": "https://idberrybeauty.com/product/snow-white-face-set/"
  },
  {
    "title": "Caramel Glow Student Package",
    "handle": "caramel-glow-student-package",
    "price_usd": 25.0,
    "collection": "Caramel Glow",
    "concerns": [
      "Glow & Even Tone"
    ],
    "type": "Set",
    "image": "/images/products/caramel-glow-student-package.webp",
    "source_url": "https://idberrybeauty.com/product/caramel-glow-student-package/"
  },
  {
    "title": "Caramel Glow Luxury Package",
    "handle": "caramel-glow-luxury-package",
    "price_usd": 100.0,
    "collection": "Caramel Glow",
    "concerns": [
      "Glow & Even Tone"
    ],
    "type": "Set",
    "image": "/images/products/caramel-glow-luxury-package.webp",
    "source_url": "https://idberrybeauty.com/product/caramel-glow-luxury-package/"
  },
  {
    "title": "Stretch Mark Care Set",
    "handle": "stretch-mark-care-set",
    "price_usd": 70.0,
    "collection": "Targeted Care",
    "concerns": [
      "Scars & Stretch Marks"
    ],
    "type": "Set",
    "image": "/images/products/stretch-mark-care-set.webp",
    "source_url": "https://idberrybeauty.com/product/magic-stretch-mark-removal-set/"
  },
  {
    "title": "Flawless Radiance Face Cream",
    "handle": "flawless-radiance-face-cream",
    "price_usd": 15.0,
    "collection": "Targeted Care",
    "concerns": [
      "Glow & Even Tone"
    ],
    "type": "Cream",
    "image": "/images/products/flawless-radiance-face-cream.webp",
    "source_url": "https://idberrybeauty.com/product/flawless-white-face-cream/"
  },
  {
    "title": "Half Cast Golden Glow Facial Cream 100g",
    "handle": "half-cast-golden-glow-facial-cream-100g",
    "price_usd": 24.0,
    "collection": "Half Cast",
    "concerns": [
      "Glow & Even Tone"
    ],
    "type": "Cream",
    "image": "/images/products/half-cast-golden-glow-facial-cream-100g.webp",
    "source_url": "https://idberrybeauty.com/product/half-cast-face-cream/"
  },
  {
    "title": "Flawless Brightening Baby Lotion",
    "handle": "flawless-brightening-baby-lotion",
    "price_usd": 12.0,
    "collection": "Little Ones",
    "concerns": [
      "Kids"
    ],
    "type": "Lotion",
    "image": "/images/products/flawless-brightening-baby-lotion.webp",
    "source_url": "https://idberrybeauty.com/product/brightening-baby-lotion/"
  },
  {
    "title": "Snow White Plus Radiance Lotion 250ml",
    "handle": "snow-white-plus-radiance-lotion-250ml",
    "price_usd": 35.0,
    "collection": "Snow White",
    "concerns": [
      "Glow & Even Tone"
    ],
    "type": "Lotion",
    "image": "/images/products/snow-white-plus-radiance-lotion-250ml.webp",
    "source_url": "https://idberrybeauty.com/product/luxury-snow-white-plus-lotion-5days-action-small/"
  },
  {
    "title": "Snow White Radiance Lotion 250ml",
    "handle": "snow-white-radiance-lotion-250ml",
    "price_usd": 30.0,
    "collection": "Snow White",
    "concerns": [
      "Glow & Even Tone"
    ],
    "type": "Lotion",
    "image": "/images/products/snow-white-radiance-lotion-250ml.webp",
    "source_url": "https://idberrybeauty.com/product/luxury-snow-white-lotion-small/"
  },
  {
    "title": "Half Cast Golden Glow Lotion 250ml",
    "handle": "half-cast-golden-glow-lotion-250ml",
    "price_usd": 25.0,
    "collection": "Half Cast",
    "concerns": [
      "Glow & Even Tone"
    ],
    "type": "Lotion",
    "image": "/images/products/half-cast-golden-glow-lotion-250ml.webp",
    "source_url": "https://idberrybeauty.com/product/halfcast-luxury-lotion-2/"
  },
  {
    "title": "Half Cast Golden Glow Mini Package",
    "handle": "half-cast-golden-glow-mini-package",
    "price_usd": 95.0,
    "collection": "Half Cast",
    "concerns": [
      "Glow & Even Tone"
    ],
    "type": "Set",
    "image": "/images/products/half-cast-golden-glow-mini-package.webp",
    "source_url": "https://idberrybeauty.com/product/luxury-half-cast-min-set/"
  },
  {
    "title": "Half Cast Golden Glow Lotion 500ml",
    "handle": "half-cast-golden-glow-lotion-500ml",
    "price_usd": 50.0,
    "collection": "Half Cast",
    "concerns": [
      "Glow & Even Tone"
    ],
    "type": "Lotion",
    "image": "/images/products/half-cast-golden-glow-lotion-500ml.webp",
    "source_url": "https://idberrybeauty.com/product/halfcast-luxury-lotion/"
  },
  {
    "title": "Snow White Student Package",
    "handle": "snow-white-student-package",
    "price_usd": 35.0,
    "collection": "Snow White",
    "concerns": [
      "Glow & Even Tone"
    ],
    "type": "Set",
    "image": "/images/products/snow-white-student-package.webp",
    "source_url": "https://idberrybeauty.com/product/snow-white-student-set/"
  },
  {
    "title": "Half Cast Golden Glow Student Package",
    "handle": "half-cast-golden-glow-student-package",
    "price_usd": 30.0,
    "collection": "Half Cast",
    "concerns": [
      "Glow & Even Tone"
    ],
    "type": "Set",
    "image": "/images/products/half-cast-golden-glow-student-package.webp",
    "source_url": "https://idberrybeauty.com/product/halfcast-whitening-student-set/"
  },
  {
    "title": "Pink Lips Cream",
    "handle": "pink-lips-cream",
    "price_usd": 3.0,
    "collection": "Targeted Care",
    "concerns": [
      "Glow & Even Tone"
    ],
    "type": "Cream",
    "image": "/images/products/pink-lips-cream.webp",
    "source_url": "https://idberrybeauty.com/product/permanent-pink-lips-cream/"
  },
  {
    "title": "Sun Recovery Face Cream",
    "handle": "sun-recovery-face-cream",
    "price_usd": 15.0,
    "collection": "Targeted Care",
    "concerns": [
      "Dark Spots & Breakouts"
    ],
    "type": "Cream",
    "image": "/images/products/sun-recovery-face-cream.webp",
    "source_url": "https://idberrybeauty.com/product/sunburn-removal-face-cream/"
  },
  {
    "title": "All Clear Facial Set",
    "handle": "all-clear-facial-set",
    "price_usd": 40.0,
    "collection": "Targeted Care",
    "concerns": [
      "Dark Spots & Breakouts"
    ],
    "type": "Set",
    "image": "/images/products/all-clear-facial-set.webp",
    "source_url": "https://idberrybeauty.com/product/all-clear-facial-set/"
  },
  {
    "title": "Royal Customized Radiance Super Luxury Set",
    "handle": "royal-customized-radiance-super-luxury-set",
    "price_usd": 400.0,
    "collection": "Royal Customized",
    "concerns": [
      "Glow & Even Tone"
    ],
    "type": "Set",
    "image": "/images/products/royal-customized-radiance-super-luxury-set.webp",
    "source_url": "https://idberrybeauty.com/product/royal-customised-pure-white-glow-luxury-set/"
  },
  {
    "title": "Dark Knuckles Care Set",
    "handle": "dark-knuckles-care-set",
    "price_usd": 55.0,
    "collection": "Targeted Care",
    "concerns": [
      "Knees & Knuckles"
    ],
    "type": "Set",
    "image": "/images/products/dark-knuckles-care-set.webp",
    "source_url": "https://idberrybeauty.com/product/magic-dark-knuckle-removal-set/"
  },
  {
    "title": "Snow White Plus Radiance Full Set",
    "handle": "snow-white-plus-radiance-full-set",
    "price_usd": 220.0,
    "collection": "Snow White",
    "concerns": [
      "Glow & Even Tone"
    ],
    "type": "Set",
    "image": "/images/products/snow-white-plus-radiance-full-set.webp",
    "source_url": "https://idberrybeauty.com/product/luxury-snow-white-plus-set/"
  },
  {
    "title": "Snow White Radiance Lotion 500ml",
    "handle": "snow-white-radiance-lotion-500ml",
    "price_usd": 60.0,
    "collection": "Snow White",
    "concerns": [
      "Glow & Even Tone"
    ],
    "type": "Lotion",
    "image": "/images/products/snow-white-radiance-lotion-500ml.webp",
    "source_url": "https://idberrybeauty.com/product/luxury-snow-white-lotion-big/"
  },
  {
    "title": "Snow White Radiance Mini Set",
    "handle": "snow-white-radiance-mini-set",
    "price_usd": 110.0,
    "collection": "Snow White",
    "concerns": [
      "Glow & Even Tone"
    ],
    "type": "Set",
    "image": "/images/products/snow-white-radiance-mini-set.webp",
    "source_url": "https://idberrybeauty.com/product/exclusive-snow-white-mini-set/"
  },
  {
    "title": "Snow White Radiance Full Set",
    "handle": "snow-white-radiance-full-set",
    "price_usd": 170.0,
    "collection": "Snow White",
    "concerns": [
      "Glow & Even Tone"
    ],
    "type": "Set",
    "image": "/images/products/snow-white-radiance-full-set.webp",
    "source_url": "https://idberrybeauty.com/product/exclusive-snow-white-full-set/"
  },
  {
    "title": "Snow White Plus Radiance Mini Set",
    "handle": "snow-white-plus-radiance-mini-set",
    "price_usd": 140.0,
    "collection": "Snow White",
    "concerns": [
      "Glow & Even Tone"
    ],
    "type": "Set",
    "image": "/images/products/snow-white-plus-radiance-mini-set.webp",
    "source_url": "https://idberrybeauty.com/product/exclusive-snow-white-plus-mini-set/"
  },
  {
    "title": "Snow White Plus Radiance Lotion 500ml",
    "handle": "snow-white-plus-radiance-lotion-500ml",
    "price_usd": 70.0,
    "collection": "Snow White",
    "concerns": [
      "Glow & Even Tone"
    ],
    "type": "Lotion",
    "image": "/images/products/snow-white-plus-radiance-lotion-500ml.webp",
    "source_url": "https://idberrybeauty.com/product/luxury-snow-white-plus-lotion-5days-action-big/"
  },
  {
    "title": "Instant Radiance Liquid Bath",
    "handle": "instant-radiance-liquid-bath",
    "price_usd": 40.0,
    "collection": "Targeted Care",
    "concerns": [
      "Glow & Even Tone"
    ],
    "type": "Cleanser & Bath",
    "image": "/images/products/instant-radiance-liquid-bath.webp",
    "source_url": "https://idberrybeauty.com/product/idberry-instant-whitening-bath/"
  },
  {
    "title": "Snow White Radiance Black Soap 1kg",
    "handle": "snow-white-radiance-black-soap-1kg",
    "price_usd": 60.0,
    "collection": "Snow White",
    "concerns": [
      "Glow & Even Tone"
    ],
    "type": "Soap",
    "image": "/images/products/snow-white-radiance-black-soap-1kg.webp",
    "source_url": "https://idberrybeauty.com/product/snow-white-black-soap-2/"
  },
  {
    "title": "Snow White Liquid Bath 1 Litre",
    "handle": "snow-white-liquid-bath-1-litre",
    "price_usd": 40.0,
    "collection": "Snow White",
    "concerns": [
      "Glow & Even Tone"
    ],
    "type": "Cleanser & Bath",
    "image": "/images/products/snow-white-liquid-bath-1-litre.webp",
    "source_url": "https://idberrybeauty.com/product/idberry-snow-white-shower-bath/"
  }
]
