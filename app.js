function convertValue(mm, scale) {
  mm = parseFloat(mm);
  if (isNaN(mm)) return "";

  switch (scale) {
    case "mm":
      return mm.toFixed(2);
    case "inch":
      return (mm * 0.0393701).toFixed(3); // mm → inch
    case "kgsm":
      return calculatePipeWeightKgM(mm).toFixed(3);
    case "lbsft":
      return calculatePipeWeightLbsFt(mm).toFixed(3);
    default:
      return mm;
  }
}

function convertOD(mm, scale) {
  mm = parseFloat(mm);
  if (isNaN(mm)) return "";

  switch (scale) {
    case "mm":
    case "kgsm":
      return mm.toFixed(2);
    case "inch":
    case "lbsft":
      return (mm * 0.0393701).toFixed(3); // mm → inch
    default:
      return mm;
  }
}

function calculatePipeWeightKgM(wallThickness, outerDiameter = 10.3, density = 7850) {
  // Convert mm to meters
  const odMeters = outerDiameter / 1000;
  const wallMeters = wallThickness / 1000;
  
  // Calculate inner diameter
  const idMeters = odMeters - (2 * wallMeters);
  
  // Calculate cross-sectional area of pipe wall (m²)
  const area = (Math.PI / 4) * (Math.pow(odMeters, 2) - Math.pow(idMeters, 2));
  
  // Calculate weight per unit length in kg/m
  return area * density;
}

function calculatePipeWeightLbsFt(wallThickness, outerDiameter = 10.3, density = 7850) {
  const weightKgM = calculatePipeWeightKgM(wallThickness, outerDiameter, density);
  // Convert kg/m to lbs/ft
  return weightKgM * 2.20462 / 3.28084;
}

function updateTable(scale) {
  const cells = document.querySelectorAll("td[data-mm]");
  cells.forEach(cell => {
    const original = cell.getAttribute("data-mm");
    // Check if this is an OD column by looking at the cell's position or content
    const isODColumn = cell.parentElement.cells[2] === cell; // OD is the 3rd column (index 2)
    
    if (isODColumn) {
      cell.textContent = convertOD(original, scale);
    } else {
      cell.textContent = convertValue(original, scale);
    }
  });
}

function setupUnitSwitcher() {
  const radios = document.querySelectorAll('input[name="scale"]');
  radios.forEach(radio => {
    radio.addEventListener("change", () => {
      if (radio.checked) {
        updateTable(radio.value);
      }
    });
  });

  // initialize table with MM values
  updateTable("mm");
}

document.addEventListener("DOMContentLoaded", setupUnitSwitcher);