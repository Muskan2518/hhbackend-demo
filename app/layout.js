import './globals.css';

export const metadata = {
  title: 'HH Patients Care - Healthcare Discounts Made Simple',
  description: 'Get exclusive discounts on healthcare services from partnered hospitals and diagnostic centers. Download the HH Patients Care app today!',
  keywords: 'healthcare, discounts, patient care, hospital discounts, diagnostic discounts, membership card, HH Patients Care',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "'Inter', sans-serif" }}>{children}</body>
    </html>
  );
}
