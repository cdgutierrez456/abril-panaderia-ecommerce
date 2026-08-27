import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { NEGOCIO, REDES, telUrl, telefonoLegible, whatsappUrl } from "@/lib/contacto";
import { IconoFacebook, IconoInstagram, IconoWhatsApp } from "./iconos";

const saludo = whatsappUrl(
  "Hola, vi el sitio de Abril Pastelería y me gustaría encargar una torta.",
);

const redes = [
  { nombre: "WhatsApp", url: saludo, icono: <IconoWhatsApp /> },
  { nombre: "Instagram", url: REDES.instagram, icono: <IconoInstagram /> },
  { nombre: "Facebook", url: REDES.facebook, icono: <IconoFacebook /> },
];

export default async function TiendaLayout({ children }: { children: React.ReactNode }) {
  const db = await supabase();
  const [{ data: categories }, { data: session }] = await Promise.all([
    db.from("categories").select("name, slug").order("position"),
    // Solo decide si se pinta el enlace al panel. Quien proteja /admin es el
    // proxy y las policies RLS, no este if.
    db.auth.getUser(),
  ]);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-20 border-b border-line bg-paper/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-6 px-6 py-3.5 sm:gap-8">
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <Image
              src="/abril-logo.png"
              alt=""
              width={46}
              height={46}
              className="size-11 rounded-full"
              priority
            />
            <span className="hidden flex-col leading-none sm:flex">
              <span className="font-serif text-[1.35rem] tracking-[0.2em] text-brand">ABRIL</span>
              <span className="mt-1 text-[0.5rem] tracking-[0.36em] text-faint">PASTELERÍA</span>
            </span>
          </Link>

          <nav className="flex flex-1 items-center gap-6 overflow-x-auto">
            <Link href="/" className="label whitespace-nowrap hover:text-brand">
              Todo
            </Link>
            {categories?.map((c) => (
              <Link
                key={c.slug}
                href={`/?categoria=${c.slug}`}
                className="label whitespace-nowrap hover:text-brand"
              >
                {c.name}
              </Link>
            ))}
            <Link href="/conocenos" className="label whitespace-nowrap hover:text-brand">
              Conócenos
            </Link>
            <Link href="/#visitanos" className="label whitespace-nowrap hover:text-brand">
              Visítanos
            </Link>
          </nav>

          {session.user && (
            <Link
              href="/admin"
              className="label border-l border-line pl-6 whitespace-nowrap hover:text-brand"
            >
              Panel ↗
            </Link>
          )}

          <a
            href={saludo}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden bg-brand px-6 py-3 text-[0.6875rem] tracking-[0.24em] text-paper uppercase transition-colors hover:bg-ink lg:block"
          >
            Pedir por WhatsApp
          </a>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-ink text-paper/75">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 pt-16 pb-8 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <Image
              src="/abril-logo.png"
              alt=""
              width={76}
              height={76}
              className="size-19 rounded-full"
            />
            <p className="mt-4 max-w-64 text-sm leading-relaxed text-paper/60">
              Pastelería artesanal en Manizales. Tortas personalizadas, café y panadería del día.
            </p>
          </div>

          <div className="flex flex-col gap-3.5">
            <p className="label text-paper/45">Catálogo</p>
            <Link href="/" className="text-sm hover:text-paper">
              Todas las tortas
            </Link>
            {categories?.slice(0, 3).map((c) => (
              <Link key={c.slug} href={`/?categoria=${c.slug}`} className="text-sm hover:text-paper">
                {c.name}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3.5">
            <p className="label text-paper/45">Contacto</p>
            <span className="text-sm">{NEGOCIO.direccion}</span>
            <span className="text-sm">{NEGOCIO.ciudad}</span>
            <a href={telUrl} className="text-sm hover:text-paper">
              WhatsApp {telefonoLegible}
            </a>
            <a href={`mailto:${NEGOCIO.email}`} className="text-sm hover:text-paper">
              {NEGOCIO.email}
            </a>
          </div>

          <div className="flex flex-col gap-3.5">
            <p className="label text-paper/45">Síguenos</p>
            <ul className="flex gap-2">
              {redes.map((r) => (
                <li key={r.nombre}>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={r.nombre}
                    title={r.nombre}
                    className="grid size-11 place-items-center border border-paper/25 text-paper/70 transition-colors hover:border-paper hover:text-paper"
                  >
                    {r.icono}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-paper/15 px-6 py-7 text-xs text-paper/50">
          {/* La página es dinámica, así que el año se calcula en cada petición
              y no se queda congelado en el del último despliegue. */}
          {/* Entrada discreta al panel: sin subrayado, color ni hover propios.
              El reset de Tailwind ya hace que un <a> herede el estilo del
              texto, así que basta con no darle clases. No es una medida de
              seguridad —de eso se encargan el login y RLS—, solo evita el
              enlace "Admin" a la vista de todos. */}
          <p>
            © {new Date().getFullYear()}{" "}
            <Link href="/login" aria-label="Panel administrativo">
              {NEGOCIO.nombre}
            </Link>
          </p>

          <p>Precios de referencia. Consulta disponibilidad antes de comprar.</p>

          <p>
            By{" "}
            <a
              href="https://scaleautomatization.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 transition-colors hover:text-paper"
            >
              Scale Automatization
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
