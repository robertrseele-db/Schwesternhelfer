'use strict'

// Tab-Navigation mit ARIA-Unterstützung
document.getElementById('tabNav').addEventListener('click', function (e) {
  if (!e.target.classList.contains('tab-btn')) return

  document.querySelectorAll('.tab-btn').forEach(function (btn) {
    btn.classList.remove('active')
    btn.setAttribute('aria-selected', 'false')
  })
  document.querySelectorAll('.tab-content').forEach(function (sec) {
    sec.classList.remove('active')
  })

  e.target.classList.add('active')
  e.target.setAttribute('aria-selected', 'true')
  var tabId = 'tab-' + e.target.dataset.tab
  document.getElementById(tabId).classList.add('active')
})

// Helper: Runden auf n Dezimalstellen
function round(val, decimals) {
  if (!isFinite(val)) return 0
  return Math.round(val * Math.pow(10, decimals)) / Math.pow(10, decimals)
}

// Helper: Validierung – prüft ob Wert gültig und > 0
function isValid(val) {
  return isFinite(val) && val > 0
}

// Helper: Ergebnis sicher anzeigen
function safeDisplay(val) {
  if (!isFinite(val) || isNaN(val)) return 'Fehler'
  return val
}

// 1. Tropfgeschwindigkeit
document.getElementById('calcTropf').addEventListener('submit', function (e) {
  e.preventDefault()
  var volume = parseFloat(document.getElementById('tropf-volume').value)
  var timeValue = parseFloat(document.getElementById('tropf-time').value)
  var timeUnit = document.getElementById('tropf-timeUnit').value
  var dropFactor = parseInt(document.getElementById('tropf-factor').value, 10)

  if (!isValid(volume) || !isValid(timeValue)) return

  var timeInMinutes = timeUnit === 'hours' ? timeValue * 60 : timeValue
  var dripRate = Math.round((volume * dropFactor) / timeInMinutes)
  var flowRate = round(volume / (timeInMinutes / 60), 1)

  document.getElementById('tropf-dripRate').textContent = safeDisplay(dripRate)
  document.getElementById('tropf-flowRate').textContent = safeDisplay(flowRate)

  var timeDisplay = timeUnit === 'hours'
    ? timeValue + ' Stunde' + (timeValue !== 1 ? 'n' : '')
    : timeValue + ' Minute' + (timeValue !== 1 ? 'n' : '')
  var dropLabel = dropFactor === 60 ? 'Mikrotropf' : 'Makrotropf'

  document.getElementById('tropf-note').textContent =
    volume + ' mL über ' + timeDisplay + ' mit ' + dropLabel +
    ' (' + dropFactor + ' gtt/mL): ' + dripRate + ' Tropfen/min bei ' + flowRate + ' mL/h.'

  document.getElementById('tropf-results').classList.remove('hidden')
})

// 2. Medikamentendosierung
document.getElementById('calcMedikament').addEventListener('submit', function (e) {
  e.preventDefault()
  var verordnet = parseFloat(document.getElementById('med-verordnet').value)
  var vorhanden = parseFloat(document.getElementById('med-vorhanden').value)
  var menge = parseFloat(document.getElementById('med-menge').value)
  var einheit = document.getElementById('med-einheit').value

  if (!isValid(verordnet) || !isValid(vorhanden) || !isValid(menge)) return

  var result = round((verordnet / vorhanden) * menge, 2)

  document.getElementById('med-result').textContent = safeDisplay(result)
  document.getElementById('med-result-label').textContent = einheit

  document.getElementById('med-note').textContent =
    'Verordnet: ' + verordnet + ' mg, Vorhanden: ' + vorhanden + ' mg pro ' +
    menge + ' ' + einheit + ' → ' + result + ' ' + einheit + ' verabreichen.'

  document.getElementById('med-results').classList.remove('hidden')
})

// 3. Gewichtsbezogene Dosierung
document.getElementById('calcKoerpergewicht').addEventListener('submit', function (e) {
  e.preventDefault()
  var dosierung = parseFloat(document.getElementById('kg-dosierung').value)
  var gewicht = parseFloat(document.getElementById('kg-gewicht').value)

  if (!isValid(dosierung) || !isValid(gewicht)) return

  var result = round(dosierung * gewicht, 2)

  document.getElementById('kg-result').textContent = safeDisplay(result)
  document.getElementById('kg-note').textContent =
    dosierung + ' mg/kg × ' + gewicht + ' kg = ' + result + ' mg Gesamtdosis.'

  document.getElementById('kg-results').classList.remove('hidden')
})

