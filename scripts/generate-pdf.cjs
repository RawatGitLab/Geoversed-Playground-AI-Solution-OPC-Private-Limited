const { jsPDF } = require('jspdf');
const fs = require('fs');
const path = require('path');

const doc = new jsPDF({
  orientation: 'portrait',
  unit: 'mm',
  format: 'a4',
});

const pageWidth = doc.internal.pageSize.getWidth();
const pageHeight = doc.internal.pageSize.getHeight();

// PAGE 1: COVER PAGE
// Blue decorative spine
doc.setFillColor(34, 155, 218);
doc.rect(0, 0, 18, pageHeight, 'F');

doc.setFont('helvetica', 'italic');
doc.setTextColor(255, 255, 255);
doc.setFontSize(14);
doc.text('Towards Aviral Ganga', 11, pageHeight / 2, { angle: 90, align: 'center' });

// Main Cover Titles
doc.setFont('helvetica', 'bold');
doc.setTextColor(15, 32, 66);
doc.setFontSize(16);
const title1 = doc.splitTextToSize(
  'REJUVENATION STRATEGY OF DYING SPRINGS AND NAULAS IN DHARGAD RAINFED RIVER WATERSHED, JAIGAN VALLEY, DISTRICT BAGESHWAR, KUMAUN HIMALAYA, (UTTARAKHAND)',
  150
);
doc.text(title1, 35, 65, { align: 'left', lineHeightFactor: 1.4 });

doc.setFontSize(13);
doc.setTextColor(34, 75, 140);
doc.text('PHASE-I', 35, 140);
const title2 = doc.splitTextToSize(
  'REJUVENATION OF SPRINGS AND NAULAS OF JATHA AND PASS VILLAGES IN DHARGAD WATERSHED',
  150
);
doc.text(title2, 35, 148, { align: 'left', lineHeightFactor: 1.3 });

doc.setFont('helvetica', 'bolditalic');
doc.setTextColor(20, 30, 50);
doc.setFontSize(12);
doc.text('Prof. J.S. Rawat', 35, 230);
doc.text('Er. Varun Rawat', 35, 238);
doc.text('Dr. N.C. Pant', 35, 246);

doc.setFont('helvetica', 'normal');
doc.setFontSize(11);
doc.text('January, 2026', 35, 270);

// Helper for adding new numbered pages
function addNewPage(headerText, pageNum) {
  doc.addPage();
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(120, 130, 140);
  doc.text(headerText || 'Dhargad Rainfed River Watershed Rejuvenation Strategy', 20, 12);
  doc.text(String(pageNum), pageWidth - 25, 12, { align: 'right' });
  doc.setDrawColor(210, 220, 230);
  doc.line(20, 15, pageWidth - 20, 15);
  doc.setTextColor(30, 40, 50);
}

// PAGE 2: CONTENTS (Part 1)
addNewPage('Table of Contents', 'i');
doc.setFont('helvetica', 'bold');
doc.setFontSize(16);
doc.text('CONTENTS', pageWidth / 2, 28, { align: 'center' });
doc.setFontSize(10);
doc.setFont('helvetica', 'bold');
doc.text('Item', 25, 40);
doc.text('Page', pageWidth - 30, 40, { align: 'right' });
doc.line(25, 42, pageWidth - 25, 42);

