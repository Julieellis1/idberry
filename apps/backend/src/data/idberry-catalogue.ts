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
    "image": "https://idberrybeauty.com/wp-content/uploads/2024/10/Neutral-Elegant-Skin-Care-Cosmetic-Product-Podium-Facebook-Post_20240916_125923_0000-1.png",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2021/03/4.jpg",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2024/02/IMG_5915-Edit.jpg",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2024/02/IMG_9904-Edit.jpg",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2024/02/IMG_9918.jpg",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2024/02/IMG_2443.jpg",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2024/02/IMG_2443.jpg",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2021/03/IMG_5911-Edit.jpg",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2024/02/IMG_2447.jpg",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2024/02/IMG_9807.jpg",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2024/02/IMG_2480.jpg",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2024/02/IMG_2482-Edit-1-scaled.jpg",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2023/10/IMG_2484.jpg",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2022/11/IMG_9829-Edit.jpg",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2022/11/IMG_2429.jpg",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2022/07/IMG_9803-Edit.jpg",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2022/07/IMG_9806-Edit.jpg",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2022/07/png_20220713_183254_0000-1.png",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2022/07/png_20220713_184712_0000.png",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2022/07/png_20220713_184501_0000.png",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2022/07/Aesthetic-Three-Best-Seller-Product-with-Podium-Instagram-Post_20241001_185852_0000-1.png",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2022/07/Pink-Aesthetic-Podium-Feminine-Perfume-Instagram-Story-1080-x-1350-px_20241001_192654_0000-scaled.png",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2022/07/IMG_2472.jpg",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2022/07/IMG_2462-Edit.jpg",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2022/07/IMG_2478-Edit.jpg",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2022/07/IMG_9850-Edit.jpg",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2022/07/IMG_2473.jpg",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2022/07/IMG_2464.jpg",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2022/07/IMG_9903.jpg",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2022/07/IMG_2465.jpg",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2022/07/IMG_2460-Edit.jpg",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2022/07/20220713_211940_0000.png",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2021/08/png_20220812_122449_0000.png",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2021/06/png_20220901_085932_0000.png",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2021/06/png_20220726_105440_0000.png",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2021/06/png_20220901_101817_0000.png",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2021/06/png_20220901_121658_0000.png",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2021/06/IMG_2428.jpg",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2021/06/png_20221120_105503_0000.png",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2021/06/png_20221120_104555_0000.png",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2021/06/IMG_2469.jpg",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2021/06/IMG_9830-Edit.jpg",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2021/06/IMG_9916.jpg",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2021/06/Peach-Modern-Top-3-Popular-Beauty-Products-Instagram-Post_20240916_130029_0000.png",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2021/06/IMG_2452-Edit-scaled.jpg",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2021/06/20231122_120512-01.jpeg-1.jpg",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2021/06/IMG-20210601-WA0102.jpg",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2021/06/png_20220901_134338_0000.png",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2021/06/IMG_2465.jpg",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2021/06/png_20220713_184150_0000.png",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2021/06/IMG_2444.jpg",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2021/06/IMG_9834.jpg",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2021/03/IMG_2474.jpg",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2021/03/IMG_2471-Edit.jpg",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2021/03/IMG_9847-Edit.jpg",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2021/03/IMG_9893.jpg",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2021/06/IMG_2435-Edit-scaled.jpg",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2021/03/IMG_2477-Edit-1.jpg",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2021/03/png_20221126_092116_0000.png",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2021/03/20221125_115439_0000-1.png",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2021/03/IMG_5881-Edit-1-scaled.jpg",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2021/03/IMG-20220813-WA0017.jpg",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2021/03/IMG_9879.jpg",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2021/03/IMG_2425-Edit-1-scaled.jpg",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2021/02/IMG_9877.jpg",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2021/02/IMG_2423-Edit-1-scaled.jpg",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2021/02/IMG_2442-Edit-scaled.jpg",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2021/02/IMG_9801-Edit.jpg",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2021/02/WhatsApp-Image-2021-02-24-at-7.51.09-PM.jpeg",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2021/03/IMG_5905-Edit.jpg",
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
    "image": "https://idberrybeauty.com/wp-content/uploads/2021/02/WhatsApp-Image-2021-02-24-at-7.50.34-PM.jpeg",
    "source_url": "https://idberrybeauty.com/product/idberry-snow-white-shower-bath/"
  }
]
