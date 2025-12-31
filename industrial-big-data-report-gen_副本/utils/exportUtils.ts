export async function exportToWord(element: HTMLElement, filename: string) {
  // Basic styles to ensure the exported document looks somewhat decent
  // Note: External CSS (Tailwind) won't fully persist in a simple HTML-to-Word export without inlining.
  // We add some basic CSS to handle the structure.
  const css = `
    <style>
      body { font-family: 'SimSun', 'Songti SC', serif; color: #000; }
      h1, h2, h3, h4 { font-family: 'SimHei', 'Heiti SC', sans-serif; }
      .page { margin: 20px auto; padding: 20px; background: white; }
      table { border-collapse: collapse; width: 100%; margin: 10px 0; }
      th, td { border: 1px solid #000; padding: 5px; text-align: left; }
      /* Terminal simulation styles for export */
      .bg-\\[\\#300a24\\] { background-color: #300a24; color: white; padding: 10px; font-family: monospace; }
      .text-white { color: white; }
      .text-black { color: black; }
    </style>
  `;

  // Construct the HTML document
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${filename}</title>
      ${css}
    </head>
    <body>
      ${element.innerHTML}
    </body>
    </html>
  `;
  
  // Create a Blob with the HTML content, using the Word MIME type
  const blob = new Blob(['\ufeff', htmlContent], {
    type: 'application/msword'
  });
  
  // Create a download link and trigger it
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.doc`; // .doc is more forgiving with raw HTML content than .docx
  document.body.appendChild(link);
  link.click();
  
  // Cleanup
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}