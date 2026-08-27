"use client";

import { useState } from "react";
import { price } from "@/lib/format";
import { whatsappUrl } from "@/lib/contacto";
import { IconoWhatsApp } from "../../iconos";

type Variante = { label: string | null; stock: number };

export function Contacto({
  nombre,
  categoria,
  precioLista,
  precioFinal,
  descuento,
  variantes,
}: {
  nombre: string;
  categoria: string | null;
  precioLista: number;
  precioFinal: number;
  descuento: number;
  variantes: Variante[];
}) {
  const conTamano = variantes.filter((v) => v.label);
  const [tamano, setTamano] = useState(
    () => conTamano.find((v) => v.stock > 0)?.label ?? conTamano[0]?.label ?? null,
  );
  const [cantidad, setCantidad] = useState(1);

  const elegida = conTamano.length ? conTamano.find((v) => v.label === tamano) : variantes[0];
  const disponible = elegida?.stock ?? 0;

  const mensaje = [
    "Hola, me interesa este producto de Abril Pastelería:",
    "",
    `*${nombre}*`,
    categoria && `Categoría: ${categoria}`,
    tamano && `Tamaño: ${tamano}`,
    `Cantidad: ${cantidad}`,
    descuento > 0
      ? `Precio: ${price(precioFinal)} c/u (antes ${price(precioLista)}, −${descuento}%)`
      : `Precio: ${price(precioFinal)} c/u`,
    cantidad > 1 && `Total: ${price(precioFinal * cantidad)}`,
    "",
    "¿Me confirmas disponibilidad y cómo hago el pedido?",
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <div className="mt-8 border-t border-line pt-8">
      {conTamano.length > 0 && (
        <>
          <p className="label">Tamaño</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {conTamano.map((v) => (
              <li key={v.label}>
                <button
                  type="button"
                  disabled={v.stock === 0}
                  onClick={() => {
                    setTamano(v.label);
                    setCantidad(1);
                  }}
                  className={`border px-4 py-2 text-sm transition-colors ${
                    v.label === tamano
                      ? "border-brand bg-brand text-paper"
                      : v.stock === 0
                        ? "cursor-not-allowed border-line text-faint line-through decoration-1"
                        : "border-line hover:border-brand"
                  }`}
                >
                  {v.label}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}

      <div className="mt-6 flex items-end gap-4">
        <label className="w-24">
          <span className="label">Cantidad</span>
          <input
            className="field mt-1.5"
            type="number"
            min={1}
            max={Math.max(1, disponible)}
            value={cantidad}
            onChange={(e) => setCantidad(Math.max(1, Number(e.target.value) || 1))}
          />
        </label>
        <p className="pb-2.5 text-xs text-muted">
          {disponible > 0 ? `${disponible} disponibles` : "Agotado"}
        </p>
      </div>

      <a
        href={whatsappUrl(mensaje)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 flex items-center justify-center gap-2.5 bg-whatsapp py-3.5 text-xs tracking-[0.14em] text-ink uppercase transition-opacity hover:opacity-85"
      >
        <IconoWhatsApp className="size-4" />
        Contactar con vendedor
      </a>

      <p className="mt-3 text-center text-xs text-faint">
        Abre WhatsApp con los datos del producto ya escritos.
      </p>
    </div>
  );
}
