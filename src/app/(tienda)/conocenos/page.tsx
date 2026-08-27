import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { NEGOCIO, telefonoLegible, whatsappUrl } from "@/lib/contacto";

export const metadata: Metadata = {
  title: "Conócenos — Abril Pastelería",
  description:
    "Desde 2019 horneamos en Manizales. Un obrador pequeño y terco: mantequilla de verdad, fruta de la plaza y café de fincas de Caldas.",
};

const pedido = whatsappUrl("Hola, leí su historia en la web y quiero encargar una torta en Abril.");

const valores = [
  [
    "Ingredientes de verdad",
    "Mantequilla, huevo y fruta de la plaza. Sin premezclas ni saborizantes: si no lo comeríamos en casa, no sale del horno.",
  ],
  [
    "Horneado el mismo día",
    "No trabajamos con stock. Cada torta se hornea para alguien que ya tiene fecha, nombre y motivo.",
  ],
  [
    "Diseño a tu medida",
    "Antes de encender el horno te enviamos un boceto. Eliges bizcocho, relleno y decoración hasta que sea tuya.",
  ],
  [
    "De Manizales, para Manizales",
    "Café de fincas de Caldas y proveedores de la ciudad. Domicilios propios a toda la ciudad.",
  ],
];

const hitos = [
  ["2019", "La primera cocina", "Un horno de casa en La Sultana y tortas para amigos y vecinos."],
  ["2021", "El obrador", "Abrimos local propio sobre la avenida, con horno profesional y vitrina."],
  ["2023", "Café y panadería", "Pan del día desde las 7:00 y café de origen para acompañarlo."],
  ["Hoy", "Más de 4.000 tortas", "Cumpleaños, bodas, grados y martes sin motivo en toda la ciudad."],
];

// ponytail: nombres y reseñas de ejemplo. Reemplaza los textos aquí y el resto
// de la página se acomoda sola; no hay nada más que tocar.
const equipo = [
  ["Nombre Apellido", "Pastelera principal", "Bizcochos, rellenos y la última palabra sobre el dulzor."],
  ["Nombre Apellido", "Decoración", "Flores, modelado y todo lo que se hace con pinza y paciencia."],
  ["Nombre Apellido", "Pedidos y domicilios", "Quien te responde el WhatsApp y quien toca tu puerta."],
];

const testimonios = [
  ["La torta de grado quedó idéntica al boceto y llegó a la hora exacta.", "Cliente de Manizales"],
  ["Pedí algo muy específico para el cumpleaños de mi mamá y entendieron la idea a la primera.", "Cliente de Manizales"],
  ["El pan de las 7 y el café son mi excusa para pasar por la avenida cada mañana.", "Cliente de Manizales"],
];