doc.setFont('helvetica', 'normal');
const tocItems1 = [
  ['List of Figures', 'i'],
  ['List of Plates', 'i'],
  ['List of Tables', 'ii'],
  ['Executive Summary', 'ii'],
  ['1.0 INTRODUCTION', '1'],
  ['   1.1 The Crucial Problem', '1'],
  ['   1.2 The consequences of inaction are dire', '1'],
  ['       1.2.1 Water Scarcity', '1'],
  ['       1.2.2 Ecosystem Degradation', '1'],
  ['       1.2.3 Climate Change', '1'],
  ['2.0 OBJECTIVES', '2'],
  ['3.0 ABOUT THE DHARGAD RIVER WATERSHED', '2'],
  ['4.0 METHODOLOGY', '3'],
  ['   4.1 GIS based Mapping of the Study Area', '3'],
  ['   4.2 GIS-based Rejuvenation Plan', '4'],
  ['   4.3 Implementation Strategy', '4'],
  ['PHASE-I: REJUVENATION OF SPRINGS AND NAULAS OF JATHA & PASS', '5'],
  ['1.0 INTRODUCTION', '5'],
  ['2.0 ABOUT THE EXPERIMENTAL AREA PHASE-I', '5'],
  ['3.0 PHYSICAL GEOGRAPHY', '6'],
  ['   3.1 Geology', '6'],
  ['   3.2 Weather and Climate', '6'],
  ['   3.3 Surface Hydrology', '7'],
  ['       3.3.1 Springs and Naulas', '7'],
  ['           3.3.1.1 Dhargad Spring', '9'],
  ['           3.3.1.2 Bhaidyon Spring', '9'],
  ['           3.3.1.3 Syari Naula', '10'],
  ['           3.3.1.4 Mathi Naula', '10'],
  ['           3.3.1.5 Nikai Naula', '11'],
  ['           3.3.1.6 Bhairav Naula', '11'],
  ['           3.3.1.7 Thaman Naula', '12'],
  ['       3.3.2 Ephemeral Rills', '12'],
  ['   3.4 Geomorphology', '12'],
  ['       3.4.1 Relief', '12'],
  ['       3.4.2 Morphology', '14'],
];

let yPos = 50;
tocItems1.forEach(([title, page]) => {
  doc.text(title, 25, yPos);
  doc.text(page, pageWidth - 30, yPos, { align: 'right' });
  yPos += 6;
});

// PAGE 3: CONTENTS (Part 2)
addNewPage('Table of Contents (Cont.)', 'ii');
yPos = 30;
const tocItems2 = [
  ['4.0 HUMAN GEOGRAPHY', '16'],
  ['   4.1 Landuse Pattern', '16'],
  ['   4.2 Drinking Water Schemes', '16'],
  ['5.0 REJUVENATION TREATMENT MEASURES', '17'],
  ['   5.1 Mechanical Measures', '17'],
  ['       5.1.1 Objectives (Particular & General)', '17'],
  ['       5.1.2 Treatment Measures', '17'],
  ['           5.1.2.1 Infiltration Holes', '18'],
  ['           5.1.2.2 Infiltration Trenches', '18'],
  ['           5.1.2.3 Bio-Plugs', '18'],
  ['           5.1.2.4 Rill Plugs/Gully Plugs', '19'],
  ['           5.1.2.5 Contour Bunds', '19'],
  ['           5.1.2.6 Terrace Ponds', '20'],
  ['           5.1.2.7 Check Dams', '20'],
  ['           5.1.2.8 Roof Rainwater Harvesting Structure', '21'],
  ['           5.1.2.9 Building Rainwater Harvesting for Groundwater', '22'],
  ['   5.2 Biological Measures', '23'],
  ['       5.2.1 Objectives', '23'],
  ['       5.2.2 Treatment Measures (Afforestation, Grasses, Nurseries)', '24'],
  ['6.0 MICRO-PLANS FOR REJUVENATION INTERVENTIONS', '25'],
  ['   6.1 Mechanical Treatment (Table-3 Allocation)', '25'],
  ['       6.1.1 Infiltration Holes (400,000 units)', '25'],
  ['       6.1.2 Infiltration Trenches (2,341 units)', '26'],
  ['       6.1.3 Bio-Plugs (20 units)', '27'],
  ['       6.1.4 Rill/Gully Plugs (5 units)', '27'],
  ['       6.1.5 Contour Bunds (5,000 meters)', '27'],
  ['       6.1.6 Terrace Ponds (30 ponds)', '27'],
  ['       6.1.7 Check Dams (2 units)', '28'],
  ['   6.2 Biological Treatment Implementation', '28'],
  ['ACKNOWLEDGEMENT', '29'],
  ['REFERENCES CITED (18 Publications)', '30'],
  ['ANNEXURE - I (Gram Panchayat Orientations & Minutes)', '36'],
];

tocItems2.forEach(([title, page]) => {
  doc.text(title, 25, yPos);
  doc.text(page, pageWidth - 30, yPos, { align: 'right' });
  yPos += 6;
});

// PAGE 4: EXECUTIVE SUMMARY
addNewPage('Executive Summary', '1');
doc.setFont('helvetica', 'bold');
doc.setFontSize(14);
doc.text('EXECUTIVE SUMMARY', 25, 30);
doc.setFont('helvetica', 'normal');
doc.setFontSize(10);

