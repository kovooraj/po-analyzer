import { useState, useRef } from "react";

const PRODUCT_TYPES = ["Roll Labels", "Product Boxes", "Pouches", "Roll Stock", "Cut & Stack Labels", "Mixed"];

const SPECS_CONFIG = {
  "Roll Labels": [
    { key: "cutShape", label: "Cut Shape", type: "select", options: ["Circle", "Custom", "Oval", "Rectangle", "Square"] },
    { key: "finishingType", label: "Finishing Type", type: "select", options: ["None", "Gloss UV", "Matte UV", "Gloss Lamination", "Matte Lamination"] },
    { key: "inkColour", label: "Ink Colour", type: "select", options: ["CMYK", "CMYK + White ink"] },
    { key: "materialType", label: "Material Type", type: "select", options: ["White Bright Paper Permanent","White Bright Paper Removable","White Opaque Paper Permanent","White Semi-Gloss Litho Paper Freezer Permanent","White Litho Paper Wet-Strength Permanent","White Classic Crest Paper Wet-Strength Permanent","Estate #4 Paper Permanent","Silver Foil Paper Freezer Permanent","Pink Fluorescent Paper Permanent","Red Fluorescent Paper Permanent","Green Fluorescent Paper Permanent","Orange Fluorescent Paper Permanent","Yellow Fluorescent Paper Permanent","White Poly Permanent","Silver Poly Permanent","White Gloss BOPP Permanent","Silver Brushed BOPP Permanent","Clear BOPP","White Gloss BOPP Freezer","White Gloss BOPP Permanent PET Liner"] },
    { key: "perforation", label: "Perforation", type: "select", options: ["Yes", "No"] },
    { key: "quantityPerRoll", label: "Qty per Roll", type: "text", placeholder: "e.g. 250" },
    { key: "windDirection", label: "Wind Direction", type: "select", options: ["Does Not Matter", "(1) Top", "(2) Bottom", "(3) Right", "(4) Left"] },
  ],
  "Product Boxes": [
    { key: "dieReferenceNumber", label: "Die Reference #", type: "text", placeholder: "e.g. DIE-1234" },
    { key: "dieRequired", label: "Die Required?", type: "select", options: ["Yes", "No"] },
    { key: "finishingType", label: "Finishing Type", type: "select", options: ["Gloss UV","Matte UV","Gloss Lamination","Matte Lamination","Soft Touch Lamination","Metallic Foil","Spot UV","No Coating"] },
    { key: "foldingCartonFormat", label: "Carton Format", type: "select", options: ["Straight Tuck End","Reverse Tuck End","Auto Bottom","1-2-3 Bottom","Seal End","Tuck Top Snap Lock Bottom"] },
    { key: "inkColour", label: "Ink Colour", type: "select", options: ["CMYK", "CMYK + White"] },
    { key: "materialType", label: "Material Type", type: "select", options: ["14pt SBS","16pt SBS","18pt SBS","24pt SBS","Kraft"] },
    { key: "perforation", label: "Perforation", type: "select", options: ["Yes", "No"] },
    { key: "printMethod", label: "Print Method", type: "select", options: ["Offset", "Digital"] },
    { key: "sidesPrinted", label: "Sides Printed", type: "select", options: ["4/0", "4/4"] },
  ],
  "Pouches": [
    { key: "finishingType", label: "Finishing Type", type: "select", options: ["Gloss Lamination (PET) - 0.5 mil","Matte Lamination (PET) - 0.5mil","Soft touch Lamination (PET) - 0.5 mil","Recycle lamination (PE) - 0.9 Mil"] },
    { key: "gusset", label: "Gusset (in)", type: "text", placeholder: "e.g. 3" },
    { key: "holeType", label: "Hole Type", type: "text", placeholder: "e.g. Euro slot" },
    { key: "inkColour", label: "Ink Colour", type: "select", options: ["CMYK", "CMYK + White"] },
    { key: "materialType", label: "Material Type", type: "select", options: ["Clear PE (3.5 mil)","White PE (3.5 mil)","Metallic PET (0.5 mil METPET + 3.5mil Clear PE)","Metallic PET (0.5 mil METPET + 3.5mil White PE)","Clear PE (1.5 Mil)","White PE (1.5 mil)"] },
    { key: "roundCorners", label: "Round Corners?", type: "select", options: ["Yes", "No"] },
    { key: "tearNotch", label: "Tear Notch?", type: "select", options: ["Yes", "No"] },
    { key: "zipperType", label: "Zipper Type", type: "select", options: ["None", "Standard Zipper", "CR Zipper"] },
  ],
  "Roll Stock": [
    { key: "finishingType", label: "Finishing Type", type: "select", options: ["Gloss Lamination (PET) - 0.5 mil","Matte Lamination (PET) - 0.5mil","Soft touch Lamination (PET) - 0.5 mil","High Barrier ALOx (PET) - 0.5 mil"] },
    { key: "repeatLength", label: "Repeat Length (in)", type: "text", placeholder: "e.g. 5" },
    { key: "inkColour", label: "Ink Colour", type: "select", options: ["CMYK", "CMYK + White"] },
    { key: "materialType", label: "Material Type", type: "select", options: ["Clear PE (1.5 Mil)","White PE (1.5 mil)","METPET + 1.5 Clear PE - 2 Mil","METPET + 1.5 White PE - 2 Mil","Clear PE (3.5 mil)","White PE (3.5 mil)","Metallic PET (0.5 mil METPET + 3.5mil Clear PE)","Metallic PET (0.5 mil METPET + 3.5mil White PE)"] },
    { key: "quantityPerRoll", label: "Qty per Roll", type: "select", options: ["50","100","250","500","1,000","2,500"] },
    { key: "rollWidth", label: "Roll Width (in)", type: "text", placeholder: "e.g. 12" },
    { key: "windDirection", label: "Wind Direction", type: "select", options: ["(1) Top", "(2) Bottom"] },
  ],
  "Cut & Stack Labels": [
    { key: "finishingType", label: "Finishing Type", type: "select", options: ["AQ","Gloss Lamination","Gloss UV","Matte Lamination","Matte UV","Metallic Foil","No Coating","Soft Touch Lamination","Spot UV"] },
    { key: "inkColour", label: "Ink Colour", type: "select", options: ["4/0", "5/0", "6/0"] },
    { key: "materialType", label: "Material Type", type: "select", options: ["60lb Oxford Paper"] },
    { key: "perforation", label: "Perforation", type: "text", placeholder: "e.g. Horizontal" },
    { key: "pmsColors", label: "# of PMS Colors", type: "text", placeholder: "e.g. 2" },
    { key: "pmsColorsDetails", label: "PMS Colors Details", type: "text", placeholder: "e.g. PMS 485" },
    { key: "finishingSides", label: "Finishing Sides", type: "text", placeholder: "e.g. Front only" },
  ],
};