// 4. Konzentrationsberechnung
document.getElementById('calcKonzentration').addEventListener('submit', function (e) {
  e.preventDefault()
  var wirkstoff = parseFloat(document.getElementById('konz-wirkstoff').value)
  var volumen = parseFloat(document.getElementById('konz-volumen').value)

  if (!isValid(wirkstoff) || !isValid(volumen)) return

  var result = round(wirkstoff / volumen, 2)

  document.getElementById('konz-result').textContent = safeDisplay(result)
  document.getElementById('konz-note').textContent =
    wirkstoff + ' mg in ' + volumen + ' mL = ' + result + ' mg/mL.'

  document.getElementById('konz-results').classList.remove('hidden')
})

// 5. Perfusor
document.getElementById('calcPerfusor').addEventListener('submit', function (e) {
  e.preventDefault()
  var dosis = parseFloat(document.getElementById('perf-dosis').value)
  var konz = parseFloat(document.getElementById('perf-konz').value)

  if (!isValid(dosis) || !isValid(konz)) return

  var result = round(dosis / konz, 2)

  document.getElementById('perf-result').textContent = safeDisplay(result)
  document.getElementById('perf-note').textContent =
    dosis + ' mg/h bei Konzentration ' + konz + ' mg/mL → Laufrate: ' + result + ' mL/h.'

  document.getElementById('perf-results').classList.remove('hidden')
})

// 6. BMI
document.getElementById('calcBmi').addEventListener('submit', function (e) {
  e.preventDefault()
  var gewicht = parseFloat(document.getElementById('bmi-gewicht').value)
  var groesseCm = parseFloat(document.getElementById('bmi-groesse').value)

  if (!isValid(gewicht) || !isValid(groesseCm)) return

  var groesseM = groesseCm / 100
  var bmi = round(gewicht / (groesseM * groesseM), 1)

  var category = ''
  if (bmi < 18.5) category = 'Untergewicht'
  else if (bmi < 25) category = 'Normalgewicht'
  else if (bmi < 30) category = 'Übergewicht'
  else if (bmi < 35) category = 'Adipositas Grad I'
  else if (bmi < 40) category = 'Adipositas Grad II'
  else category = 'Adipositas Grad III'

  document.getElementById('bmi-result').textContent = safeDisplay(bmi)
  document.getElementById('bmi-category').textContent = category
  document.getElementById('bmi-note').textContent =
    gewicht + ' kg bei ' + groesseCm + ' cm → BMI ' + bmi + ' (' + category + ').'

  document.getElementById('bmi-results').classList.remove('hidden')
})

// 7. Flüssigkeitsbilanz
document.getElementById('calcBilanz').addEventListener('submit', function (e) {
  e.preventDefault()
  var einfuhr = parseFloat(document.getElementById('bil-einfuhr').value)
  var ausfuhr = parseFloat(document.getElementById('bil-ausfuhr').value)

  if (isNaN(einfuhr) || isNaN(ausfuhr)) return

  var bilanz = einfuhr - ausfuhr
  var vorzeichen = bilanz >= 0 ? '+' : ''

  document.getElementById('bil-result').textContent = vorzeichen + bilanz
  document.getElementById('bil-note').textContent =
    'Einfuhr: ' + einfuhr + ' mL, Ausfuhr: ' + ausfuhr + ' mL → Bilanz: ' +
    vorzeichen + bilanz + ' mL (' + (bilanz >= 0 ? 'positive' : 'negative') + ' Bilanz).'

  document.getElementById('bil-results').classList.remove('hidden')
})

// 8. Prozentrechnung
document.getElementById('calcProzent').addEventListener('submit', function (e) {
  e.preventDefault()
  var satz = parseFloat(document.getElementById('proz-satz').value)
  var grund = parseFloat(document.getElementById('proz-grund').value)

  if (isNaN(satz) || isNaN(grund)) return

  var result = round((satz / 100) * grund, 2)

  document.getElementById('proz-result').textContent = safeDisplay(result)
  document.getElementById('proz-note').textContent =
    satz + ' % von ' + grund + ' = ' + result + '.'

  document.getElementById('proz-results').classList.remove('hidden')
})

// 9. Dreisatz
document.getElementById('calcDreisatz').addEventListener('submit', function (e) {
  e.preventDefault()
  var a = parseFloat(document.getElementById('drei-a').value)
  var b = parseFloat(document.getElementById('drei-b').value)
  var x = parseFloat(document.getElementById('drei-x').value)

  if (!isValid(a) || !isValid(b) || !isValid(x)) return

  var result = round((x / b) * a, 3)

  document.getElementById('drei-result').textContent = safeDisplay(result)
  document.getElementById('drei-note').textContent =
    'Wenn ' + a + ' Einheit(en) = ' + b + ', dann für ' + x + ' benötigt man ' + result + ' Einheit(en).'

  document.getElementById('drei-results').classList.remove('hidden')
})