const execSummary = `The Himalayan region, often referred to as the "Water Tower of Asia," is experiencing a severe crisis both in glacial-fed and non-glacial rainfed river watersheds. Rainfed rivers in Uttarakhand play a vital role in supporting agriculture, industry, and human consumption, having over 353 significant rainfed rivers of fourth order and above spanning 5,796 km. Within the watersheds of these rainfed rivers, about 70% of villages and more than 80% of urban centers of Uttarakhand are located.

Due to anthropogenically and technogenically accelerated climate change impacts, traditional water sources such as natural springs and naulas are steadily transforming from their perennial nature to ephemeral nature, causing major rivers to dwindle rapidly due to decrease in base flow during summer seasons. Failing to take planned scientific action for groundwater augmentation through massive rainwater harvesting mechanical and biological measures in the recharge areas will lead to dire consequences, including severe drinking water scarcity, biodiversity loss, and exacerbated climate change impacts.

This report formulates a scientific integrated strategy for rejuvenation of springs, streams, and rivers using the Dhargad River watershed in Bageshwar district as a natural laboratory.

Fundamental Objectives:
1. Identify and prioritize dead and dying naulas, springs, and streams in the watershed.
2. Assess the status of water sources and delineate potential hydro-geomorphic recharge zones.
3. Develop a GIScience-based Decision Support System (DSS) for rejuvenation planning.
4. Implement and monitor micro-plans in active association with local inhabitants and Gram Panchayats.
5. Mitigate the adverse impacts of climate change on hydrology and mountain livelihoods.`;

doc.text(doc.splitTextToSize(execSummary, 160), 25, 40, { lineHeightFactor: 1.4 });

// PAGE 5: 1.0 INTRODUCTION & OBJECTIVES
addNewPage('1.0 Introduction & 2.0 Objectives', '2');
doc.setFont('helvetica', 'bold');
doc.setFontSize(13);
doc.text('1.0 INTRODUCTION & PROBLEM STATEMENT', 25, 28);
doc.setFont('helvetica', 'normal');
doc.setFontSize(9.5);

const introText = `The Dhargad River watershed is a tributary watershed of the Jaigan River which finally joins the Saryu River at Lweta village (elevation 716m, 29°42'13.551"N Lat and 79°53'40.896"E Long) in the Bageshwar district of Kumaun Himalaya. It represents a classic case of rainfed Himalayan catchments undergoing acute hydrological degradation.

Consequences of Inaction:
• Water Scarcity: Severe shortages of drinking water during 2-3 peak summer months for human settlements and livestock.
• Ecosystem Degradation: Drying of aquatic biodiversity, loss of soil moisture, and abandonment of terraced agriculture.
• Climate Vulnerability: Increased cloudburst runoff velocities causing rill and gully erosion without groundwater infiltration.

3.0 ABOUT THE DHARGAD RIVER WATERSHED
The entire Dhargad watershed encompasses an area of 2.32 km² lying between 29°43'38.117"N to 29°44'53.908"N Latitude and 79°43'39.756"E to 79°44'47.547"E Longitude. The altitude varies from 1,295 m to 1,492 m MSL. It is composed of the Raut Gara Formation (Damta Group) characterized by quartzites interbedded with silky phyllites and slates.

Phase-I focuses on the experimental recharge zone of Village Jatha and Pass covering 0.17 km² (17 hectares).`;

doc.text(doc.splitTextToSize(introText, 160), 25, 36, { lineHeightFactor: 1.4 });

// PAGE 6: TABLE-1 SPRINGS AND NAULAS INVENTORY
addNewPage('Springs and Naulas Ground Survey (Table-1)', '8');
doc.setFont('helvetica', 'bold');
doc.setFontSize(12);
doc.text('TABLE-1: DETAILS OF SPRINGS AND NAULAS OF THE STUDY AREA', 25, 28);
doc.setFontSize(8);
doc.setFont('helvetica', 'italic');
doc.text('Source: Field Survey by Jagdish Chandra & Team (AMAN NGO)', 25, 33);

doc.setFont('helvetica', 'bold');
doc.setFontSize(8.5);
doc.setFillColor(240, 243, 248);
doc.rect(20, 37, pageWidth - 40, 8, 'F');
doc.text('S.N.', 22, 42);
doc.text('Water Source', 32, 42);
doc.text('Type', 65, 42);
doc.text('Elevation', 82, 42);
doc.text('Families (Pop.)', 105, 42);
doc.text('Past (10 yr)', 138, 42);
doc.text('Present Status', 165, 42);