function groupBySize(items) {
  const groups = {};
  items.forEach((item) => {
    const w = item.width != null && item.width !== "" ? String(item.width) : "?";
    const h = item.height != null && item.height !== "" ? String(item.height) : "?";
    const key = `${w}" × ${h}"`;
    if (!groups[key]) groups[key] = { sizeKey: key, width: w, height: h, items: [] };
    groups[key].items.push(item);
  });
  return Object.values(groups);
}

function buildCSV(groups, groupSpecs, productType) {
  const fields = productType !== "Mixed" ? (SPECS_CONFIG[productType] || []) : [];
  const q = v => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const headers = ["Size (W x H)", "Sets", "Total Quantity", ...fields.map(f => f.label), "Notes"];
  const rows = groups.map(g => {
    const specs = groupSpecs[g.sizeKey] || {};
    const totalQty = g.items.reduce((s, it) => s + (Number(it.quantity) || 0), 0);
    const notes = g.items.map(it => `${it.sku ? it.sku + ": " : ""}${it.description} (Qty: ${it.quantity})`).join(" | ");
    return [g.sizeKey, g.items.length, totalQty, ...fields.map(f => specs[f.key] || ""), notes];
  });
  return [headers, ...rows].map(r => r.map(q).join(",")).join("\n");
}

