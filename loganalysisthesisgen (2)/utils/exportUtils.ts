import { toPng } from 'html-to-image';

export const exportToWord = async (element: HTMLElement, filename = 'document') => {
  const clone = element.cloneNode(true) as HTMLElement;

  const cleanLayoutForExport = (root: HTMLElement) => {
    root.style.display = 'block';
    root.style.backgroundColor = 'white';

    const pages = root.querySelectorAll('.page-break');

    pages.forEach((page, index) => {
      const p = page as HTMLElement;
      p.style.boxShadow = 'none';
      p.style.margin = '0';
      p.style.width = '100%';
      p.style.height = 'auto';
      p.style.border = 'none';
      p.style.backgroundColor = 'white';

      if (index > 0) {
        const breakNode = document.createElement('br');
        breakNode.setAttribute('style', 'page-break-before: always; mso-break-type: section-break; clear: both;');
        p.parentNode?.insertBefore(breakNode, p);
      }
    });

    root.querySelectorAll('.no-print').forEach(el => el.remove());
  };

  cleanLayoutForExport(clone);

  // INLINE STYLES FOR WORD
  const inlineStyles = (root: HTMLElement) => {
    root.querySelectorAll('[style*="Times New Roman"]').forEach((el) => {
      if (!el.classList.contains('font-hei') && !el.classList.contains('font-song')) {
        (el as HTMLElement).style.fontFamily = '"Times New Roman", serif';
      }
    });

    root.querySelectorAll('.font-hei').forEach((el) => {
      (el as HTMLElement).style.fontFamily = '"Times New Roman", "SimHei", "Heiti SC", "STHeiti", sans-serif';
    });

    root.querySelectorAll('.font-song').forEach((el) => {
      (el as HTMLElement).style.fontFamily = '"Times New Roman", "SimSun", "Songti SC", "STSong", serif';
    });

    root.querySelectorAll('.mt-8').forEach((el) => {
      (el as HTMLElement).style.marginTop = '24pt';
      (el as HTMLElement).style.display = 'block';
    });

    root.querySelectorAll('.text-\\[16pt\\]').forEach(el => {
      const h = el as HTMLElement;
      h.style.fontSize = '18pt';
      h.style.marginTop = '18pt';
      h.style.marginBottom = '14.4pt';
      h.style.lineHeight = '22pt';
    });

    root.querySelectorAll('.text-\\[14pt\\]').forEach(el => {
      const h = el as HTMLElement;
      h.style.fontSize = '15pt';
      h.style.marginTop = '9pt';
      h.style.marginBottom = '9pt';
      h.style.lineHeight = '22pt';
    });

    root.querySelectorAll('h5').forEach(el => {
      const h = el as HTMLElement;
      h.style.fontSize = '14pt';
      h.style.marginTop = '9pt';
      h.style.marginBottom = '9pt';
      h.style.lineHeight = '22pt';
      h.style.textIndent = '0';
    });

    root.querySelectorAll('.text-\\[10\\.5pt\\]').forEach(el => (el as HTMLElement).style.fontSize = '10.5pt');

    root.querySelectorAll('p').forEach((el) => {
      const p = el as HTMLElement;
      if (!p.className.includes('text-center') && !p.style.textAlign?.includes('center')) {
        p.style.fontSize = '12pt';
        p.style.lineHeight = '22pt';
        p.style.textIndent = '2em';
        p.style.textAlign = 'justify';
        p.style.marginTop = '0';
        p.style.marginBottom = '0';
      }
    });

    root.querySelectorAll('.text-center').forEach((el) => {
      (el as HTMLElement).style.textAlign = 'center';
      (el as HTMLElement).style.textIndent = '0';
      (el as HTMLElement).style.justifyContent = 'center';
    });
    root.querySelectorAll('.text-justify').forEach((el) => {
      (el as HTMLElement).style.textAlign = 'justify';
    });
    root.querySelectorAll('.font-bold').forEach((el) => {
      (el as HTMLElement).style.fontWeight = 'bold';
    });
    root.querySelectorAll('.border-b').forEach((el) => {
      (el as HTMLElement).style.borderBottom = '1px solid black';
    });
  };

  inlineStyles(clone);

  // 使用 html-to-image 替代 html2canvas
  const complexElements = Array.from(element.querySelectorAll('.capture-as-image'));
  const cloneComplexElements = Array.from(clone.querySelectorAll('.capture-as-image'));

  for (let i = 0; i < complexElements.length; i++) {
    const originalEl = complexElements[i] as HTMLElement;
    const cloneEl = cloneComplexElements[i] as HTMLElement;

    try {
      if (cloneEl) {
        // 使用 html-to-image 的 toPng 方法
        const imgData = await toPng(originalEl, {
          quality: 1,
          pixelRatio: 2,
          backgroundColor: '#ffffff',
        });

        const wrapper = document.createElement('div');
        wrapper.style.textAlign = 'center';
        wrapper.style.marginBottom = '12pt';
        wrapper.style.pageBreakInside = 'avoid';

        const img = document.createElement('img');
        img.src = imgData;
        img.setAttribute('width', '550');
        img.style.maxWidth = '100%';
        img.style.height = 'auto';

        wrapper.appendChild(img);
        cloneEl.parentNode?.replaceChild(wrapper, cloneEl);
      }
    } catch (error) {
      console.error("Failed to snapshot element:", error);
    }
  }

  // Convert regular img tags to base64
  const imgElements = Array.from(clone.querySelectorAll('img')) as HTMLImageElement[];
  for (const img of imgElements) {
    if (img.src.startsWith('data:')) continue;

    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const tempImg = new Image();
      tempImg.crossOrigin = 'anonymous';

      await new Promise<void>((resolve) => {
        tempImg.onload = () => {
          canvas.width = tempImg.naturalWidth;
          canvas.height = tempImg.naturalHeight;
          ctx?.drawImage(tempImg, 0, 0);
          try {
            const base64Data = canvas.toDataURL('image/png');
            img.src = base64Data;
            img.setAttribute('width', '450');
            img.style.width = '450px';
            img.style.height = 'auto';
            img.style.display = 'block';
            img.style.margin = '0 auto';
          } catch (e) {
            console.error('Failed to convert image to base64:', e);
          }
          resolve();
        };
        tempImg.onerror = () => resolve();
        tempImg.src = img.src;
      });
    } catch (error) {
      console.error("Failed to process image:", error);
    }
  }

  const preHeader = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' 
          xmlns:w='urn:schemas-microsoft-com:office:word' 
          xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset='utf-8'>
      <title>${filename}</title>
      <xml>
        <w:WordDocument>
          <w:View>Print</w:View>
          <w:Zoom>100</w:Zoom>
          <w:DoNotOptimizeForBrowser/>
        </w:WordDocument>
      </xml>
      <style>
        body { 
          font-family: "Times New Roman", "SimSun", "Songti SC", serif; 
          font-size: 12pt; 
          line-height: 1.5;
        }
        @page {
          size: 210mm 297mm;
          margin: 25.4mm 25.4mm 25.4mm 25.4mm;
          mso-page-orientation: portrait;
        }
        .page-break {
          page-break-before: always;
          mso-break-type: section-break;
          clear: both;
          display: block;
        }
        h1, h2, h3, h4 { 
          font-family: "Times New Roman", "SimHei", "Heiti SC", "STHeiti", sans-serif; 
          font-weight: bold;
        }
        p {
          margin: 0 0 10pt 0;
          text-align: justify;
          text-indent: 2em;
        }
        .text-center, p[style*="text-align: center"] {
          text-indent: 0 !important;
          text-align: center !important;
        }
        table { 
          border-collapse: collapse; 
          width: 100%; 
        }
        img {
          max-width: 100%;
          height: auto;
        }
      </style>
    </head>
    <body>
  `;

  const postFooter = "</body></html>";
  const htmlContent = preHeader + clone.innerHTML + postFooter;

  const blob = new Blob(['\ufeff', htmlContent], {
    type: 'application/msword'
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.doc`;

  document.body.appendChild(link);

  if ((navigator as any).msSaveOrOpenBlob) {
    (navigator as any).msSaveOrOpenBlob(blob, `${filename}.doc`);
  } else {
    link.click();
  }

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
