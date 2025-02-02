// app/inventory/page.tsx
import { getCarData } from '@/lib/googleSheet';

// Revalidate this page every 60 seconds (optional)
export const revalidate = 60;

export default async function InventoryPage() {
  // Provide a fallback empty array if getCarData() returns undefined
  const cars = (await getCarData()) ?? [];

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Car Inventory</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
        {cars.map((car, idx) => (
          <div key={idx} style={{ border: '1px solid #ccc', padding: '1rem', width: '300px' }}>
            <h2>{car.model}</h2>
            <p>Year: {car.year}</p>
            <p>Price: {car.price}</p>
            {car.imageUrl && (
              <img 
                src={car.imageUrl} 
                alt={car.model} 
                style={{ width: '100%', height: 'auto' }} 
              />
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
