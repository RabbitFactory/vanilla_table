function convertValue(mm, scale) {
  mm = parseFloat(mm);
  if (isNaN(mm)) return "";

  switch (scale) {
    case "mm":
      return mm.toFixed(2);
    case "inch":
      return (mm * 0.0393701).toFixed(3); // mm → inch
    case "kgsm":
      return (mm * 0.25).toFixed(3); // assume mm * 0.25 = kg/m (demo logic)
    case "lbsft":
      return (mm * 0.168).toFixed(3); // assume mm * 0.168 = lbs/ft (demo logic)
    default:
      return mm;
  }
}

function updateTable(scale) {
  const cells = document.querySelectorAll("td[data-mm]");
  cells.forEach(cell => {
    const original = cell.getAttribute("data-mm");
    cell.textContent = convertValue(original, scale);
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
