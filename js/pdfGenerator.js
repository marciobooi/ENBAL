/**
 * PDF Generator Module
 * Handles accessible PDF generation for the Energy Balance application
 */

function download_DIVPdf() {
  const { jsPDF } = window.jspdf;

  const doc = new jsPDF("landscape", "pt");

  // Set comprehensive metadata for accessibility
  const titleText = translationsCache["title"] || "European Union Energy Report";
  const finalTitle = `${titleText} - Eurostat`;
  
  doc.setProperties({
    title: finalTitle,
    subject: translationsCache["subject"] || "Fuel Families Data",
    author: translationsCache["author"] || "Eurostat",
    keywords: translationsCache["keywords"] || "Energy, Fuel, EU",
    creator: translationsCache["creator"] || "Eurostat Team",
    language: REF.language.toLowerCase(),
    producer: "Eurostat Energy Balance Tool",
    // Enhanced accessibility metadata
    displayDocTitle: true,
    trapped: 'False',
    marked: true
  });

  // Add main document title (H1 level) - use standard fonts
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text(
    translationsCache['TOOLTITLE'] || 'Energy balances', 
    doc.internal.pageSize.getWidth() / 2, 
    30, 
    { align: "center" }
  );

  // Add subtitle (H2 level) - use standard fonts
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  
  // Build dynamic subtitle matching the web application format
  const geo = translationsCache[REF.geo] || REF.geo;
  const fuel = translationsCache[REF.fuel] || REF.fuel;
  const year = REF.year;
  const dynamicSubtitle = `${geo}, ${fuel}, ${year}`;
  
  doc.text(
    dynamicSubtitle,
    doc.internal.pageSize.getWidth() / 2,
    50,
    { align: "center" }
  );

  // Add description paragraph
  doc.setFontSize(10);
  doc.text(
    translationsCache["description"] || "This table provides detailed statistics about energy supply, consumption, and production across various fuel families in the European Union.",   
    20,
    70,
    { maxWidth: 750 }
  );

  // Extract headers for the table
  const headers = [];
  $("#dataTableContainer_wrapper > div.dt-scroll > div.dt-scroll-head > div > table > thead > tr > th").each(function () {
    const headerText = $(this).find(".tableHeader").text().trim() || $(this).text().trim();
    headers.push(headerText);
  });

  // Remove the last column if it's empty (contains action buttons/icons)
  if (headers.length > 0 && (headers[headers.length - 1] === "" || headers[headers.length - 1].trim() === "")) {
    headers.pop();
  }

  // Add empty first cell to align headers properly with data rows
  headers.unshift("");

  // Extract body rows for the table
  const body = [];
  $("#dataTableContainer tbody tr").each(function () {
    const row = [];
    $(this).find("td").each(function (index, cell) {
      let cellText = $(cell).text().trim();
      
      // Clean up number formatting - remove extra spaces and normalize
      if (!isNaN(cellText.replace(/\s/g, '').replace(',', '.')) && cellText.replace(/\s/g, '') !== '') {
        // This is a number - clean it up
        const cleanNumber = cellText.replace(/\s+/g, ' '); // Replace multiple spaces with single space
        row.push(cleanNumber);
      } else {
        // This is text - keep as is
        row.push(cellText);
      }
    });
    
    // Remove the last column if it exists (action buttons/icons column)
    if (row.length > 0 && (row[row.length - 1] === "" || row[row.length - 1].trim() === "")) {
      row.pop();
    }
    
    body.push(row);
  });

  // Generate accessible table with proper structure using the newer autoTable API
  let finalY = 95;
  try {
    // Calculate dynamic column widths
    const pageWidth = doc.internal.pageSize.getWidth();
    const margins = 40; // Total left + right margins
    const availableWidth = pageWidth - margins;
    const numberOfColumns = headers.length;
    
    // First column (labels) gets 20%, others share the remaining 80%
    const firstColumnWidth = availableWidth * 0.2; // 20% for labels
    const remainingWidth = availableWidth - firstColumnWidth;
    const dataColumnWidth = remainingWidth / (numberOfColumns - 1);
    
    // Build dynamic column styles
    const dynamicColumnStyles = {
      0: { 
        cellWidth: firstColumnWidth,
        halign: "left",
        fontStyle: "bold"
      }
    };
    
    // Add equal-width columns for all data columns
    for (let i = 1; i < numberOfColumns; i++) {
      dynamicColumnStyles[i] = {
        cellWidth: dataColumnWidth,
        halign: "right"
      };
    }

    doc.autoTable({
      head: [headers],
      body: body,
      startY: 95,
      theme: "striped",
      styles: {
        font: "aria",
        fontSize: 8,
        cellPadding: 5,
        overflow: "linebreak",
        lineColor: [200, 200, 200],
        lineWidth: 0.1,
        valign: 'middle'
      },
      headStyles: {
        fontStyle: "bold",
        fillColor: [10, 50, 142], // Eurostat dark blue #0a328e
        textColor: [255, 255, 255], // White text
        halign: 'center',
        valign: 'middle',
        minCellHeight: 25 // Taller headers
      },
      bodyStyles: {
        textColor: [0, 0, 0],
        minCellHeight: 20, // Increased row height for better breathing space
        fillColor: [255, 255, 255] // White background for data rows
      },
      alternateRowStyles: {
        fillColor: [240, 245, 255] // Light blue for alternate rows #f0f5ff
      },
      columnStyles: dynamicColumnStyles,
      didDrawPage: function (data) {
        // Add page numbers
        const pageCount = doc.internal.getNumberOfPages();
        doc.setFontSize(10);
        doc.text(
          `Page ${data.pageNumber} of ${pageCount}`,
          doc.internal.pageSize.getWidth() - 50,
          doc.internal.pageSize.getHeight() - 30
        );
      },
      // Fixed table width to fill the page
      tableWidth: availableWidth,
      margin: { top: 95, left: 20, right: 20 },
      showHead: 'everyPage',
      // Enhanced styling
      tableLineWidth: 0.1,
      tableLineColor: [10, 50, 142] // Eurostat blue for table borders
    });
    
    // Get the final Y position from the last autoTable
    finalY = doc.lastAutoTable ? doc.lastAutoTable.finalY : 95;
  } catch (error) {
    console.warn("AutoTable error:", error);
    finalY = 400; // fallback position
  }

  // Add Eurostat logo at the bottom center of the document
  const img = new Image();
  img.onload = function () {
    // Calculate positions for bottom center logo
    const pageWidth = doc.internal.pageSize.getWidth();
    const logoWidth = 100;
    const logoHeight = 40;
    const logoX = (pageWidth - logoWidth) / 2; // Center horizontally
    const logoY = finalY + 40; // Position below the table with some spacing
    
    // Add logo image at bottom center
    doc.addImage(
      img, 
      "PNG", 
      logoX, 
      logoY, 
      logoWidth, 
      logoHeight, 
      "EurostatLogo", 
      "NONE"
    );
    
    // Add caption for the logo below the image, centered
    doc.setFontSize(8);
    doc.text(
      "Figure 1: Eurostat Logo - Official logo of the European Statistical Office",
      pageWidth / 2,
      logoY + logoHeight + 15,
      { align: "center", maxWidth: 300 }
    );

    // Add accessibility note below the logo
    doc.setFontSize(8);
    doc.text(
      "This PDF contains structured data tables with headers for accessibility. Logo alt text: Eurostat",
      pageWidth / 2,
      logoY + logoHeight + 35,
      { align: "center", maxWidth: 500 }
    );

    // Save the PDF with accessible filename
    const fileName = translationsCache["file"] || `EU_Energy_Report_${REF.year}_${REF.language}.pdf`;
    doc.save(fileName);
  };
  
  img.onerror = function() {
    // Fallback if image fails to load
    console.warn("Logo image failed to load, continuing without image");
    
    // Add accessibility note without image, centered at bottom
    const pageWidth = doc.internal.pageSize.getWidth();
    doc.setFontSize(8);
    doc.text(
      "This PDF contains structured data tables with headers for accessibility.",
      pageWidth / 2,
      finalY + 40,
      { align: "center", maxWidth: 500 }
    );
    
    const fileName = translationsCache["file"] || `EU_Energy_Report_${REF.year}_${REF.language}.pdf`;
    doc.save(fileName);
  };
  
  img.crossOrigin = "anonymous";
  img.src = "img/logo.png";
}