// Dynamically load jsPDF + autotable then generate PDF
async function downloadSummaryPDF({ groups, groupSpecs, productType, lineItems, fileName }) {
  if (!window.jspdf) {
    await new Promise((res, rej) => {
      const s = document.createElement("script");
      s.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
      s.onload = res; s.onerror = rej;
      document.head.appendChild(s);
    });
  }
  if (!window.jspdf?.jsPDF?.prototype?.autoTable) {
    await new Promise((res, rej) => {
      const s = document.createElement("script");
      s.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js";
      s.onload = res; s.onerror = rej;
      document.head.appendChild(s);
    });
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "letter" });
  const specFields = productType !== "Mixed" ? (SPECS_CONFIG[productType] || []) : [];
  const totalQty = lineItems.reduce((s, it) => s + (Number(it.quantity) || 0), 0);

  doc.setFillColor(15, 36, 66);
  doc.rect(0, 0, 280, 18, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text("Purchase Order Summary", 10, 12);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(`Product Type: ${productType}   ·   ${lineItems.length} SKUs   ·   ${totalQty.toLocaleString()} total units   ·   Generated: ${new Date().toLocaleDateString()}`, 10, 17.5);

  const summaryHead = [["Size (W × H)", "Sets", "Total Qty", ...specFields.map(f => f.label)]];
  const summaryBody = groups.map(g => {
    const specs = groupSpecs[g.sizeKey] || {};
    const gQty = g.items.reduce((s, it) => s + (Number(it.quantity) || 0), 0);
    return [g.sizeKey, g.items.length, gQty.toLocaleString(), ...specFields.map(f => specs[f.key] || "—")];
  });
  summaryBody.push(["TOTAL", lineItems.length + " SKUs", totalQty.toLocaleString(), ...specFields.map(() => "")]);

  doc.autoTable({
    startY: 22,
    head: summaryHead,
    body: summaryBody,
    theme: "grid",
    styles: { fontSize: 9, cellPadding: 3, font: "helvetica" },
    headStyles: { fillColor: [15, 36, 66], textColor: 255, fontStyle: "bold", fontSize: 9 },
    columnStyles: { 0: { fontStyle: "bold", fillColor: [235, 241, 255] } },
    didDrawRow: (data) => {
      if (data.row.index === summaryBody.length - 1) {
        data.row.cells && Object.values(data.row.cells).forEach(cell => {
          cell.styles.fillColor = [248, 249, 251];
          cell.styles.fontStyle = "bold";
        });
      }
    },
    alternateRowStyles: { fillColor: [249, 250, 252] },
    margin: { left: 10, right: 10 },
  });

  let y = doc.lastAutoTable.finalY + 10;

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 36, 66);
  doc.text("Version Breakdown Notes", 10, y);
  y += 6;

  doc.setDrawColor(200, 210, 230);
  doc.setLineWidth(0.4);
  doc.line(10, y, 270, y);
  y += 5;

  const pageH = doc.internal.pageSize.getHeight();

  groups.forEach(g => {
    const gQty = g.items.reduce((s, it) => s + (Number(it.quantity) || 0), 0);

    if (y > pageH - 30) { doc.addPage(); y = 15; }

    doc.setFillColor(219, 234, 254);
    doc.roundedRect(10, y - 4, 260, 8, 1.5, 1.5, "F");
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(30, 58, 138);
    doc.text(g.sizeKey, 13, y + 1);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 100, 130);
    doc.text(`${g.items.length} SKU${g.items.length !== 1 ? "s" : ""}  ·  ${gQty.toLocaleString()} total units`, 60, y + 1);
    y += 10;

    const notesHead = [["SKU / Code", "Description", "Qty"]];
    const notesBody = g.items.map(it => [
      it.sku || "—",
      it.description,
      Number(it.quantity).toLocaleString() + " ea",
    ]);

    if (y > pageH - 20) { doc.addPage(); y = 15; }

    doc.autoTable({
      startY: y,
      head: notesHead,
      body: notesBody,
      theme: "striped",
      styles: { fontSize: 8, cellPadding: 2.5 },
      headStyles: { fillColor: [240, 244, 255], textColor: [30, 58, 138], fontStyle: "bold", fontSize: 8 },
      columnStyles: {
        0: { cellWidth: 40, fontStyle: "bold" },
        1: { cellWidth: "auto" },
        2: { cellWidth: 28, halign: "right", fontStyle: "bold", textColor: [5, 150, 105] },
      },
      alternateRowStyles: { fillColor: [250, 251, 255] },
      margin: { left: 10, right: 10 },
    });

    y = doc.lastAutoTable.finalY + 8;
  });

  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(7.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(160, 160, 160);
    doc.text(`Page ${i} of ${pageCount}  ·  SinaLite PO Analyzer`, 10, pageH - 5);
    doc.text(new Date().toLocaleString(), 270, pageH - 5, { align: "right" });
  }

  doc.save(fileName || "PO-Summary.pdf");
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=DM+Mono:wght@400;500&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
.app{font-family:'DM Sans',sans-serif;min-height:100vh;background:#f1f3f6;color:#1a2333;}
.hdr{background:#0f2442;padding:14px 28px;display:flex;align-items:center;justify-content:space-between;}
.hdr-logo{font-size:17px;font-weight:700;color:#fff;letter-spacing:-.5px;}
.hdr-logo span{color:#f97316;}
.hdr-badge{background:rgba(255,255,255,.12);color:rgba(255,255,255,.7);font-size:11px;font-weight:600;padding:4px 10px;border-radius:100px;letter-spacing:.5px;}
.steps{background:#fff;border-bottom:1px solid #e5e7eb;padding:0 28px;display:flex;align-items:center;}
.step{display:flex;align-items:center;gap:7px;padding:13px 18px 13px 0;font-size:12.5px;font-weight:500;color:#9ca3af;}
.step.active{color:#0f2442;}.step.done{color:#059669;}
.step-n{width:22px;height:22px;border-radius:50%;border:2px solid currentColor;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;flex-shrink:0;}
.step.active .step-n{background:#0f2442;border-color:#0f2442;color:#fff;}
.step.done .step-n{background:#059669;border-color:#059669;color:#fff;}
.sep{color:#d1d5db;margin-right:18px;font-size:13px;}
.main{max-width:1180px;margin:0 auto;padding:28px 20px;}
.card{background:#fff;border-radius:12px;border:1px solid #e5e7eb;padding:22px;margin-bottom:18px;box-shadow:0 1px 3px rgba(0,0,0,.05);}
.card-ttl{font-size:14px;font-weight:700;color:#0f2442;margin-bottom:15px;display:flex;align-items:center;gap:8px;}
.card-ttl .ico{width:26px;height:26px;background:#f0f4ff;border-radius:7px;display:flex;align-items:center;justify-content:center;font-size:13px;}
.type-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:9px;}
@media(max-width:580px){.type-grid{grid-template-columns:repeat(2,1fr);}}
.type-btn{border:2px solid #e5e7eb;background:#fafafa;border-radius:10px;padding:13px 10px;cursor:pointer;text-align:center;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;color:#374151;transition:all .15s;}
.type-btn:hover{border-color:#0f2442;background:#f0f4ff;color:#0f2442;}
.type-btn.sel{border-color:#0f2442;background:#0f2442;color:#fff;}
.type-btn.sel.mix{border-color:#f97316;background:#f97316;}
.drop{border:2px dashed #d1d5db;border-radius:11px;padding:36px;text-align:center;cursor:pointer;transition:all .2s;background:#fafafa;}
.drop:hover,.drop.drag{border-color:#0f2442;background:#f0f4ff;}
.drop.hasfile{border-color:#059669;background:#f0fdf4;}
.drop-ico{font-size:34px;margin-bottom:10px;}
.drop-txt{font-size:14px;font-weight:600;color:#374151;margin-bottom:3px;}
.drop-sub{font-size:12px;color:#9ca3af;}
.fname{font-size:13px;font-weight:600;color:#059669;margin-top:7px;}
.btn{display:inline-flex;align-items:center;gap:6px;padding:9px 18px;border-radius:8px;font-family:'DM Sans',sans-serif;font-size:13.5px;font-weight:600;cursor:pointer;border:none;transition:all .15s;}
.btn-pri{background:#0f2442;color:#fff;}.btn-pri:hover:not(:disabled){background:#1a3a6e;}
.btn-pri:disabled{opacity:.4;cursor:not-allowed;}
.btn-org{background:#f97316;color:#fff;}.btn-org:hover{background:#ea6c0d;}
.btn-out{background:#fff;color:#374151;border:1.5px solid #d1d5db;}.btn-out:hover{border-color:#0f2442;color:#0f2442;}
.btn-ok{background:#059669;color:#fff;}
.btn-pdf{background:#7c3aed;color:#fff;}.btn-pdf:hover{background:#6d28d9;}
.btn-pdf:disabled{opacity:.5;cursor:wait;}
.analyzing{text-align:center;padding:56px;}
.spin{width:44px;height:44px;border:4px solid #e5e7eb;border-top-color:#0f2442;border-radius:50%;animation:spin .8s linear infinite;margin:0 auto 18px;}
@keyframes spin{to{transform:rotate(360deg);}}
.atitle{font-size:17px;font-weight:700;color:#0f2442;margin-bottom:7px;}
.asub{font-size:13px;color:#6b7280;}
.err{background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:11px 15px;color:#dc2626;font-size:13px;font-weight:500;margin-bottom:15px;}
.badge{display:inline-flex;align-items:center;background:#f0f4ff;color:#0f2442;font-size:11px;font-weight:700;padding:3px 8px;border-radius:100px;}
.badge.org{background:#fff7ed;color:#f97316;}.badge.grn{background:#f0fdf4;color:#059669;}
.group-wrap{overflow-x:auto;}
.gtable{width:100%;border-collapse:collapse;font-size:13px;}
.gtable th{background:#f8f9fb;padding:9px 12px;text-align:left;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:#6b7280;border-bottom:2px solid #e8ebf0;white-space:nowrap;}
.gtable td{padding:0;vertical-align:top;}
.group-hdr-row{cursor:pointer;}
.group-hdr-row:hover .gcell{background:#f6f8ff;}
.group-hdr-row.is-open .gcell{background:#f0f5ff;border-bottom:none;}
.gcell{padding:11px 12px;border-bottom:1px solid #f0f0f0;transition:background .1s;}
.size-mono{font-family:'DM Mono',monospace;font-size:13.5px;font-weight:500;color:#1e3a8a;background:#dbeafe;padding:4px 9px;border-radius:6px;display:inline-block;white-space:nowrap;}
.sets-chip{background:#fff7ed;color:#c2410c;font-weight:700;font-size:12px;padding:3px 10px;border-radius:100px;border:1.5px solid #fdba74;white-space:nowrap;}
.qty-mono{font-family:'DM Mono',monospace;font-size:13px;font-weight:600;color:#166534;}
.chev{font-size:10px;color:#9ca3af;transition:transform .2s;display:inline-block;line-height:1;}
.chev.open{transform:rotate(90deg);}
.detail-row td{padding:0;border-bottom:1px solid #e8edff;}
.detail-inner{background:#f5f8ff;padding:12px 14px 14px 46px;border-top:1px solid #dde6ff;}
.detail-ttl{font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.6px;color:#6b7280;margin-bottom:9px;}
.sku-list{display:flex;flex-direction:column;gap:5px;}
.sku-row{display:flex;align-items:baseline;gap:9px;padding:6px 10px;background:#fff;border-radius:7px;border:1px solid #e8edff;}
.sku-code{font-family:'DM Mono',monospace;font-size:10.5px;font-weight:600;color:#6b7280;flex-shrink:0;min-width:100px;}
.sku-desc{flex:1;font-size:12.5px;color:#1a2333;}
.sku-qty{font-family:'DM Mono',monospace;font-size:11.5px;font-weight:700;color:#059669;background:#f0fdf4;padding:2px 7px;border-radius:4px;flex-shrink:0;}
.cell-sel,.cell-inp{border:1.5px solid #dde3f0;border-radius:7px;padding:6px 8px;font-family:'DM Sans',sans-serif;font-size:12px;color:#1a2333;background:#fff;outline:none;transition:border-color .15s;width:100%;min-width:130px;}
.cell-sel:focus,.cell-inp:focus{border-color:#3b82f6;box-shadow:0 0 0 2px rgba(59,130,246,.1);}
.cell-sel{cursor:pointer;}
.notes-card{background:#fff;border-radius:12px;border:1px solid #e5e7eb;padding:20px;margin-bottom:18px;box-shadow:0 1px 3px rgba(0,0,0,.05);}
.notes-ttl{font-size:14px;font-weight:700;color:#0f2442;margin-bottom:16px;display:flex;align-items:center;gap:8px;}
.notes-ico{width:26px;height:26px;background:#f0f4ff;border-radius:7px;display:flex;align-items:center;justify-content:center;font-size:13px;flex-shrink:0;}
.ng{margin-bottom:18px;}.ng:last-child{margin-bottom:0;}
.ng-hdr{display:flex;align-items:center;gap:9px;margin-bottom:8px;}
.ng-size{font-family:'DM Mono',monospace;font-size:12.5px;font-weight:600;color:#1e3a8a;background:#dbeafe;padding:3px 9px;border-radius:5px;}
.ng-meta{font-size:11.5px;color:#6b7280;font-weight:500;}
.ng-items{display:flex;flex-direction:column;gap:4px;}
.ng-item{display:flex;align-items:baseline;gap:9px;padding:6px 10px;background:#f9fafb;border-radius:7px;border:1px solid #f0f0f0;}
.ni-sku{font-family:'DM Mono',monospace;font-size:10.5px;font-weight:600;color:#6b7280;flex-shrink:0;min-width:80px;}
.ni-desc{flex:1;font-size:12.5px;color:#1a2333;}
.ni-qty{font-family:'DM Mono',monospace;font-size:11.5px;font-weight:700;color:#059669;background:#f0fdf4;padding:2px 7px;border-radius:4px;flex-shrink:0;}
.stable{width:100%;border-collapse:collapse;font-size:13px;}
.stable th{background:#f8f9fb;padding:9px 12px;text-align:left;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:#6b7280;border-bottom:1px solid #e5e7eb;}
.stable td{padding:10px 12px;border-bottom:1px solid #f3f4f6;font-size:13px;}
.stable tr:last-child td{border-bottom:none;}
.stable .tot{font-weight:700;background:#f8f9fb;}
.out-area{background:#f8f9fb;border:1px solid #e5e7eb;border-radius:9px;padding:14px;font-family:'DM Mono',monospace;font-size:11px;color:#374151;overflow:auto;max-height:280px;white-space:pre;}
.export-btns{display:flex;align-items:center;gap:10px;flex-wrap:wrap;}
.fl{display:flex;}.ac{align-items:center;}.jb{justify-content:space-between;}.je{justify-content:flex-end;}.g3{gap:12px;}.mt3{margin-top:12px;}.mt4{margin-top:15px;}
`;

export default function POAnalyzer() {
  const [step, setStep] = useState(0);
  const [productType, setProductType] = useState("");
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [lineItems, setLineItems] = useState([]);
  const [groupSpecs, setGroupSpecs] = useState({});
  const [openGroups, setOpenGroups] = useState({});
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const fileInputRef = useRef();

  const specFields = productType !== "Mixed" ? (SPECS_CONFIG[productType] || []) : [];
  const groups = groupBySize(lineItems);
  const totalQty = lineItems.reduce((s, it) => s + (Number(it.quantity) || 0), 0);

  const onDrop = (e) => {
    e.preventDefault(); setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f?.type === "application/pdf") setFile(f);
  };

  const analyzePO = async () => {
    if (!file || !productType) return;
    setError(null); setStep(1);
    try {
      const base64 = await new Promise((res, rej) => {
        const r = new FileReader();
        r.onload = () => res(r.result.split(",")[1]);
        r.onerror = () => rej(new Error("Failed to read file"));
        r.readAsDataURL(file);
      });

      const promptText = `Extract ALL line items from this purchase order. Return ONLY a valid JSON array — no markdown fences, no explanation. Start with [ and end with ].

Each object must have exactly these keys:
- "sku": item number or product code (string). Use the Number column if present, otherwise use Item #.
- "description": full product description (string)
- "width": width converted to INCHES as a plain decimal number. Parse dimensions from descriptions using these rules:
    • "3x5" → width=3 (already inches)
    • "2.5x4.25" → width=2.5
    • "76mm x 127mm" or "76 mm × 127 mm" → convert mm to inches: 76/25.4 = 2.99 → round to 2 decimals
    • "10cm x 15cm" → convert cm to inches: 10/2.54 = 3.94 → round to 2 decimals
    • If the unit is clearly cm, divide by 2.54. If mm, divide by 25.4. If already inches or no unit given for numeric values, use as-is.
    • Return null if no dimensions found.
- "height": height converted to INCHES as a plain decimal number using the same conversion rules above. Return null if not found.
- "quantity": ordered quantity as a plain number with no commas or units (e.g. 2500 not "2,500 ea")

Example: [{"sku":"WP-001","description":"WP Labels - Green 60/30 Back 3x5","width":3,"height":5,"quantity":2500}]`;

      let resp;
      try {
        resp = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pdf_base64: base64, prompt: promptText }),
        });
      } catch (fetchErr) {
        throw new Error(`Network error: ${fetchErr.message}`);
      }

      if (!resp.ok) {
        const errText = await resp.text().catch(() => "unknown");
        throw new Error(`API error ${resp.status}: ${errText.slice(0, 200)}`);
      }

      const data = await resp.json().catch(() => { throw new Error("API returned invalid response"); });
      if (data.error) throw new Error(`API: ${data.error.message || JSON.stringify(data.error)}`);

      const raw = data.content?.find(b => b.type === "text")?.text || "";
      if (!raw) throw new Error("API returned empty content.");

      let items;
      try {
        let cleaned = raw.trim().replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```\s*$/i, "").trim();
        const start = cleaned.indexOf("["), end = cleaned.lastIndexOf("]");
        if (start === -1 || end === -1) throw new Error("No JSON array found");
        items = JSON.parse(cleaned.slice(start, end + 1));
      } catch (e) {
        throw new Error(`Parse error: ${e.message}. Response preview: ${raw.slice(0, 300)}`);
      }

      if (!Array.isArray(items) || items.length === 0)
        throw new Error("No line items found in this PO.");

      const grouped = groupBySize(items);
      const initSpecs = {}, initOpen = {};
      grouped.forEach(g => {
        initSpecs[g.sizeKey] = {};
        (SPECS_CONFIG[productType] || []).forEach(f => (initSpecs[g.sizeKey][f.key] = ""));
        initOpen[g.sizeKey] = true;
      });

      setLineItems(items);
      setGroupSpecs(initSpecs);
      setOpenGroups(initOpen);
      setStep(2);
    } catch (e) {
      setError(e.message || "Unknown error.");
      setStep(0);
    }
  };

  const toggleGroup = sk => setOpenGroups(s => ({ ...s, [sk]: !s[sk] }));
  const updateSpec = (sk, key, val) =>
    setGroupSpecs(s => ({ ...s, [sk]: { ...(s[sk] || {}), [key]: val } }));

  const copyCSV = () => {
    const csv = buildCSV(groups, groupSpecs, productType);
    navigator.clipboard.writeText(csv).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2200); });
  };

  const handleDownloadPDF = async () => {
    setPdfLoading(true);
    try {
      const baseName = file?.name?.replace(/\.pdf$/i, "") || "PO-Summary";
      await downloadSummaryPDF({ groups, groupSpecs, productType, lineItems, fileName: `${baseName}-Summary.pdf` });
    } catch (e) {
      setError(`PDF generation failed: ${e.message}`);
    } finally {
      setPdfLoading(false);
    }
  };

  const reset = () => {
    setStep(0); setProductType(""); setFile(null);
    setLineItems([]); setGroupSpecs({}); setOpenGroups({}); setError(null);
  };

  const STEP_LABELS = ["Upload PO", "Analyzing", "Confirm & Specs", "Export"];

  const NotesSection = () => (
    <div className="notes-card">
      <div className="notes-ttl">
        <div className="notes-ico">📝</div>
        Notes — Full Version Breakdown
      </div>
      {groups.map(g => {
        const gQty = g.items.reduce((s, it) => s + (Number(it.quantity) || 0), 0);
        return (
          <div key={g.sizeKey} className="ng">
            <div className="ng-hdr">
              <span className="ng-size">{g.sizeKey}</span>
              <span className="ng-meta">{g.items.length} SKU{g.items.length !== 1 ? "s" : ""} · {gQty.toLocaleString()} total units</span>
            </div>
            <div className="ng-items">
              {g.items.map((it, i) => (
                <div key={i} className="ng-item">
                  <span className="ni-sku">{it.sku || `Item ${i + 1}`}</span>
                  <span className="ni-desc">{it.description}</span>
                  <span className="ni-qty">{Number(it.quantity).toLocaleString()} ea</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <>
      <style>{CSS}</style>
      <div className="app">
        <div className="hdr">
          <div className="hdr-logo">Sina<span>Lite</span> · PO Analyzer</div>
          <div className="hdr-badge">Sales Tool</div>
        </div>

        <div className="steps">
          {STEP_LABELS.map((label, i) => (
            <div key={i} className="fl ac">
              <div className={`step${step === i ? " active" : ""}${step > i ? " done" : ""}`}>
                <div className="step-n">{step > i ? "✓" : i + 1}</div>{label}
              </div>
              {i < 3 && <span className="sep">›</span>}
            </div>
          ))}
        </div>

        <div className="main">
          {error && <div className="err">⚠️ {error}</div>}

          {/* Step 0 */}
          {step === 0 && (<>
            <div className="card">
              <div className="card-ttl"><div className="ico">📦</div>What product is this PO for?</div>
              <div className="type-grid">
                {PRODUCT_TYPES.map(t => (
                  <button key={t}
                    className={`type-btn${productType === t ? " sel" : ""}${t === "Mixed" && productType === t ? " mix" : ""}`}
                    onClick={() => setProductType(t)}>{t}
                  </button>
                ))}
              </div>
            </div>
            <div className="card">
              <div className="card-ttl"><div className="ico">📄</div>Upload Purchase Order (PDF)</div>
              <input ref={fileInputRef} type="file" accept=".pdf" style={{ display: "none" }}
                onChange={e => setFile(e.target.files[0])} />
              <div className={`drop${dragging ? " drag" : ""}${file ? " hasfile" : ""}`}
                onClick={() => fileInputRef.current.click()}
                onDragOver={e => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={onDrop}>
                <div className="drop-ico">{file ? "✅" : "📎"}</div>
                {file ? (<>
                  <div className="drop-txt">File ready</div>
                  <div className="fname">{file.name}</div>
                </>) : (<>
                  <div className="drop-txt">Drop PO PDF here or click to browse</div>
                  <div className="drop-sub">PDF files only</div>
                </>)}
              </div>
              <div className="fl je mt4">
                <button className="btn btn-pri" disabled={!file || !productType} onClick={analyzePO}>
                  Analyze PO →
                </button>
              </div>
            </div>
          </>)}

          {/* Step 1 */}
          {step === 1 && (
            <div className="card">
              <div className="analyzing">
                <div className="spin" />
                <div className="atitle">Analyzing Purchase Order…</div>
                <div className="asub">Claude is reading your PO and extracting all line items</div>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (<>
            <div className="fl ac g3" style={{ marginBottom: 16 }}>
              <span className="badge">{lineItems.length} total SKUs</span>
              <span className="badge grn">{groups.length} size group{groups.length !== 1 ? "s" : ""}</span>
              <span className="badge org">{productType}</span>
            </div>

            <div className="card" style={{ padding: 0, overflow: "hidden" }}>
              <div style={{ padding: "16px 20px 13px", borderBottom: "1px solid #f0f0f0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#0f2442", display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 26, height: 26, background: "#f0f4ff", borderRadius: 7, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>📐</span>
                  Size Groups & Specifications
                </div>
                <span style={{ fontSize: 11, color: "#9ca3af", fontStyle: "italic" }}>Click row to expand · Specs apply per size group</span>
              </div>
              <div className="group-wrap">
                <table className="gtable">
                  <thead>
                    <tr>
                      <th style={{ width: 36 }}></th>
                      <th>Size (W × H)</th>
                      <th>Sets</th>
                      <th>Total Qty</th>
                      {specFields.map(f => <th key={f.key}>{f.label}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {groups.map(g => {
                      const specs = groupSpecs[g.sizeKey] || {};
                      const gQty = g.items.reduce((s, it) => s + (Number(it.quantity) || 0), 0);
                      const isOpen = openGroups[g.sizeKey];
                      return (
                        <>
                          <tr key={g.sizeKey + "-hdr"} className={`group-hdr-row${isOpen ? " is-open" : ""}`}
                            onClick={() => toggleGroup(g.sizeKey)}>
                            <td className="gcell" style={{ textAlign: "center" }}>
                              <span className={`chev${isOpen ? " open" : ""}`}>▶</span>
                            </td>
                            <td className="gcell"><span className="size-mono">{g.sizeKey}</span></td>
                            <td className="gcell"><span className="sets-chip">{g.items.length} set{g.items.length !== 1 ? "s" : ""}</span></td>
                            <td className="gcell"><span className="qty-mono">{gQty.toLocaleString()}</span></td>
                            {specFields.map(f => (
                              <td className="gcell" key={f.key} onClick={e => e.stopPropagation()}>
                                {f.type === "select" ? (
                                  <select className="cell-sel" value={specs[f.key] || ""}
                                    onChange={e => updateSpec(g.sizeKey, f.key, e.target.value)}>
                                    <option value="">Select…</option>
                                    {f.options.map(o => <option key={o} value={o}>{o}</option>)}
                                  </select>
                                ) : (
                                  <input className="cell-inp" value={specs[f.key] || ""}
                                    onChange={e => updateSpec(g.sizeKey, f.key, e.target.value)}
                                    placeholder={f.placeholder || ""} />
                                )}
                              </td>
                            ))}
                          </tr>
                          {isOpen && (
                            <tr key={g.sizeKey + "-detail"}>
                              <td colSpan={4 + specFields.length} style={{ padding: 0 }}>
                                <div className="detail-inner">
                                  <div className="detail-ttl">All SKUs in this group</div>
                                  <div className="sku-list">
                                    {g.items.map((it, i) => (
                                      <div key={i} className="sku-row">
                                        <span className="sku-code">{it.sku || `Item ${i + 1}`}</span>
                                        <span className="sku-desc">{it.description}</span>
                                        <span className="sku-qty">{Number(it.quantity).toLocaleString()} ea</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <NotesSection />

            <div className="fl je g3">
              <button className="btn btn-out" onClick={reset}>← Start Over</button>
              <button className="btn btn-org" onClick={() => setStep(3)}>Generate Output →</button>
            </div>
          </>)}

          {/* Step 3 */}
          {step === 3 && (<>
            <div className="card">
              <div className="card-ttl"><div className="ico">📊</div>Order Summary</div>
              <div style={{ overflowX: "auto", borderRadius: 9, border: "1px solid #e5e7eb" }}>
                <table className="stable">
                  <thead>
                    <tr>
                      <th>Size (W × H)</th>
                      <th>Sets</th>
                      <th>Total Qty</th>
                      {specFields.map(f => <th key={f.key}>{f.label}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {groups.map(g => {
                      const specs = groupSpecs[g.sizeKey] || {};
                      const gQty = g.items.reduce((s, it) => s + (Number(it.quantity) || 0), 0);
                      return (
                        <tr key={g.sizeKey}>
                          <td><span className="size-mono" style={{ fontSize: 12, padding: "3px 8px" }}>{g.sizeKey}</span></td>
                          <td><span className="sets-chip">{g.items.length}</span></td>
                          <td><span className="qty-mono">{gQty.toLocaleString()}</span></td>
                          {specFields.map(f => (
                            <td key={f.key} style={{ color: specs[f.key] ? "#1a2333" : "#d1d5db" }}>{specs[f.key] || "—"}</td>
                          ))}
                        </tr>
                      );
                    })}
                    <tr className="tot">
                      <td>TOTAL</td>
                      <td>{lineItems.length} SKUs</td>
                      <td><span className="qty-mono">{totalQty.toLocaleString()}</span></td>
                      {specFields.map(f => <td key={f.key}></td>)}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <NotesSection />

            <div className="card">
              <div className="fl ac jb" style={{ marginBottom: 12 }}>
                <div className="card-ttl" style={{ margin: 0 }}><div className="ico">📤</div>Salesforce Import CSV</div>
                <div className="export-btns">
                  <button className={`btn btn-pdf`} onClick={handleDownloadPDF} disabled={pdfLoading}>
                    {pdfLoading ? (
                      <><span style={{ width: 14, height: 14, border: "2px solid rgba(255,255,255,.4)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin .7s linear infinite" }} /> Generating…</>
                    ) : (
                      <>⬇ Download Summary PDF</>
                    )}
                  </button>
                  <button className={`btn ${copied ? "btn-ok" : "btn-pri"}`} onClick={copyCSV}>
                    {copied ? "✓ Copied!" : "Copy CSV"}
                  </button>
                </div>
              </div>
              <div className="out-area">{buildCSV(groups, groupSpecs, productType)}</div>
            </div>

            <div className="fl je g3">
              <button className="btn btn-out" onClick={() => setStep(2)}>← Edit Specs</button>
              <button className="btn btn-out" onClick={reset}>New PO</button>
            </div>
          </>)}
        </div>
      </div>
    </>
  );
}