doc.setFont('helvetica', 'normal');
const table1Data = [
  ['1', 'Dhargad Spring', 'Spring', '1324 m', '80 (350)', 'Working', 'Working (0.34 L/s)'],
  ['2', 'Bhaidyon Spring', 'Spring', '1441 m', '62 (150)', 'Working', 'Working'],
  ['3', 'Syari Naula', 'Naula', '1362 m', '12 (25)', 'Working', 'Working'],
  ['4', 'Mathi Naula', 'Naula', '1397 m', '5 (11)', 'Working', 'Completely Damaged'],
  ['5', 'Nikai Naula', 'Naula', '1306 m', 'Nil (Dry)', 'Working', 'Completely Damaged'],
  ['6', 'Bhairav Naula', 'Naula', '1397 m', '30 (110)', 'Damaged', 'Completely Damaged'],
  ['7', 'Thaman Naula', 'Naula', '1449 m', '30 (110)', 'Working', 'Damaged (Summer Only)'],
];

let tY = 50;
table1Data.forEach((row) => {
  doc.text(row[0], 22, tY);
  doc.setFont('helvetica', 'bold');
  doc.text(row[1], 32, tY);
  doc.setFont('helvetica', 'normal');
  doc.text(row[2], 65, tY);
  doc.text(row[3], 82, tY);
  doc.text(row[4], 105, tY);
  doc.text(row[5], 138, tY);
  if (row[6].includes('Damaged')) {
    doc.setTextColor(180, 40, 40);
  } else {
    doc.setTextColor(20, 120, 40);
  }
  doc.text(row[6], 165, tY);
  doc.setTextColor(30, 40, 50);
  doc.setDrawColor(230, 235, 240);
  doc.line(20, tY + 2, pageWidth - 20, tY + 2);
  tY += 8;
});

// Table 2 on same page
tY += 10;
doc.setFont('helvetica', 'bold');
doc.setFontSize(12);
doc.text('TABLE-2: DISTRIBUTION OF AREA UNDER DIFFERENT RELIEF ZONES', 25, tY);
tY += 7;

doc.setFontSize(8.5);
doc.setFillColor(240, 243, 248);
doc.rect(20, tY, pageWidth - 40, 8, 'F');
doc.text('Relief Zone', 25, tY + 5);
doc.text('Area (km²)', 75, tY + 5);
doc.text('Percentage (%)', 115, tY + 5);
doc.text('Hydrological Classification', 150, tY + 5);

tY += 13;
doc.setFont('helvetica', 'normal');
const table2Data = [
  ['> 1400 m', '0.03 km²', '17.65%', 'High Relief (Recharge Ridge)'],
  ['1350 - 1400 m', '0.05 km²', '29.41%', 'Medium Relief (Terraced Interventions)'],
  ['< 1350 m', '0.09 km²', '52.94%', 'Low Relief (Discharge & Valley Floor)'],
  ['Total Area', '0.17 km²', '100.00%', 'Phase-I Experimental Zone'],
];

table2Data.forEach((row, i) => {
  if (i === 3) doc.setFont('helvetica', 'bold');
  doc.text(row[0], 25, tY);
  doc.text(row[1], 75, tY);
  doc.text(row[2], 115, tY);
  doc.text(row[3], 150, tY);
  doc.line(20, tY + 2, pageWidth - 20, tY + 2);
  tY += 7;
});

// PAGE 7: TABLE-3 MICRO-PLANS MECHANICAL INTERVENTIONS
addNewPage('Mechanical Treatment Micro-Plans (Table-3)', '25');
doc.setFont('helvetica', 'bold');
doc.setFontSize(12);
doc.text('TABLE-3: ESTIMATED NUMBERS OF MECHANICAL TREATMENT MEASURES', 25, 28);
doc.setFontSize(8.5);
doc.setFont('helvetica', 'italic');
doc.text('Engineered for Phase-I Recharge Area (0.17 km²)', 25, 33);

doc.setFont('helvetica', 'bold');
doc.setFillColor(240, 243, 248);
doc.rect(20, 37, pageWidth - 40, 8, 'F');
doc.text('Measure Name', 22, 42);
doc.text('Forest Land', 75, 42);
doc.text('Barren Land', 105, 42);
doc.text('Aband. Agri', 135, 42);
doc.text('Total Planned', 165, 42);

