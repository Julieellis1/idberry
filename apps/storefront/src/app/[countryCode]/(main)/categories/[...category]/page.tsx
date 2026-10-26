import { Metadata } from "next"
import { notFound } from "next/navigation"

import { getCategoryByHandle } from "@lib/data/categories"
import CategoryTemplate from "@modules/categories/templates"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { parseOptionValueIds } from "@lib/util/product-option-filters"
import { CONCERNS } from "@lib/idberry"
import { buildPageMetadata } from "@lib/seo"

type Props = {
  params: Promise<{ category: string[]; countryCode: string }>
  searchParams: Promise<
    Record<string, string | string[] | undefined> & {
      sortBy?: SortOptions
      page?: string
      optionValueIds?: string | string[]
    }
  >
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  try {
    const productCategory = await getCategoryByHandle(params.category)

    const concern = CONCERNS.find((c) => c.handle === productCategory.handle)
    const description =
      productCategory.description ||
      `Shop IDBERRY Beauty skincare for ${productCategory.name.toLowerCase()}${
        concern ? ` (${concern.note.toLowerCase()})` : ""
      }: gentle, results-driven rituals for melanin-rich skin, made in Lagos.`

    return await buildPageMetadata({
      title: productCategory.name,
      description,
      countryCode: params.countryCode,
      path: `/categories/${params.category.join("/")}`,
    })
  } catch {
    notFound()
  }
}

export default async function CategoryPage(props: Props) {
  const searchParams = await props.searchParams
  const params = await props.params
  const { sortBy, page } = searchParams
  const optionValueIds = parseOptionValueIds(searchParams)

  const productCategory = await getCategoryByHandle(params.category)

  if (!productCategory) {
    notFound()
  }

  return (
    <CategoryTemplate
      category={productCategory}
      sortBy={sortBy}
      page={page}
      countryCode={params.countryCode}
      optionValueIds={optionValueIds}
    />
  )
}
