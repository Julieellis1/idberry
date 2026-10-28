import { HttpTypes } from "@medusajs/types"
import { Container, clx } from "@modules/common/components/ui"
import Image from "next/image"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
  selectedIndex?: number
  onSelect?: (index: number) => void
}

const ImageGallery = ({
  images,
  selectedIndex = 0,
  onSelect,
}: ImageGalleryProps) => {
  const selected = images[selectedIndex] ?? images[0]

  return (
    <div>
      <Container className="relative aspect-square w-full overflow-hidden rounded-3xl border border-blush bg-white shadow-sm">
        {!!selected?.url && (
          <Image
            src={selected.url}
            priority={true}
            className="absolute inset-0"
            alt={`Product image ${selectedIndex + 1}`}
            fill
            sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
            style={{
              objectFit: "contain",
            }}
          />
        )}
      </Container>
      {images.length > 1 && (
        <div className="mt-4 flex flex-wrap gap-3">
          {images.map((image, index) => {
            const active = index === selectedIndex
            return (
              <button
                key={image.id}
                type="button"
                onClick={() => onSelect?.(index)}
                aria-label={`View image ${index + 1}`}
                aria-pressed={active}
                className={clx(
                  "relative aspect-square h-20 w-20 shrink-0 overflow-hidden rounded-xl border bg-white transition-opacity duration-150 small:h-24 small:w-24",
                  active
                    ? "border-berry opacity-100 ring-2 ring-berry ring-offset-2 ring-offset-white"
                    : "border-blush opacity-60 hover:opacity-100"
                )}
              >
                {!!image.url && (
                  <Image
                    src={image.url}
                    className="absolute inset-0"
                    alt=""
                    fill
                    sizes="96px"
                    style={{
                      objectFit: "cover",
                    }}
                  />
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default ImageGallery