doc.setFont('helvetica', 'normal');
const table3Data = [
  ['Infiltration Holes', '90,000', '160,000', '150,000', '400,000 units'],
  ['Infiltration Trenches', '291', '2,050', '-', '2,341 units'],
  ['Bio-Plugs', '-', '-', '20 across 2 rills', '20 units'],
  ['Rill/Gully Plugs', '-', '-', '5 across channels', '5 units'],
  ['Contour Bunds', '-', '-', '5,000 running meters', '5,000 meters'],
  ['Terrace Ponds', '-', '10 ponds', '20 ponds', '30 ponds'],
  ['Check Dams', '-', '-', '2 near rill mouths', '2 units'],
];

tY = 50;
table3Data.forEach((row) => {
  doc.setFont('helvetica', 'bold');
  doc.text(row[0], 22, tY);
  doc.setFont('helvetica', 'normal');
  doc.text(row[1], 75, tY);
  doc.text(row[2], 105, tY);
  doc.text(row[3], 135, tY);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(34, 75, 140);
  doc.text(row[4], 165, tY);
  doc.setTextColor(30, 40, 50);
  doc.line(20, tY + 2, pageWidth - 20, tY + 2);
  tY += 8;
});

tY += 8;
doc.setFont('helvetica', 'bold');
doc.setFontSize(11);
doc.text('SPECIFICATIONS & STANDARDS OF MEASURES:', 25, tY);
tY += 6;
doc.setFont('helvetica', 'normal');
doc.setFontSize(9);
const specs = `• Infiltration Holes: 10-15 cm depth, 5 cm diameter, density 5 holes/m² constructed with steel bars in barren/abandoned fields to catch high-intensity rain drops.
• Infiltration Trenches: Staggered cuts of 1.0m × 0.5m × 0.3m spaced 5-10m apart on convex hill slopes to break sheetwash runoff and force deep percolation into bedrock fissures.
• Bio-Plugs & Gully Plugs: Constructed with pine needles, local logs, and stones across first-order ephemeral rills to arrest velocity and trap sediment.
• Terrace Ponds: 10-20 m² area, 1-2 m depth shallow retention ponds with earthen embankments constructed in association with villagers.`;

doc.text(doc.splitTextToSize(specs, 160), 25, tY, { lineHeightFactor: 1.4 });

// PAGE 8: BIOLOGICAL MEASURES & COMMUNITY GOVERNANCE
addNewPage('Biological Measures & Annexure-I', '29');
doc.setFont('helvetica', 'bold');
doc.setFontSize(12);
doc.text('BIOLOGICAL ECO-RESTORATION & COMMUNITY RESOLUTIONS', 25, 28);
doc.setFont('helvetica', 'normal');
doc.setFontSize(9.5);

const bioText = `Biological Treatments:
• Afforestation: Planting native broad-leaved water-harvesting species across 0.032 km² barren lands, specifically Banj Oak (Quercus leucotrichophora), Uthis/Alder (Alnus nepalensis), Pipal, and Buransh (Rhododendron).
• Vegetative Mulching: Planting Napier and Vetiver soil-binding perennial grasses along trench banks.
• Economic Horticulture & Floriculture: Utilizing 0.132 km² of abandoned terraces for community nurseries, fruit trees, and commercial floriculture.

Annexure-I: Gram Panchayat Resolutions (November 29, 2025):
A formal workshop was organized by AMAN NGO in Village Jatha and Village Kafaligair / Dharalkhunga. Led by Prof. J.S. Rawat, Jagdish Chandra, and Neelima Bhatt, the village meetings unanimously resolved to initiate immediate groundwater augmentation focusing on Ward No. 6 and Ward No. 7 in Jatha village.`;

doc.text(doc.splitTextToSize(bioText, 160), 25, 36, { lineHeightFactor: 1.4 });

// Save PDF
const outputPath = path.join(__dirname, '../public/reports/Dhargad_Watershed_Rejuvenation_Report_2026.pdf');
const pdfBytes = doc.output('arraybuffer');
fs.writeFileSync(outputPath, Buffer.from(pdfBytes));
console.log('PDF successfully generated at:', outputPath, 'Bytes:', pdfBytes.byteLength);
