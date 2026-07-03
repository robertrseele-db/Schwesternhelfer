# 💧 Schwesternhelfer

Webbasierter Pflegerechner für den Stationsalltag – deployed als GitLab Page.

## Funktionen

| Rechner | Beschreibung |
|---------|-------------|
| **Tropfgeschwindigkeit** | gtt/min + mL/h aus Volumen, Zeit und Tropffaktor (Makro/Mikro) |
| **Medikamentendosierung** | Verordnete Dosis ÷ vorhandene Dosis × Menge |
| **Gewichtsbezogene Dosierung** | mg/kg × Körpergewicht = Gesamtdosis |
| **Konzentration** | Wirkstoffmenge ÷ Volumen = mg/mL |
| **Perfusor (mL/h)** | Dosis/h ÷ Konzentration = Laufrate |
| **BMI** | Gewicht ÷ Größe² mit WHO-Kategorie |
| **Flüssigkeitsbilanz** | Einfuhr − Ausfuhr |
| **Prozentrechnung** | Prozentsatz × Grundwert |
| **Dreisatz** | Proportionale Berechnung (Wenn A → B, dann X → ?) |
| **Theorie & Formeln** | Alle Formeln, Tropffaktoren, Umrechnungen, Erklärungen |

## Technologie

- Reines HTML, CSS, JavaScript (kein Framework, keine Dependencies)
- Responsive Design (Desktop + Mobile)
- Statische Seite – kein Backend erforderlich

## Projektstruktur

```
Schwesternhelfer/
├── .gitlab-ci.yml      # GitLab Pages Deployment
├── README.md
└── public/
    ├── index.html      # Hauptseite mit allen Rechnern
    ├── style.css       # Styling (responsive, Tab-Navigation)
    └── app.js          # Berechnungslogik
```

## Deployment

Die Seite wird automatisch als **GitLab Page** deployed:

1. Push auf `main`
2. GitLab CI kopiert den `public/`-Ordner als Artefakt
3. Seite ist unter der GitLab Pages URL erreichbar

### Lokal testen

Einfach `public/index.html` im Browser öffnen – keine Installation nötig.

## Formeln (Kurzreferenz)

```
Tropfgeschwindigkeit:   gtt/min = (Volumen × Tropffaktor) ÷ Zeit in Minuten
Infusionsgeschwindigkeit: mL/h = Volumen ÷ Zeit in Stunden
Medikamentendosierung:  Menge = (Soll ÷ Ist) × vorhandene Menge
Gewichtsdosierung:      Gesamtdosis = mg/kg × kg
Konzentration:          mg/mL = Wirkstoff (mg) ÷ Volumen (mL)
Perfusor:               mL/h = Dosis/h ÷ Konzentration
BMI:                    kg/m² = Gewicht ÷ Größe²
Bilanz:                 mL = Einfuhr − Ausfuhr
```

## Hinweis

⚠️ **Dieses Tool dient ausschließlich zu Schulungszwecken.** Alle Berechnungen vor der klinischen Anwendung gegenprüfen.
