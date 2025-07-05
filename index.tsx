import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import Head from 'next/head';

const zonas = {
  "Zona Estudiantil": [
    "CU", "LA HUERTA", "ALTOZANO", "CAMELINAS", "TRES MARÍAS",
    "VENTURA PUENTE", "ODONTOLOGÍA", "FACULTAD DE DERECHO", "TEC DE MORELIA", "TEC DE MONTERREY"
  ],
  "Zona Corporativa": ["Camelinas", "Torre Financiera", "Chapultepec", "Las Américas"],
  "Zona Familiar": ["Bosques Camelinas", "Lomas del Tecnológico", "Ejidal Ocolusen", "Jardines del Rincón"]
};

const propiedadesEjemplo = [
  {
    titulo: "Cuarto amueblado cerca de CU",
    zona: "CU",
    costo: "$2,500 MXN",
    imagen: "/propiedad1.jpg",
    servicios: ["Internet", "Agua", "Luz", "Acceso independiente"],
    tipo: "Cuarto"
  },
  {
    titulo: "Departamento en Altozano totalmente equipado",
    zona: "ALTOZANO",
    costo: "$7,800 MXN",
    imagen: "/propiedad2.jpg",
    servicios: ["Cocina equipada", "2 Recámaras", "Seguridad 24h", "Estacionamiento"],
    tipo: "Departamento"
  },
  {
    titulo: "Casa amplia en Tres Marías ideal para estudiantes",
    zona: "TRES MARÍAS",
    costo: "$10,000 MXN",
    imagen: "/propiedad3.jpg",
    servicios: ["3 Recámaras", "Patio trasero", "Cisterna", "Acepta mascotas"],
    tipo: "Casa"
  }
];

export default function Home() {
  const [zonaSeleccionada, setZonaSeleccionada] = useState('');
  const [ubicacionSeleccionada, setUbicacionSeleccionada] = useState('');
  const [tipo, setTipo] = useState('');
  const [presupuesto, setPresupuesto] = useState('');

  const filtrarPropiedades = () => {
    return propiedadesEjemplo.filter(p =>
      (!zonaSeleccionada || zonas[zonaSeleccionada].includes(p.zona)) &&
      (!ubicacionSeleccionada || p.zona === ubicacionSeleccionada) &&
      (!tipo || p.tipo === tipo)
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>RentaEstudia - Encuentra tu espacio ideal</title>
      </Head>

      <header className="bg-white shadow-md px-6 py-4 flex items-center">
        <Image src="/f7bfbd10-f5f7-463c-9c25-68f1400d1ca3.png" alt="Logo RentaEstudia" width={50} height={50} className="mr-3" />
        <h1 className="text-2xl md:text-3xl font-bold text-blue-900">RentaEstudia</h1>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-800">Filtra tu búsqueda</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold">Zona:</label>
              <select className="w-full p-2 border rounded" onChange={(e) => { setZonaSeleccionada(e.target.value); setUbicacionSeleccionada(''); }}>
                <option value="">-- Selecciona zona --</option>
                {Object.keys(zonas).map(z => (
                  <option key={z} value={z}>{z}</option>
                ))}
              </select>
            </div>

            {zonaSeleccionada && (
              <div>
                <label className="block font-semibold">Ubicación específica:</label>
                <select className="w-full p-2 border rounded" onChange={(e) => setUbicacionSeleccionada(e.target.value)}>
                  <option value="">-- Todas --</option>
                  {zonas[zonaSeleccionada].map(u => (
                    <option key={u} value={u}>{u}</option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block font-semibold">Presupuesto máximo (MXN):</label>
              <input type="number" className="w-full p-2 border rounded" onChange={(e) => setPresupuesto(e.target.value)} />
            </div>

            <div>
              <label className="block font-semibold">Tipo de propiedad:</label>
              <select className="w-full p-2 border rounded" onChange={(e) => setTipo(e.target.value)}>
                <option value="">-- Todos --</option>
                <option value="Departamento">Departamento</option>
                <option value="Cuarto">Cuarto</option>
                <option value="Casa">Casa</option>
              </select>
            </div>
          </div>
        </div>

        <section>
          <h2 className="text-xl font-semibold text-blue-800 mb-4">Propiedades destacadas</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {filtrarPropiedades().map((p, idx) => (
              <Card key={idx} className="rounded-2xl shadow-md border border-gray-200">
                <Image src={p.imagen} alt={p.titulo} width={400} height={250} className="rounded-t-2xl" />
                <CardContent className="p-4">
                  <h2 className="text-lg font-bold text-blue-900">{p.titulo}</h2>
                  <p className="text-gray-600">Zona: {p.zona}</p>
                  <p className="text-green-600 font-semibold">{p.costo}</p>
                  <ul className="text-sm text-gray-600 mt-2 space-y-1">
                    {p.servicios.map((s, i) => <li key={i}>• {s}</li>)}
                  </ul>
                  <a
                    href="https://wa.me/5213521364109"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">Contactar por WhatsApp</Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}