export default function Conocenos() {
  return (
    <>
      <section className="bg-rose">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div className="flex flex-col gap-7">
            <p className="label text-rose-ink">Conócenos · Desde 2019</p>
            <h1 className="display text-5xl sm:text-6xl lg:text-7xl">
              Un obrador
              <br />
              <em className="font-normal">pequeño y terco</em>
            </h1>
            <p className="max-w-md text-lg leading-relaxed text-muted text-pretty">
              Somos una pastelería nacida en Manizales. Crecimos con la idea de hacer algo nuevo:
              sabores que encanten los paladares y tortas que se parezcan a quien las recibe.
            </p>
            <dl className="flex gap-9 pt-2">
              {[
                ["2019", "Primer horno"],
                ["+4.000", "Tortas entregadas"],
                ["1", "Obrador propio"],
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
                src="/torta-gym.png"
                alt="Torta personalizada con figuras modeladas a mano en Abril Pastelería"
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

      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-[3/4] overflow-hidden border border-line">
              <Image
                src="/torta-85.png"
                alt="Torta de 85 años decorada en el obrador"
                width={600}
                height={800}
                className="size-full object-cover"
              />
            </div>
            <div className="mt-11 aspect-[3/4] overflow-hidden border border-line">
              <Image
                src="/torta-gym.png"
                alt="Detalle de figuras modeladas a mano"
                width={600}
                height={800}
                className="size-full object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <p className="label">Nuestra historia</p>
            <h2 className="display text-4xl sm:text-5xl">
              Empezó en una
              <br />
              cocina de casa
            </h2>
            <p className="text-lg leading-relaxed text-muted text-pretty">
              Abril nació de una cocina de casa en La Sultana, horneando para amigos que celebraban
              algo. Hoy es una pastelería con horno propio en {NEGOCIO.ciudad.split(",")[0]}, pero la
              forma de trabajar no cambió: mantequilla de verdad, fruta de la plaza y café de fincas
              de Caldas.
            </p>
            <p className="text-lg leading-relaxed text-muted text-pretty">
              No hacemos stock. Cada torta se hornea para alguien que ya tiene fecha y motivo, y por
              eso pedimos 48 horas de anticipación: preferimos decir que no a entregar algo tibio,
              apurado o parecido a lo que pediste.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-wash">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p className="label">Cómo trabajamos</p>
          <h2 className="display mt-3 max-w-2xl text-4xl sm:text-5xl">
            Cuatro cosas que no negociamos
          </h2>
          <dl className="mt-12 grid border-t border-l border-line sm:grid-cols-2">
            {valores.map(([titulo, detalle]) => (
              <div key={titulo} className="border-r border-b border-line bg-paper p-9">
                <dt className="font-serif text-2xl text-brand">{titulo}</dt>
                <dd className="mt-3 leading-relaxed text-muted text-pretty">{detalle}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="flex flex-col gap-6">
            <p className="label">Línea de tiempo</p>
            <h2 className="display text-4xl sm:text-5xl">
              De un horno
              <br />
              prestado a hoy
            </h2>
          </div>

          {/* La línea vertical es un borde de la lista, no un elemento aparte:
              crece sola con los hitos que se agreguen arriba. */}
          <ol className="flex flex-col gap-10 border-l border-line pl-9">
            {hitos.map(([año, titulo, detalle]) => (
              <li key={año} className="relative">
                <span className="absolute top-2 -left-[2.44rem] size-2.5 -translate-x-1/2 rounded-full bg-brand" />
                <p className="label text-rose-ink">{año}</p>
                <h3 className="mt-2 font-serif text-2xl text-brand">{titulo}</h3>
                <p className="mt-2 leading-relaxed text-muted text-pretty">{detalle}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-brand text-paper/75">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p className="label text-paper/45">El equipo</p>
          <h2 className="display mt-3 max-w-2xl text-4xl text-paper sm:text-5xl">
            Tres personas y un horno
          </h2>
          <ul className="mt-12 grid gap-10 sm:grid-cols-3">
            {equipo.map(([nombre, rol, detalle]) => (
              <li key={rol} className="flex flex-col gap-4">
                <span className="grid size-20 place-items-center rounded-full border border-paper/25 font-serif text-3xl text-paper">
                  {nombre.charAt(0)}
                </span>
                <div>
                  <h3 className="font-serif text-2xl text-paper">{nombre}</h3>
                  <p className="label mt-1 text-paper/45">{rol}</p>
                </div>
                <p className="leading-relaxed text-pretty">{detalle}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <p className="label">Lo que nos dicen</p>
        <h2 className="display mt-3 max-w-2xl text-4xl sm:text-5xl">
          El mejor postre es que vuelvan
        </h2>
        <ul className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonios.map(([texto, autor]) => (
            <li key={texto} className="flex flex-col gap-5 border border-line bg-surface p-9">
              <p className="font-serif text-2xl leading-snug text-brand text-pretty">“{texto}”</p>
              <p className="label mt-auto">{autor}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-rose">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-7 px-6 py-24">
          <p className="label text-rose-ink">Hablemos</p>
          <h2 className="display max-w-2xl text-4xl sm:text-5xl">
            ¿Nos cuentas qué estás celebrando?
          </h2>
          <p className="max-w-md text-lg leading-relaxed text-muted text-pretty">
            Escríbenos al {telefonoLegible} con la fecha, las porciones y una idea del diseño. Te
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
            <Link
              href="/#catalogo"
              className="border border-brand px-8 py-4 text-xs tracking-[0.24em] text-brand uppercase transition-colors hover:bg-brand/10"
            >
              Ver el catálogo
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
