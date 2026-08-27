import Image from "next/image";
import Link from "next/link";
import { supabase, imageUrl, one } from "@/lib/supabase";
import { finalPrice, price } from "@/lib/format";
import { NEGOCIO, telUrl, telefonoLegible, whatsappUrl } from "@/lib/contacto";

const pedido = whatsappUrl(
  "Hola, quiero encargar una torta en Abril. Les cuento la fecha, las porciones y la idea del diseño:",
);

const pasos = [
  ["01", "Nos escribes", "Fecha, porciones, sabor y referencias de diseño."],
  ["02", "Cotizamos y bocetamos", "Te enviamos precio y un boceto del diseño final."],
  ["03", "Abonas el 50%", "Con eso reservamos tu fecha en el horno."],
  ["04", "Recoges o te la llevamos", "Domicilio en Manizales el día y hora que elijas."],
];

export default async function Home({ searchParams }: PageProps<"/">) {
  const { categoria } = await searchParams;
  const db = await supabase();

  let query = db
    .from("products")
    .select("id, name, slug, price, discount_percent, images(path, position), categories(name, slug)")
    .eq("active", true)
    .order("created_at", { ascending: false });

  if (typeof categoria === "string") {
    const { data: cat } = await db.from("categories").select("id").eq("slug", categoria).single();
    query = query.eq("category_id", cat?.id ?? "00000000-0000-0000-0000-000000000000");
  }

  const { data: products } = await query;

  return (
    <>
      <section className="bg-rose">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div className="flex flex-col gap-7">
            <p className="label text-rose-ink">
              {NEGOCIO.ciudad.split(",")[0]} · {NEGOCIO.direccion}
            </p>
            <h1 className="display text-5xl sm:text-6xl lg:text-7xl">
              Tortas hechas
              <br />
              <em className="font-normal">a tu medida</em>
            </h1>
            <p className="max-w-md text-lg leading-relaxed text-muted text-pretty">
              Pastelería artesanal para cumpleaños, bodas, grados y los martes sin motivo. Café,
              panadería y postres todos los días.
            </p>
            <div className="flex flex-wrap gap-3.5">
              <a
                href={pedido}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand px-8 py-4 text-xs tracking-[0.24em] text-paper uppercase transition-colors hover:bg-ink"
              >
                Encargar mi torta
              </a>
              <a
                href="#catalogo"
                className="border border-brand px-8 py-4 text-xs tracking-[0.24em] text-brand uppercase transition-colors hover:bg-brand/10"
              >
                Ver el catálogo
              </a>
            </div>
            <dl className="flex gap-9 pt-2">
              {[
                ["48h", "Anticipación"],
                ["7:00", "Pan del día"],
                ["100%", "Domicilios"],
              ].map(([dato, pie]) => (
                <div key={pie}>
                  <dt className="font-serif text-3xl text-brand">{dato}</dt>
                  <dd className="label mt-1 text-rose-ink">{pie}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative mx-auto flex w-full max-w-md items-center justify-center">
            <div className="absolute aspect-square w-[104%] rounded-full border border-brand/25" />
            <div className="aspect-square w-[88%] overflow-hidden rounded-full">
              <Image
                src="/torta-85.png"
                alt="Torta de cumpleaños decorada por Abril Pastelería"
                width={880}
                height={880}
                className="size-full object-cover"
                priority
              />
            </div>
            <Image
              src="/abril-logo.png"
              alt=""
              width={118}
              height={118}
              className="absolute bottom-[2%] left-0 size-24 rounded-full shadow-lg sm:size-28"
            />
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="label mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-6 py-6">
          <span>Tortas personalizadas</span>
          <span className="text-rose">·</span>
          <span>Café de origen</span>
          <span className="text-rose">·</span>
          <span>Panadería del día</span>
          <span className="text-rose">·</span>
          <span>Postres por porción</span>
          <span className="text-rose">·</span>
          <span>Domicilios en Manizales</span>
        </div>
      </section>

      <section id="catalogo" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20">
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="label">{categoria ?? "Nuestro catálogo"}</p>
            <h2 className="display mt-3 text-4xl sm:text-5xl">
              Para cada ocasión
              <br />
              que vale la pena
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-muted text-pretty">
            Eliges bizcocho, relleno y diseño. Nosotros lo horneamos el mismo día de la entrega.
            <span className="mt-2 block text-faint">{products?.length ?? 0} referencias</span>
          </p>
        </div>

        {!products?.length ? (
          <p className="py-20 text-center text-sm text-muted">
            Todavía no hay productos publicados.
          </p>
        ) : (
          <ul className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-3">
            {products.map((p) => {
              const cover = p.images.sort((a, b) => a.position - b.position)[0];
              const category = one(p.categories);
              const rebaja = p.discount_percent > 0;
              return (
                <li key={p.id}>
                  <Link href={`/producto/${p.slug}`} className="group block">
                    {/* Mismo criterio que la ficha: contain para no recortar.
                        El recuadro con borde mantiene la grilla pareja aunque
                        las fotos vengan con encuadres distintos. */}
                    <div className="relative aspect-[3/4] overflow-hidden border border-line bg-surface">
                      {cover ? (
                        <Image
                          src={imageUrl(cover.path)}
                          alt={p.name}
                          fill
                          sizes="(max-width: 1024px) 50vw, 33vw"
                          className="object-contain p-4 transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="grid h-full place-items-center text-xs text-faint">
                          Sin imagen
                        </div>
                      )}
                      {/* La etiqueta rosa solo aparece cuando hay rebaja: el
                          precio ya va debajo de la foto y repetirlo arriba no
                          agrega nada. */}
                      {rebaja && (
                        <span className="absolute top-4 left-4 bg-rose px-3 py-1.5 text-[0.625rem] tracking-[0.22em] text-brand uppercase">
                          −{p.discount_percent}%
                        </span>
                      )}
                    </div>
                    <div className="mt-4 flex items-baseline justify-between gap-3">
                      <h3 className="font-serif text-2xl text-brand">{p.name}</h3>
                      <p className="shrink-0 text-sm tabular-nums text-muted">
                        {rebaja ? (
                          <>
                            <span className="mr-2 text-faint line-through">{price(p.price)}</span>
                            {price(finalPrice(p.price, p.discount_percent))}
                          </>
                        ) : (
                          price(p.price)
                        )}
                      </p>
                    </div>
                    {category && <p className="label mt-1">{category.name}</p>}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section id="nosotros" className="bg-brand text-paper/75">
        <div className="mx-auto grid max-w-6xl scroll-mt-24 items-center gap-16 px-6 py-24 lg:grid-cols-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-[3/4] overflow-hidden">
              <Image
                src="/torta-gym.png"
                alt="Torta personalizada con figuras modeladas a mano"
                width={600}
                height={800}
                className="size-full object-cover"
              />
            </div>
            <div className="mt-11 aspect-[3/4] overflow-hidden">
              <Image
                src="/torta-85.png"
                alt="Torta de 85 años en el salón de Abril"
                width={600}
                height={800}
                className="size-full object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <p className="label text-paper/45">Nosotros</p>
            <h2 className="display text-4xl text-paper sm:text-5xl">
              Un obrador
              <br />
              pequeño y terco
            </h2>
            <p className="text-lg leading-relaxed text-pretty">
              Abril nació de una cocina de casa en La Sultana y hoy es una pastelería con horno
              propio. Trabajamos con mantequilla de verdad, fruta de la plaza y café de fincas de
              Caldas.
            </p>
            <p className="text-lg leading-relaxed text-pretty">
              No hacemos stock: cada torta se hornea para alguien que ya tiene fecha y motivo.
            </p>
            <dl className="mt-2 flex divide-x divide-paper/20 border border-paper/20">
              <div className="flex-1 p-6">
                <dt className="font-serif text-3xl text-paper">2019</dt>
                <dd className="label mt-1 text-paper/45">Primer horno</dd>
              </div>
              <div className="flex-1 p-6">
                <dt className="font-serif text-3xl text-paper">+4.000</dt>
                <dd className="label mt-1 text-paper/45">Tortas entregadas</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section id="pedido" className="bg-rose">
        <div className="mx-auto grid max-w-6xl scroll-mt-24 items-center gap-16 px-6 py-24 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <p className="label text-rose-ink">Pedidos</p>
            <h2 className="display text-4xl sm:text-5xl">
              Cuéntanos qué
              <br />
              estás celebrando
            </h2>
            <p className="max-w-md text-lg leading-relaxed text-muted text-pretty">
              Escríbenos por WhatsApp con la fecha, el número de porciones y una idea del diseño. Te
              confirmamos precio el mismo día.
            </p>
            <div className="flex flex-wrap gap-3.5">
              <a
                href={pedido}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand px-8 py-4 text-xs tracking-[0.24em] text-paper uppercase transition-colors hover:bg-ink"
              >
                Escribir por WhatsApp
              </a>
              <a
                href={telUrl}
                className="border border-brand px-8 py-4 text-xs tracking-[0.24em] text-brand uppercase transition-colors hover:bg-brand/10"
              >
                Llamar
              </a>
            </div>
          </div>

          <ol className="flex flex-col gap-7 bg-paper p-10">
            <li className="label">Cómo funciona</li>
            {pasos.map(([n, titulo, detalle]) => (
              <li key={n} className="flex items-start gap-5">
                <span className="font-serif text-3xl leading-none text-rose-ink/60">{n}</span>
                <span>
                  <span className="block font-serif text-xl text-brand">{titulo}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted">{detalle}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="visitanos" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <p className="label">Visítanos</p>
            <h2 className="display text-4xl sm:text-5xl">
              {NEGOCIO.direccion},
              <br />
              {NEGOCIO.ciudad}
            </h2>
            <dl className="grid grid-cols-2 border-t border-l border-line">
              {[
                ...NEGOCIO.horarios.map((h) => [h.dias, h.horas] as const),
                ["WhatsApp", telefonoLegible] as const,
              ].map(([titulo, valor]) => (
                <div key={titulo} className="border-r border-b border-line p-6">
                  <dt className="label">{titulo}</dt>
                  <dd className="mt-1 font-serif text-2xl text-brand">{valor}</dd>
                </div>
              ))}
            </dl>
            <p className="max-w-md text-sm leading-relaxed text-muted">
              Parqueadero sobre la avenida. Aceptamos efectivo, tarjeta y transferencia.
            </p>
          </div>

          {/* Mapa embebido de Google sin API key: se busca por dirección, así
              que sale de la misma constante que el resto de la sección. Es
              raster, no WebGL, y funciona sin configurar nada. */}
          <iframe
            title={`Mapa de ${NEGOCIO.nombre}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              `${NEGOCIO.direccion}, ${NEGOCIO.ciudad}`,
            )}&output=embed`}
            className="min-h-[420px] w-full border border-line"
          />
        </div>
      </section>
    </>
  );
}
